import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/events';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/api', eventRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
