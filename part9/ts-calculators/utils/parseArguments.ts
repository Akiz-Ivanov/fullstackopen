interface BmiValues {
  height: number;
  weight: number;
}

interface ExerciseValues {
  target: number;
  dailyHours: number[];
}

export const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values must be numbers!");
  }

  return { height, weight };
};

export const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error("Target must be a number!");

  const dailyHours = args.slice(3).map((h) => {
    const hour = Number(h);
    if (isNaN(hour)) throw new Error(`Value "${h}" is not a number!`);
    return hour;
  });

  return { target, dailyHours };
};
