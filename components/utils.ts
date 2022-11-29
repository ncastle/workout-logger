import { Dispatch, SetStateAction } from 'react';
import type { ExerciseItem, ResponseData } from '../utils/types';

export const fetchExercises = async (
  setFunc: Dispatch<SetStateAction<ExerciseItem[]>>
) => {
  const options: RequestInit = {
    method: 'GET',
  };
  const reqQuery = encodeURIComponent('nick@ncdev.io');
  const response = await fetch(`/api/get-exercises/${reqQuery}`, options);
  const json = (await response.json()) as ResponseData;
  const exercises = json.data as ExerciseItem[];
  setFunc(exercises);
};
