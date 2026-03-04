import axios from "axios";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaryEntries = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then((response) => response.data);
};

export const createDiaryEntry = (content: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, content)
    .then((response) => response.data);
};
