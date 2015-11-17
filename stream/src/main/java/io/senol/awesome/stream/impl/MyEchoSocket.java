package io.senol.awesome.stream.impl;

import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.commons.json.io.JSONWriter;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.StatusCode;

import org.eclipse.jetty.websocket.api.WebSocketListener;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.StringWriter;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;

public class MyEchoSocket implements WebSocketListener {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final CountDownLatch closeLatch;
    private ResourceResolver resolver;
    private UserManager userManager;

    @SuppressWarnings("unused")
    private Session session;

    public MyEchoSocket(ResourceResolver resolver) {
        this.resolver = resolver;
        this.closeLatch = new CountDownLatch(1);
        log.info("MyEchoSocket instance");
        this.userManager = resolver.adaptTo(UserManager.class);
    }

    public boolean awaitClose(int duration, TimeUnit unit) throws InterruptedException {
        log.info("await close socket");
        return this.closeLatch.await(duration, unit);
    }

    @OnWebSocketClose
    public void onClose(int statusCode, String reason) {
        log.info("closed");
    }

    @Override
    public void onWebSocketBinary(byte[] bytes, int i, int i2) {
        //To change body of implemented methods use File | Settings | File Templates.
        log.info("webscoket binary");
    }

    @Override
    public void onWebSocketClose(int i, String s) {
        log.info("Connection closed: %d - %s%n", i, s);
        this.session = null;
        this.closeLatch.countDown();
    }

    @Override
    public void onWebSocketConnect(Session session) {
        log.info("Got connect: %s%n", session);
        this.session = session;
        try {
            Future<Void> fut;
            fut = session.getRemote().sendStringByFuture("Hello from server");
            fut.get(2, TimeUnit.SECONDS);
            //fut = session.getRemote().sendStringByFuture("Thanks for the conversation.");
            //fut.get(2, TimeUnit.SECONDS);
            //session.close(StatusCode.NORMAL, "I'm done");
        } catch (Throwable t) {
            t.printStackTrace();
        }
    }

    @Override
    public void onWebSocketError(Throwable throwable) {
        //To change body of implemented methods use File | Settings | File Templates.
        log.error("error websocket", throwable);
    }

    @Override
    public void onWebSocketText(String s) {
        log.info("Got msg: %s%n", s);
        try {
            StringWriter sw = new StringWriter();
            new JSONWriter(sw)
                    .object()
                    .key("message from resolver.ResourceResolver resourceResolver ")
                    .value(resolver.getUserID())
                    .key("userprofile")
                    .value(userManager.getAuthorizable(resolver.getUserID()).getPath())
                    .endObject();
            this.session.getRemote().sendString(sw.toString());
        } catch (Exception e) {
            e.printStackTrace();
            try {
                this.session.getRemote().sendString(e.getMessage());
            } catch (IOException e1) {
                log.error("error response", e1);
            }
        }
    }
}