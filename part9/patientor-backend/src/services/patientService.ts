import data from '../../data/patients.json';

import { v4 as uuid } from 'uuid';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const add = (payload: NewPatient): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...payload,
  };

  data.push(patient);

  return patient;
};

const getAll = (): Patient[] => {
  return data;
};

const getNonSensitive = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  add,
  getAll,
  getNonSensitive,
};
