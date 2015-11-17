package io.senol.awesome.stream;

import org.eclipse.jetty.websocket.api.WebSocketListener;

/**
 * Created with IntelliJ IDEA.
 * User: stas
 * Date: 20/08/15
 * Time: 10:36
 * To change this template use File | Settings | File Templates.
 */
public interface StreamResource extends WebSocketListener {

    public void onResourceChanged(ResourceEvent event);
    public void onResourceAdded(ResourceEvent event);
    public void onResourceRemoved(ResourceEvent event);
    public void onResourceEvent(ResourceEvent event);



}
