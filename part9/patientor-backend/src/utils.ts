import { Entry, EntryTypes, Gender, NewPatient } from './types';

const isArray = (arg: unknown): arg is unknown[] => {
  return Array.isArray(arg);
};

const isObject = (arg: unknown): arg is object => {
  return typeof arg === 'object' && arg !== null;
};

const isUndefinedOrNull = (arg: unknown): arg is undefined | null => {
  return typeof arg === 'undefined' || arg === null;
};

const isString = (arg: unknown): arg is string => {
  return typeof arg === 'string' || arg instanceof String;
};

const isDate = (str: string): boolean => {
  return !!Date.parse(str);
};

const capitalizeFirst = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
};

const isGender = (arg: unknown): arg is Gender => {
  return isString(arg) && capitalizeFirst(arg) in Gender;
};

const isEntry = (arg: unknown): arg is Entry => {
  return (
    isObject(arg) &&
    'type' in arg &&
    isString(arg.type) &&
    EntryTypes.includes(arg.type as typeof EntryTypes[number])
  );
};

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error('Name must be a string.');

  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date))
    throw new Error('Date must be formatted properly.');

  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || !ssn.match(/\d{6}-\d{2}(\d|[A-Z]){1,2}/))
    throw new Error('SSN must be formatted properly.');

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error('Occupation must be a string.');

  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (
    !isString(gender) ||
    !(gender = gender.toLowerCase()) ||
    !isGender(gender)
  )
    throw new Error(
      'Gender must be one of the following: ' +
        Object.values(Gender).join(', ') +
        '.'
    );

  return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (isUndefinedOrNull(entries)) return [];

  if (!isArray(entries))
    throw new Error('Entries must be convertible to an array.');

  if (!entries.every((entry): entry is Entry => isEntry(entry)))
    throw new Error('Each entry must conform to the Entry type.');

  return entries;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
  entries,
}: Record<string, unknown>): NewPatient => {
  return {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender),
    entries: parseEntries(entries),
  };
};
