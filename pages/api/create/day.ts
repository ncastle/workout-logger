import type { NextApiResponse } from 'next';
import type {
  DayItem,
  MyNextApiRequest,
  ResponseData,
} from '../../../utils/types';
import { createDay } from '../../../prisma/scripts';
import { getErrorMessage } from '../../../utils/error';

export default async function handler(
  req: MyNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { dayItem, userEmail } = JSON.parse(req.body) as {
    dayItem: DayItem;
    userEmail: string;
  };

  try {
    const day = await createDay(dayItem, userEmail);
    res.status(200).json({ result: 'Succesfully created day', data: day });
  } catch (error: unknown) {
    // this allows for seeing the actual prisma error message, along with the clientVersion
    // data, otherwise the message gets lost somewhere in the Response
    const assertedError = error as Error;
    const theError = { ...assertedError, message: getErrorMessage(error) };

    res.status(500).json({
      result: 'Error trying to create day',
      data: null,
      error: theError,
    });
  }
}
