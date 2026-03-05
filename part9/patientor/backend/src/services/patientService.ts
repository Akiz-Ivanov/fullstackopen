import patients from "../../data/patients";
import { NewPatientEntry, NonSensitivePatient, Patient } from "../types";

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

export default {
  getNonSensitivePatient,
  addPatient,
  findById,
};
