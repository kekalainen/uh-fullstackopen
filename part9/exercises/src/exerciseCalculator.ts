interface ExerciseCalculatorResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

enum ExerciseRating {
  Bad = 1,
  Decent,
  Good,
}

const calculateExercises = (
  hours: number[],
  target: number
): ExerciseCalculatorResult => {
  if (hours.some((h) => h < 0) || target < 0)
    throw new RangeError('Arguments must be zeros or positive numbers.');

  target = Math.abs(target);

  const average = hours.reduce((acc, val) => acc + val, 0) / hours.length;

  const rating: ExerciseRating = Math.min(
    Math.max(
      ExerciseRating.Bad,
      Math.floor((average / target) * ExerciseRating.Good)
    ),
    ExerciseRating.Good
  );

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h > 0).length,
    success: average >= target,
    rating,
    ratingDescription: ExerciseRating[rating],
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
