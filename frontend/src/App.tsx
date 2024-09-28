import React from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

const App: React.FC = () => {
  return (
    <div>
      <h1>Blockchain Event Monitor</h1>
      <EventForm />
      <h2>Registered Events</h2>
      <EventList />
    </div>
  );
};

export default App;
