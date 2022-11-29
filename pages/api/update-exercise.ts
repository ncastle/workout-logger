import type { NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ApiError } from 'next/dist/server/api-utils';
import {
  ExerciseItem,
  MyNextApiRequest,
  ResponseData,
} from '../../utils/types';
import { updateExercise } from '../../prisma/scripts';

export default async function handler(
  req: MyNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { item } = JSON.parse(req.body) as {
    item: ExerciseItem;
  };

  try {
    const exercise = await updateExercise(item);
    res
      .status(200)
      .json({ result: 'Succesfully updated exercise', data: exercise });
  } catch (error: ApiError | unknown) {
    console.log('error caught in update-exercise api');
    res.status(500).json({
      result: 'Error trying to update exercise',
      data: null,
      error,
    });
  }
}
