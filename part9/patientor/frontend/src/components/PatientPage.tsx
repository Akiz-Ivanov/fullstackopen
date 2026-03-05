import { useParams } from "react-router-dom";
import type { Patient } from "../types";
import { useEffect, useState } from "react";
import patientService from "../services/patients";
import { Box, Card, CardContent, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Gender } from "../types";

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

const PatientPage = () => {
  const id = useParams<{ id: string }>().id;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      const patient = await patientService.getPatientById(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

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

          <Typography variant="h5">entries</Typography>
          {entries.map((entry) => (
            <Card key={entry.id} variant="outlined" sx={{ mt: 2 }}>
              <CardContent>
                <Typography>
                  {entry.date} {entry.description}
                </Typography>
                {entry.diagnosisCodes && (
                  <ul>
                    {entry.diagnosisCodes.map((code) => (
                      <li key={code}>{code}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientPage;
