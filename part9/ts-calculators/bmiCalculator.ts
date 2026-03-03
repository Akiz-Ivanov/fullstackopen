import { parseBmiArguments } from "./utils/parseArguments";

const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmiNumber = weight / (heightInMeters * heightInMeters);

  if (bmiNumber < 18.5) {
    return "Underweight";
  } else if (bmiNumber < 25) {
    return "Normal range";
  } else if (bmiNumber < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
