import React from 'react';

const EventList = ({ filteredEvents, registeredEvents, handleEventAction, categories }) => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
                const registeredItem = registeredEvents.find((item) => item.event === event.title);
                return <EventCard key={event.id} event={event} registeredItem={registeredItem} handleEventAction={handleEventAction} categories={categories} />;
            })}
        </div>
    );
};

export default EventList;