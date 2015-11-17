package io.senol.awesome.stream.impl;

import io.senol.awesome.stream.StreamResourceService;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.io.JSONWriter;
import org.eclipse.jetty.websocket.servlet.WebSocketServlet;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


/**
 * Created with IntelliJ IDEA.
 * User: stas
 * Date: 10/08/15
 * Time: 11:07
 * To change this template use File | Settings | File Templates.
 */
@SuppressWarnings("serial")
@SlingServlet(
        paths = {
                "/bin/awesome/stream",
                "/bin/awesome/stream/token.json"
        })
@Service
@Properties( {
        @Property(name = "service.vendor", value = "Adobe Systems Inc."),
        @Property(name = "filter.scope", value = "request", propertyPrivate=true),
        @Property(name = "filter.order", intValue = -1000000000, propertyPrivate=true )})
public class StreamServlet extends WebSocketServlet {
    private final Logger log = LoggerFactory.getLogger(getClass());

    @Reference
    private org.apache.sling.api.resource.ResourceResolverFactory resolverFactory;

    @Reference
    private StreamResourceService streamResourceService;

    @Override
    public void configure(WebSocketServletFactory factory) {
        //To change body of implemented methods use File | Settings | File Templates.
        log.info("configure webscoket server");
        //factory.getPolicy().setIdleTimeout(10000);
        ///factory.register(MyEchoSocket.class);

        // login with user from session

        factory.setCreator(new WebsocketCreator(resolverFactory, streamResourceService));
        log.info("configure webscoket server configured");
    }


    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse resp) throws ServletException, IOException {
        SlingHttpServletRequest req = (SlingHttpServletRequest) request;

        String token = req.getCookie("login-token").getValue();

        resp.setContentType("application/json");
        resp.setCharacterEncoding("utf-8");
        resp.setHeader("Cache-Control" ,"private, max-age=0, no-cache");
        try {
            JSONWriter w = new JSONWriter(resp.getWriter());
            w.object();
            w.key("token").value(token);
            w.key("success").value("ok");
            w.endObject();
        } catch (JSONException e) {
            throw new IOException(e);
        }
        resp.flushBuffer();
      }
}
