import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { startMonitoring } from '../services/monitorService';

const router = express.Router();

let events: any[] = [];

router.post('/events', (req, res) => {
  const { contractAddress, eventName, rpcUrl, abi } = req.body;
  const newEvent = { id: uuidv4(), contractAddress, eventName, rpcUrl, abi };
  events.push(newEvent);
  startMonitoring(newEvent);
  res.status(201).json(newEvent);
});

router.get('/events', (req, res) => {
  res.json(events);
});

export default router;
