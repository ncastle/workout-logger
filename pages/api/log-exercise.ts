import type { NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ApiError } from 'next/dist/server/api-utils';
import {
  ExerciseItem,
  MyNextApiRequest,
  ResponseData,
} from '../../utils/types';
import { logExercise } from '../../prisma/scripts';

export default async function handler(
  req: MyNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { item, userEmail } = JSON.parse(req.body) as {
    item: ExerciseItem;
    userEmail: string;
  };

  try {
    const exercise = await logExercise(item, userEmail);
    res
      .status(200)
      .json({ result: 'Succesfully logged exercise', data: exercise });
  } catch (error: ApiError | unknown) {
    console.log('error caught in log-exercise api');
    res.status(500).json({
      result: 'Error trying to log exercise',
      data: null,
      error,
    });
  }
}
