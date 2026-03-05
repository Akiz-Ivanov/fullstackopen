import { SyntheticEvent, useState } from "react";
import {
  EntryType,
  entryTypes,
  EntryWithoutId,
  HealthCheckRating,
  Diagnosis,
} from "../types";
import { assertNever } from "../utils";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  OutlinedInput,
  Chip,
  Typography,
} from "@mui/material";

interface Props {
  onSubmit: (values: EntryWithoutId) => Promise<void>;
  onCancel: () => void;
  diagnoses: Diagnosis[];
  error?: string;
}

const EntryForm = ({ onSubmit, onCancel, diagnoses, error }: Props) => {
  const [selectedType, setSelectedType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );

  const submitEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const base = { description, date, specialist, diagnosisCodes };
    switch (selectedType) {
      case "HealthCheck":
        return onSubmit({ ...base, type: "HealthCheck", healthCheckRating });
      case "Hospital":
        return onSubmit({
          ...base,
          type: "Hospital",
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        });
      case "OccupationalHealthcare":
        return onSubmit({
          ...base,
          type: "OccupationalHealthcare",
          employerName,
          ...(sickLeaveStart &&
            sickLeaveEnd && {
              sickLeave: { startDate: sickLeaveStart, endDate: sickLeaveEnd },
            }),
        });
      default:
        return assertNever(selectedType);
    }
  };

  const typeSpecificFields = () => {
    switch (selectedType) {
      case "HealthCheck":
        return (
          <FormControl fullWidth>
            <InputLabel>Health Check Rating</InputLabel>
            <Select
              value={healthCheckRating}
              label="Health Check Rating"
              onChange={({ target }) =>
                setHealthCheckRating(Number(target.value) as HealthCheckRating)
              }
            >
              {Object.entries(HealthCheckRating)
                .filter(([, v]) => typeof v === "number")
                .map(([key, val]) => (
                  <MenuItem key={key} value={val}>
                    {key} ({val})
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        );
      case "Hospital":
        return (
          <>
            <TextField
              label="Discharge Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              fullWidth
            />
            <TextField
              label="Discharge Criteria"
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              fullWidth
            />
          </>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <TextField
              label="Employer Name"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              fullWidth
            />
            <TextField
              label="Sick Leave Start"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
              fullWidth
            />
            <TextField
              label="Sick Leave End"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
              fullWidth
            />
          </>
        );
      default:
        return assertNever(selectedType);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitEntry}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 2,
        mb: 2,
        p: 2,
        border: "1px dashed grey",
      }}
    >
      <Typography variant="h6">New Entry</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <FormControl fullWidth>
        <InputLabel>Entry Type</InputLabel>
        <Select
          value={selectedType}
          label="Entry Type"
          onChange={({ target }) => setSelectedType(target.value as EntryType)}
        >
          {entryTypes.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        fullWidth
        required
      />
      <TextField
        label="Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={({ target }) => setDate(target.value)}
        fullWidth
        required
      />
      <TextField
        label="Specialist"
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        fullWidth
        required
      />

      <FormControl fullWidth>
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select
          multiple
          value={diagnosisCodes}
          onChange={({ target }) =>
            setDiagnosisCodes(
              typeof target.value === "string"
                ? target.value.split(",")
                : target.value,
            )
          }
          input={<OutlinedInput label="Diagnosis Codes" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((code) => (
                <Chip key={code} label={code} />
              ))}
            </Box>
          )}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code} - {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {typeSpecificFields()}

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button type="submit" variant="contained">
          Add Entry
        </Button>
        <Button variant="outlined" color="error" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default EntryForm;
