import { NextApiRequest } from 'next';
import { Exercise, User } from '@prisma/client';
import { ErrorWithMessage } from './error';

export const ActionTypes = {
  RESET_FORM: 'RESET_FORM',
  SET: 'SET',
  START_EDIT: 'START_EDIT',
};

export type DayItem = {
  id: string;
  workoutType: string;
  date: Date;
};

export type ExerciseItem = {
  id: string;
  exercise: string;
  weight: number;
  reps: number;
};

export type LoggerAction = {
  type: string;
  payload?: LoggerPayload;
};

// logger payload is essentially the same as the logger state
// put all properties are optional for setting behavior
export type LoggerPayload = {
  editIndex?: number;
  editItem?: ExerciseItem;
  exercise?: string;
  isEditing?: boolean;
  items?: ExerciseItem[];
  reps?: string;
  weight?: string;
};

export type LoggerState = {
  editIndex: number;
  exercise: string;
  isEditing: boolean;
  items: ExerciseItem[];
  reps: string;
  weight: string;
};

export type ResponseData = {
  result: string;
  error?: ErrorWithMessage;
  // use data field to cover all responses
  // TODO: could create more specific ResponseData types which
  data:
    | User[]
    | User
    | Exercise
    | Exercise[]
    | ExerciseItem
    | ExerciseItem[]
    | DayItem
    | DayItem[]
    | null;
};

export interface MyNextApiRequest extends NextApiRequest {
  body: string;
}
