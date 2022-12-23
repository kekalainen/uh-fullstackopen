import express from 'express';

const PROTOCOL = 'http',
  HOST = 'localhost',
  PORT = 3001;

const app = express();

app.use(express.json());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server listening at ${PROTOCOL}://${HOST}:${PORT}`);
});
