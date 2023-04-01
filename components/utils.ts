import type { Day } from '@prisma/client';
import type { ExerciseItem, ResponseData } from '../utils/types';

// makes a call to the get-exercises api route
// which will get all exercises, given an email
// for now, email is hardcoded for one user
// TODO: implement function to take an email parameter which
//        will fetch exercises for that email
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

// makes a call to the /get/days api route
// which fetches all created 'Days' in the database for a given email
// for now, email is hardcoded
// TODO: implement function to take an email parameter which
//        will fetch exercises for that email
export const fetchDays = async (): Promise<Day[]> => {
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
  const day = json.data as Day[];
  return day;
};

// makes a call to the /get/day/[id] api route
// takes an date string in ISO format as a parameter and uses that
// to get data stored in the database for the day entry with the
// corresponding date
// This might eventually take an id, still figuring out how I want
// to do this
export const fetchDay = async (isoStringDate: string) => {
  const options: RequestInit = {
    method: 'GET',
  };
  const response = await fetch(`/api/get/day/${isoStringDate}`, options);
  const json = (await response.json()) as ResponseData;
  if (json.error) {
    throw Error(json.error.message);
  }
  const day = json.data as Day;
  return day;
};
