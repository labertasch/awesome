package io.senol.awesome.stream;

import io.senol.awesome.stream.api.MessageType;
import org.apache.sling.api.resource.Resource;

import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: stas
 * Date: 20/08/15
 * Time: 10:38
 * To change this template use File | Settings | File Templates.
 */
public interface ResourceEvent extends MessageType{

    public static enum EventType {
        RESOURCE_ADDED, RESOURCE_MODIFIED, RESOURCE_REMOVED
    }

    public String getPath();
    public String getTopic();
    public String getResourceType();

    public String[] getAddedProperties();
    public String[] getChangedProperties();
    public String[] getRemovedProperties();

    public String getProperty(String propertyName);
    public Map getProperties();
}
