import cors from 'cors';
import express from 'express';
import diagnosisRouter from './routes/diagnoses';

const PROTOCOL = 'http',
  HOST = 'localhost',
  PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, () => {
  console.log(`Server listening at ${PROTOCOL}://${HOST}:${PORT}`);
});
