import express, { Request } from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitive());
});

router.post(
  '/',
  (req: Request<unknown, unknown, Record<string, unknown>>, res) => {
    try {
      const patient = patientService.add(toNewPatient(req.body));

      res.json(patient);
    } catch (error: unknown) {
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Unknown error.',
      });
    }
  }
);

export default router;
