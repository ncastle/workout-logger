import type { NextApiResponse } from 'next';
import { MyNextApiRequest, ResponseData } from '../../../../utils/types';
import { getDay } from '../../../../prisma/scripts';
import { getErrorMessage } from '../../../../utils/error';

// TODO: the slug for this route should be changed to match
//       what it is actually taking... i.e. [id] => [date]
export default async function handler(
  req: MyNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const id = req.query.id as string;
  const isoString = decodeURIComponent(id);
  console.log('server', { isoString });

  try {
    const day = await getDay(isoString);
    res.status(200).json({
      result: `Succesfully retrieved day for user with isoString ${isoString}`,
      data: day,
    });
  } catch (error: unknown) {
    // this allows for seeing the actual prisma error message, along with the clientVersion
    // data, otherwise the message gets lost somewhere in the Response
    const assertedError = error as Error;
    const theError = { ...assertedError, message: getErrorMessage(error) };

    res.status(500).json({
      result: 'Error trying to get day',
      data: [],
      error: theError,
    });
  }
}
