import { parseExerciseArguments } from "./utils/parseArguments";

interface CalcExercisesReturn {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type CalculateExercises = (
  dailyExerciseHours: number[],
  targetAmount: number,
) => CalcExercisesReturn;

export const calculateExercises: CalculateExercises = (
  dailyExerciseHours,
  targetAmount,
) => {
  const sum = dailyExerciseHours.reduce((acc, currVal) => acc + currVal, 0);
  const averageDaily = sum / dailyExerciseHours.length;

  let rating: number;
  let ratingDescription: string;

  const percentageOfTarget = averageDaily / targetAmount;

  if (percentageOfTarget >= 1) {
    rating = 3;
    ratingDescription = "excellent, target achieved or exceeded";
  } else if (percentageOfTarget >= 0.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "needs improvement, far below target";
  }

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter((day) => day !== 0).length,
    success: averageDaily >= targetAmount,
    rating,
    ratingDescription,
    target: targetAmount,
    average: averageDaily,
  };
};

if (require.main === module) {
  try {
    const { target, dailyHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
