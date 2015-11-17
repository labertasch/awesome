package io.senol.awesome.stream.impl;

import io.senol.awesome.stream.ResourceEvent;
import io.senol.awesome.stream.StreamResource;
import io.senol.awesome.stream.StreamResourceService;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Service;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * Created with IntelliJ IDEA.
 * User: stas
 * Date: 20/08/15
 * Time: 14:16
 * To change this template use File | Settings | File Templates.
 */
@Service(StreamResourceService.class)
@Component(
        metatype=false,
        immediate = true,
        label="%WebsocketServer.label",
        description="%WebsocketServer.description")
public class StreamResourceServiceImpl implements StreamResourceService{

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final Set<StreamResource> sockets = new CopyOnWriteArraySet();

    protected void activate(ComponentContext ctx) {
        log.info("Websocket Server started");
    }

    public void destroy() {
        log.info("Websocket Servber stopped");
    }

    @Override
    public void register(StreamResource streamResource) {
        sockets.add(streamResource);
    }

    @Override
    public void unregistert(StreamResource streamResource) {
        sockets.remove(streamResource);
    }

    @Override
    public void notify(ResourceEvent event) {
        for (StreamResource resource : sockets) {
            resource.onResourceEvent(event);
        }
    }

}