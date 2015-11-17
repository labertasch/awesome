package io.senol.awesome.stream.impl;

import io.senol.awesome.stream.ResourceEvent;
import io.senol.awesome.stream.StreamResource;
import io.senol.awesome.stream.StreamResourceService;
import io.senol.awesome.stream.impl.resource.ResourceWrapper;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.codehaus.jackson.map.ObjectMapper;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.common.WebSocketSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Set;
import java.util.SortedSet;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * Created with IntelliJ IDEA.
 * User: stas
 * Date: 20/08/15
 * Time: 13:42
 * To change this template use File | Settings | File Templates.
 */
public class StreamResourceImpl implements StreamResource {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final ResourceResolver resourceResolver;
    private final StreamResourceService streamResourceService;

    private Set<String> resourcePathFilter = new CopyOnWriteArraySet();



    private final String COMMAND_RESOLVE = "resolve: ";


    private Session session;

    public StreamResourceImpl(ResourceResolver resourceResolver, StreamResourceService streamResourceService) {
        this.resourceResolver = resourceResolver;
        this.streamResourceService = streamResourceService;
    }


    private void registerFilter(String path) {
        resourcePathFilter.add(path);
    }

    private void unregisterFilter(String path) {
        resourcePathFilter.remove(path);
    }

    private boolean isRelevantEvent(String eventPath) {
        return resourcePathFilter.contains(eventPath);
    }

    @Override
    public void onResourceChanged(ResourceEvent event) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void onResourceAdded(ResourceEvent event) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void onResourceRemoved(ResourceEvent event) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void onResourceEvent(ResourceEvent event) {

        class ResponseResource {
            ResourceEvent event;
            public ResponseResource(ResourceEvent event) {
                this.event = event;
            }
            public String getType() {
                return  event.getType();
            }
            public Resource getResource() {
                return resourceResolver.resolve(event.getPath());
            }
        }

        ObjectMapper mapper = new ObjectMapper();
        try {
            String json = mapper.writeValueAsString(new ResourceWrapper(resourceResolver.resolve(event.getPath()), "event"));

            sendResponse(json);
            //  this.session.getRemote().sendString(json);
        } catch (IOException e) {
            log.error("error", e);
        }

    }

    @Override
    public void onWebSocketBinary(byte[] bytes, int i, int i2) {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void onWebSocketClose(int i, String s) {
        streamResourceService.unregistert(this);
    }

    @Override
    public void onWebSocketConnect(Session session) {
        this.session = session;
        this.streamResourceService.register(this);
    }

    @Override
    public void onWebSocketError(Throwable throwable) {
        //To change body of implemented methods use File | Settings | File Templates.
    }


    private void sendResponse(String response) throws IOException {
        this.session.getRemote().sendString(response);
    }

    // TODO make command register servcice and not hardcoded

    private void sendResource(Resource resource) {
        String json = Resource2Json(new ResourceWrapper(resource, "event"));
        try {
            sendResponse(json);
        } catch (IOException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }
    private String Resource2Json (ResourceWrapper resource) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            String json = mapper.writeValueAsString(resource);
            return json;

        } catch (IOException e) {
            log.error("error", e);
            return e.getMessage();
        }

    }


    private void resolveResourceCommand(String path) {
        try {
            Resource res = resourceResolver.resolve(path);
            String json = Resource2Json(new ResourceWrapper(res, "requested"));
            sendResponse(json);
        } catch (Exception e) {
            log.error("resolveResourceCommand", e);
        }
    }


    @Override
    public void onWebSocketText(String s) {
        String path = "";

        if(s.startsWith(COMMAND_RESOLVE)) {
            path = s.substring(COMMAND_RESOLVE.length(), s.length());
             resolveResourceCommand(path);
        }


    }
}
