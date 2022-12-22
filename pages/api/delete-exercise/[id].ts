import type { NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiError } from 'next/dist/server/api-utils';
import { MyNextApiRequest, ResponseData } from '../../../utils/types';
import { deleteExercise } from '../../../prisma/scripts';
import { getErrorMessage } from '../../../utils/error';

export default async function handler(
  req: MyNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const exerciseId = req.query.id as string;
  try {
    await deleteExercise(exerciseId);
    res.status(200).json({
      result: `Succesfully deleted exercise with id ${exerciseId}`,
      data: null,
    });
  } catch (error: unknown) {
    // this allows for seeing the actual prisma error message, along with the clientVersion
    // data, otherwise the message gets lost somewhere in the Response
    const assertedError = error as Error;
    const theError = { ...assertedError, message: getErrorMessage(error) };

    res.status(500).json({
      result: 'Error trying to delete exercise',
      data: null,
      error: theError,
    });
  }
}
