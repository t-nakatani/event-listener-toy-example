import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export interface Event {
  id: string;
  contractAddress: string;
  eventName: string;
  rpcUrl: string;
  abi: string;
}

export const registerEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  const response = await axios.post(`${API_URL}/events`, event);
  return response.data;
};

export const getEvents = async (): Promise<Event[]> => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};
