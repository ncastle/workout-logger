import type { NextApiResponse } from 'next';
import { MyNextApiRequest, ResponseData } from '../../../utils/types';
import { getExercises } from '../../../prisma/scripts';
import { getErrorMessage } from '../../../utils/error';

export default async function handler(
  req: MyNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const encodedEmail = req.query.email as string;
  const email = decodeURIComponent(encodedEmail);

  try {
    const exercises = await getExercises(email);
    res.status(200).json({
      result: `Succesfully retrieved exercises for user with email ${email}`,
      data: exercises,
    });
  } catch (error: unknown) {
    // this allows for seeing the actual prisma error message, along with the clientVersion
    // data, otherwise the message gets lost somewhere in the Response
    const assertedError = error as Error;
    const theError = { ...assertedError, message: getErrorMessage(error) };

    res.status(500).json({
      result: 'Error trying to get exercises',
      data: [],
      error: theError,
    });
  }
}
