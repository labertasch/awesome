package io.senol.awesome.stream.impl;

import io.senol.awesome.stream.StreamResource;
import io.senol.awesome.stream.StreamResourceService;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.eclipse.jetty.websocket.servlet.ServletUpgradeRequest;
import org.eclipse.jetty.websocket.servlet.ServletUpgradeResponse;
import org.eclipse.jetty.websocket.servlet.WebSocketCreator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: stas
 * Date: 10/08/15
 * Time: 13:01
 * To change this template use File | Settings | File Templates.
 */
public class WebsocketCreator implements WebSocketCreator {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final StreamResourceService streamResourceService;

    private ResourceResolverFactory resolverFactory;

    public WebsocketCreator(ResourceResolverFactory resolverFactory, StreamResourceService streamResourceService) {
        this.resolverFactory = resolverFactory;
        this.streamResourceService = streamResourceService;
    }

    @Override
    public Object createWebSocket(ServletUpgradeRequest servletUpgradeRequest, ServletUpgradeResponse servletUpgradeResponse) {

        log.info("create websocket");
        String username = servletUpgradeRequest.getUserPrincipal().getName();
        ResourceResolver resourceResolver=null;

        try {
            log.info("username: " + username);

            resourceResolver = resolverFactory.getAdministrativeResourceResolver((Map<String, Object>) new HashMap().put(ResourceResolverFactory.USER_IMPERSONATION, username));

        } catch (LoginException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }

        StreamResource streamResource = new StreamResourceImpl(resourceResolver, streamResourceService);

        return streamResource;
    }
}