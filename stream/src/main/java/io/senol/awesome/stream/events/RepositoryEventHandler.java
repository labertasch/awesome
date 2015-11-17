package io.senol.awesome.stream.events;

import io.senol.awesome.stream.ResourceEvent;
import io.senol.awesome.stream.StreamResourceService;
import io.senol.awesome.stream.impl.ResourceEventImpl;
import io.senol.awesome.stream.impl.StreamResourceImpl;
import org.apache.felix.scr.annotations.*;
import org.apache.sling.api.SlingConstants;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.event.jobs.Job;
import org.apache.sling.event.jobs.JobManager;
import org.apache.sling.event.jobs.consumer.JobConsumer;
import org.codehaus.jackson.map.ObjectMapper;

import org.osgi.service.event.Event;
import org.osgi.service.event.EventConstants;
import org.osgi.service.event.EventHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 * User: stas
 * Date: 11/08/15
 * Time: 15:54
 * To change this template use File | Settings | File Templates.
 */
@Component(immediate = true)
@Properties({

        @Property(
                label = "Event Topics",
                value = {org.apache.sling.api.SlingConstants.TOPIC_RESOURCE_ADDED, SlingConstants.TOPIC_RESOURCE_CHANGED,
                SlingConstants.TOPIC_RESOURCE_REMOVED},
                description = "[Required] Event Topics this event handler will to respond to.",
                name = EventConstants.EVENT_TOPIC,
                propertyPrivate = true
        )
})
@Service
public class RepositoryEventHandler implements EventHandler {
    /** Default logger. */
    protected final Logger logger = LoggerFactory.getLogger(this.getClass());


    @Reference
    private StreamResourceService streamResourceService;

    @Override
    public void handleEvent(Event event) {
        ResourceEvent resourceEvent = new ResourceEventImpl(event);
        if(!resourceEvent.getPath().startsWith("/var")) {
            streamResourceService.notify(resourceEvent);
        /*ObjectMapper mapper = new ObjectMapper();
        try {
            logger.info(mapper.writeValueAsString(resourceEvent));
        } catch (IOException e) {
            logger.error("error", e);
        } */
        }
    }


}
