import data from '../../data/patients.json';

import { NonSensitivePatient, Patient } from '../types';

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
  getAll,
  getNonSensitive,
};
