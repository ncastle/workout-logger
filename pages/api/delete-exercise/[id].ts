import type { NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiError } from 'next/dist/server/api-utils';
import { MyNextApiRequest, ResponseData } from '../../../utils/types';
import { deleteExercise } from '../../../prisma/scripts';

export default async function handler(
  req: MyNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const exerciseId = req.query.id as string;
  console.log('exerciseId', exerciseId);
  try {
    await deleteExercise(exerciseId);
    res.status(200).json({
      result: `Succesfully deleted exercise with id ${exerciseId}`,
      data: null,
    });
  } catch (error: ApiError | unknown) {
    console.log('error caught in delete-exercise api');
    res.status(500).json({
      result: 'Error trying to delete exercise',
      data: null,
      error,
    });
  }
}
