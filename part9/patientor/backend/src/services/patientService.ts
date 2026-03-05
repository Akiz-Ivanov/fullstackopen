import patients from "../../data/patients";
import {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
} from "../types";

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: crypto.randomUUID(),
    entries: [],
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addEntry = (id: string, entryObj: EntryWithoutId): Entry => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }

  const entry = {
    id: crypto.randomUUID(),
    ...entryObj,
  };

  patient.entries.push(entry);
  return entry;
};

export default {
  getNonSensitivePatient,
  addPatient,
  findById,
  addEntry,
};
