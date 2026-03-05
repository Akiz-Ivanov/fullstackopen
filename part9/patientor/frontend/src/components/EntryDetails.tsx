import { Favorite, LocalHospital, Work } from "@mui/icons-material";
import { Diagnosis, Entry } from "../types";
import { Card, CardContent, Typography } from "@mui/material";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const typeSpecificDetails = () => {
    switch (entry.type) {
      case "Hospital":
        return (
          <div>
            <LocalHospital />
            <p>Discharge criteria: {entry.discharge.criteria}</p>
            <p>Discharge date: {entry.discharge.date}</p>
          </div>
        );
      case "HealthCheck":
        return (
          <div>
            <Favorite
              style={{
                color: entry.healthCheckRating === 0 ? "green" : "yellow",
              }}
            />
            <p>Health Rating: {entry.healthCheckRating}</p>
          </div>
        );
      case "OccupationalHealthcare":
        return (
          <div>
            <p>Employer: {entry.employerName}</p>
            {entry.sickLeave && (
              <div>
                <Work />
                <strong>Sick Leave:</strong>
                <p>start date: {entry.sickLeave.startDate}</p>
                <p>end date: {entry.sickLeave.endDate}</p>
              </div>
            )}
          </div>
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Typography>
          {entry.date} {entry.description}
        </Typography>
        {entry.diagnosisCodes && (
          <ul>
            {entry.diagnosisCodes.map((code) => (
              <li key={code}>
                {code} {diagnoses.find((d) => d.code === code)?.name}
              </li>
            ))}
          </ul>
        )}
        {typeSpecificDetails()}
      </CardContent>
    </Card>
  );
};

export default EntryDetails;
