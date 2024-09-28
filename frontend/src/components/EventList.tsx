import React, { useEffect, useState } from 'react';
import { getEvents, Event } from '../api';

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <ul>
      {events.map((event) => (
        <li key={event.id}>
          {event.eventName} - {event.contractAddress} ({event.rpcUrl})
        </li>
      ))}
    </ul>
  );
};

export default EventList;
