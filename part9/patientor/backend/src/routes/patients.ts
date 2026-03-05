import express from "express";
import { Response } from "express";

import patientService from "../services/patientService";
import { NonSensitivePatient, Patient } from "../types";
import { toNewPatientEntry, toNewEntry } from "../utils";
import z from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatient());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

router.get("/:id", (req, res: Response<Patient>) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const entry = toNewEntry(req.body);
    const patientId = req.params.id;
    const addedEntry = patientService.addEntry(patientId, entry);
    res.send(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else if (error instanceof Error && error.message.includes("not found")) {
      res.status(404).send({ error: error.message });
    } else {
      res.status(400).send({ error: "unknown error" });
    }
  }
});

export default router;
