export const formatPercentage = (percentage: number) => {
  return percentage.toFixed(0) + "%";
};

export const countErrors = (actual: string, expected: string) => {
  const expectedCharacters = expected.split("");
  return expectedCharacters.reduce((errors, expectedChar, index) => {
    const actualChar = actual[index];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calculateAccuracyPercentage = (total: number, errors: number) => {
  if (total > 0) {
    const corrects = total - errors;
    return (corrects / total) * 100;
  }
  return 0;
};

export const debug = (str: string) => {
  if (process.env.NODE_ENV === "development") {
    console.debug(str);
  }
};
