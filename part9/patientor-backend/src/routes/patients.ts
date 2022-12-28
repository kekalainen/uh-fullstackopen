import express, { Request } from 'express';
import patientService from '../services/patientService';
import { NewPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitive());
});

router.post('/', (req: Request<unknown, unknown, NewPatient>, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const patient = patientService.add({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.json(patient);
});

export default router;
