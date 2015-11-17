package io.senol.awesome.stream.impl;

import io.senol.awesome.stream.ResourceEvent;
import io.senol.awesome.stream.api.MessageType;
import org.apache.sling.api.SlingConstants;
import org.osgi.service.event.Event;

import java.util.HashMap;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: stas
 * Date: 20/08/15
 * Time: 10:41
 * To change this template use File | Settings | File Templates.
 */
public class ResourceEventImpl implements ResourceEvent{


    private String[] removedProperties;
    private String path = null;
    private String topic = null;
    private String resourceType = null;
    private String[] addedProperties = null;
    private String[] changedProperties;

    private Map properties;

    {
        properties = new HashMap();
    }

    public ResourceEventImpl(Event event) {
        this.topic = event.getTopic();
        this.path = (String) event.getProperty(SlingConstants.PROPERTY_PATH);
        this.resourceType = (String) event.getProperty(SlingConstants.PROPERTY_RESOURCE_TYPE);
        this.addedProperties = (String[]) event.getProperty(SlingConstants.PROPERTY_ADDED_ATTRIBUTES);
        this.changedProperties = (String[]) event.getProperty(SlingConstants.PROPERTY_CHANGED_ATTRIBUTES);
        this.removedProperties = (String[]) event.getProperty(SlingConstants.PROPERTY_REMOVED_ATTRIBUTES);

        for(String propertyName : event.getPropertyNames()) {
            this.properties.put(propertyName, event.getProperty(propertyName));
        }
    }

    public boolean isChangedEvent() {
        return SlingConstants.TOPIC_RESOURCE_CHANGED.equals(this.topic);
    }

    public boolean isAddedEvent() {
        return SlingConstants.TOPIC_RESOURCE_ADDED.equals(this.topic);
    }

    public boolean isRemovedEvent() {
        return SlingConstants.TOPIC_RESOURCE_ADDED.equals(this.topic);
    }

    @Override
    public String getPath() {
        return path;
    }

    @Override
    public String getTopic() {
        return topic;
    }

    @Override
    public String getResourceType() {
        return resourceType;
    }



    @Override
    public String[] getAddedProperties() {
        return this.addedProperties;
    }

    @Override
    public String[] getChangedProperties() {
        return this.changedProperties;
    }

    @Override
    public String[] getRemovedProperties() {
        return this.removedProperties;
    }

    @Override
    public String getProperty(String propertyName) {
        return (String) properties.get(propertyName);
    }

    @Override
    public Map getProperties() {
        return properties;
    }

    @Override
    public String getType() {
        return "event";  //To change body of implemented methods use File | Settings | File Templates.
    }
}
