import express from 'express';
import { calculateBmi, parseBmiArguments } from './bmiCalculator';

const PROTOCOL = 'http',
  HOST = 'localhost',
  PORT = 3003;

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;

    if (typeof height !== 'string' || typeof weight !== 'string')
      throw new Error('Missing parameters.');

    const args = parseBmiArguments([height, weight]);

    res.send({
      weight: args[1],
      height: args[0],
      bmi: calculateBmi(...args),
    });
  } catch (error: unknown) {
    res.status(400).send({
      error: error instanceof Error ? error.message : 'Unknown error.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at ${PROTOCOL}://${HOST}:${PORT}`);
});
