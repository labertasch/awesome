package io.senol.awesome.stream.impl;

import io.senol.awesome.stream.api.StreamingServer;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created with IntelliJ IDEA.
 * User: stas
 * Date: 10/08/15
 * Time: 10:42
 * To change this template use File | Settings | File Templates.
 */

/**
 * Filter that runs the current request in the background if specific request
 * parameters are set. Must be placed early in the filter chain.
 */
@Component(
        metatype=false,
        immediate = true,
        label="%WebsocketServer.label",
        description="%WebsocketServer.description")
@Service
@Properties( {
        @Property(name = "service.vendor", value = "Adobe Systems Inc."),
        @Property(name = "filter.scope", value = "request", propertyPrivate=true),
        @Property(name = "filter.order", intValue = -1000000000, propertyPrivate=true )})
public class WebsocketServer implements StreamingServer{

    private final Logger log = LoggerFactory.getLogger(getClass());

    protected void activate(ComponentContext ctx) {
        log.info("Websocket Server started");
    }

    public void destroy() {
        log.info("Websocket Servber stopped");
    }
}
