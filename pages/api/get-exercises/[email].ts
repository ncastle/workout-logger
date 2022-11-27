import type { NextApiResponse } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiError } from 'next/dist/server/api-utils';
import { MyNextApiRequest, ResponseData } from '../../../utils/types';
import { getExercises } from '../../../prisma/scripts';

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
  } catch (error: ApiError | unknown) {
    console.log('error caught in log-exercise api');
    res.status(500).json({
      result: 'Error trying to log exercise',
      data: null,
      error,
    });
  }
}
