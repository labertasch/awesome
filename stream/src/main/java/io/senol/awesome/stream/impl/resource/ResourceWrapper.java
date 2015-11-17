package io.senol.awesome.stream.impl.resource;

import io.senol.awesome.stream.StreamResource;
import io.senol.awesome.stream.api.MessageType;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceMetadata;
import org.apache.sling.api.resource.ValueMap;

import java.util.*;
import java.util.concurrent.CopyOnWriteArraySet;

/**
 * Created with IntelliJ IDEA.
 * User: stas
 * Date: 20/08/15
 * Time: 15:28
 * To change this template use File | Settings | File Templates.
 */
public class ResourceWrapper implements MessageType{
    Resource resource;
    private final Map<String, String> children = new HashMap<String, String>();
    private String type;

    public ResourceWrapper(Resource resource, String type) {
        this.resource = resource;
       Iterator<Resource> children = resource.listChildren();

        while(children.hasNext()){
            Resource child = children.next();
            this.children.put(child.getName(), child.getPath());
        }

        this.type = type;
    }

    public String getName() {
        return resource.getName();
    }

    public String getPath() {
        return resource.getPath();
    }

    public String getParent() {
        if(resource.getParent() != null) {
            return resource.getParent().getPath();
        }
        return null;
    }

    public ResourceMetadata getResourceMetadata() {
        return resource.getResourceMetadata();
    }

    public String getResourceSuperType() {
        return resource.getResourceSuperType();
    }

    public String getResourceType() {
        return resource.getResourceType();
    }

    public ValueMap getProperties() {
        return resource.getValueMap();
    }

    public boolean getChildren() {
        return resource.hasChildren();
    }

    public Map<String, String> getAllChildren(){
        return children;
    }

    @Override
    public String getType() {
        return this.type;
    }
}