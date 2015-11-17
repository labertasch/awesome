package io.senol.awesome.stream;

/**
 * Created with IntelliJ IDEA.
 * User: stas
 * Date: 20/08/15
 * Time: 10:30
 * To change this template use File | Settings | File Templates.
 */
public interface StreamResourceService {

    public void register(StreamResource streamResource);
    public void unregistert(StreamResource streamResource);
    public void notify(ResourceEvent event);

}
