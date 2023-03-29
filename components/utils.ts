import type { DayItem, ExerciseItem, ResponseData } from '../utils/types';

export const fetchExercises = async () => {
  const options: RequestInit = {
    method: 'GET',
  };
  const reqQuery = encodeURIComponent('nick@ncdev.io');
  const response = await fetch(`/api/get-exercises/${reqQuery}`, options);
  const json = (await response.json()) as ResponseData;
  if (json.error) {
    throw Error(json.error.message);
  }
  const exercises = json.data as ExerciseItem[];
  return exercises;
};

export const fetchDays = async (): Promise<DayItem[]> => {
  const options: RequestInit = {
    method: 'GET',
  };
  // using this value as the default until auth is implemented
  const reqQuery = encodeURIComponent('nick@ncdev.io');
  const response = await fetch(`/api/get/days/${reqQuery}`, options);
  const json = (await response.json()) as ResponseData;
  if (json.error) {
    throw Error(json.error.message);
  }
  const day = json.data as DayItem[];
  return day;
};
