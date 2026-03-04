import { useEffect, useState } from "react";
import { createDiaryEntry, getAllDiaryEntries } from "./services/diaryService";
import axios from "axios";
import Notify from "./components/Notify";

import {
  NonSensitiveDiaryEntry,
  Visibility,
  Weather,
  ValidationError,
} from "./types";

const App = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>(
    [],
  );

  const [date, setDate] = useState<string>("");
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState<string>("");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      setDiaryEntries(data);
    });
  }, []);

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    createDiaryEntry(newEntry)
      .then((data) => {
        setDiaryEntries(diaryEntries.concat(data));

        setDate("");
        setWeather(Weather.Sunny);
        setVisibility(Visibility.Great);
        setComment("");
      })
      .catch((error: unknown) => {
        if (
          axios.isAxiosError<ValidationError, Record<string, unknown>>(error)
        ) {
          setError(error.response?.data.message ?? error.message);
        } else {
          console.error(error);
        }
      });
  };

  return (
    <main>
      <h1>Flight Diary</h1>

      <h2>Add new entry</h2>
      <Notify message={error} />
      <form onSubmit={diaryEntryCreation}>
        <label htmlFor="date">Date: </label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />

        <fieldset>
          <legend>Weather:</legend>

          {Object.values(Weather).map((w) => (
            <label key={w}>
              <input
                type="radio"
                name="weather"
                value={w}
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Visibility:</legend>

          {Object.values(Visibility).map((v) => (
            <label key={v}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </fieldset>

        <label htmlFor="comment">Comment: </label>
        <input
          id="comment"
          name="comment"
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />

        <button type="submit">add</button>
      </form>

      <h2>Diary entries</h2>
      <ul>
        {diaryEntries.map((diaryEntry) => (
          <li key={diaryEntry.id}>
            <div>
              <p>{diaryEntry.date}</p>
              <p>weather: {diaryEntry.weather}</p>
              <p>visibility: {diaryEntry.visibility}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
