import type { NextApiResponse } from 'next';
import {
  ExerciseItem,
  MyNextApiRequest,
  ResponseData,
} from '../../utils/types';
import { updateExercise } from '../../prisma/scripts';
import { getErrorMessage } from '../../utils/error';

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
  } catch (error: unknown) {
    // this allows for seeing the actual prisma error message, along with the clientVersion
    // data, otherwise the message gets lost somewhere in the Response
    const assertedError = error as Error;
    const theError = { ...assertedError, message: getErrorMessage(error) };

    res.status(500).json({
      result: 'Error trying to update exercise',
      data: null,
      error: theError,
    });
  }
}
