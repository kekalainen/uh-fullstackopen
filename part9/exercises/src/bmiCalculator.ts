const bmiMetricUnits = (height: number, mass: number): number => {
  if (height <= 0 || mass <= 0)
    throw new RangeError('Arguments must be greater than zero.');

  return mass / Math.pow(height / 100, 2);
};

/**
 * Source: https://en.wikipedia.org/w/index.php?title=Body_mass_index&oldid=1032659751#Categories
 */
const bmiCategory = (bmi: number): string => {
  switch (true) {
    case bmi < 15:
      return 'Very severely underweight';
    case bmi < 16:
      return 'Severely underweight';
    case bmi < 18.5:
      return 'Underweight';
    case bmi < 25:
      return 'Normal (healthy weight)';
    case bmi < 30:
      return 'Overweight';
    case bmi < 35:
      return 'Obese Class I (Moderately obese)';
    case bmi < 40:
      return 'Obese Class II (Severely obese)';
    default:
      return 'Obese Class III (Very severely obese)';
  }
};

const calculateBmi = (height: number, mass: number): string => {
  return bmiCategory(bmiMetricUnits(height, mass));
};

console.log(calculateBmi(180, 74));
