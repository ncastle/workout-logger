import { ApiError } from 'next/dist/server/api-utils';
import { NextApiRequest } from 'next';
import { Exercise, User } from '@prisma/client';

export type ExerciseItem = {
  id: string;
  exercise: string;
  weight: number;
  reps: number;
};

export type ResponseData = {
  result: string;
  error?: ApiError | unknown;
  // use data field to cover all responses
  // TODO: could create more specific ResponseData types which
  data:
    | User[]
    | User
    | Exercise
    | Exercise[]
    | ExerciseItem
    | ExerciseItem[]
    | null;
};

export interface MyNextApiRequest extends NextApiRequest {
  body: string;
}
