import { useParams } from "react-router-dom";
import type { Diagnosis, EntryWithoutId, Patient } from "../types";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Gender } from "../types";
import EntryDetails from "./EntryDetails";
import axios from "axios";
import EntryForm from "./EntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return <MaleIcon />;
    case Gender.Female:
      return <FemaleIcon />;
    case Gender.Other:
      return <TransgenderIcon />;
  }
};

const PatientPage = ({ diagnoses }: Props) => {
  const id = useParams<{ id: string }>().id;
  const [patient, setPatient] = useState<Patient | null>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      const patient = await patientService.getPatientById(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (!id) return;
    try {
      await patientService.createNewEntry(id, values);
      const updatedPatient = await patientService.getPatientById(id);
      setPatient(updatedPatient);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const errorData = e.response?.data?.error;
        if (Array.isArray(errorData)) {
          setError(errorData[0]?.message ?? "Validation error");
        } else {
          setError(typeof errorData === "string" ? errorData : "Unknown error");
        }
      }
    }
  };

  if (!patient) return <Typography>Loading...</Typography>;

  const { entries } = patient;

  return (
    <Box mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5">
            {patient.name} {genderIcon(patient.gender)}
          </Typography>
          <Typography>SSN: {patient.ssn}</Typography>
          <Typography>Occupation: {patient.occupation}</Typography>
          <Typography>Date of birth: {patient.dateOfBirth}</Typography>

          {!modalOpen ? (
            <Button variant="contained" onClick={() => setModalOpen(true)}>
              Add New Entry
            </Button>
          ) : (
            <EntryForm
              onSubmit={submitNewEntry}
              onCancel={closeModal}
              diagnoses={diagnoses}
              error={error}
            />
          )}

          <Typography variant="h5">entries</Typography>
          {entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientPage;
