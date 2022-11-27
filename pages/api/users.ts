// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { User } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { ApiError } from 'next/dist/server/api-utils';
import { createUser, getUsers } from '../../prisma/scripts';
import { UserData } from '../../components/Test';
import { MyNextApiRequest, ResponseData } from '../../utils/types';

async function handlePostRequest(req: MyNextApiRequest): Promise<User> {
  const userData = JSON.parse(req.body) as UserData;
  return createUser(userData).catch(async (e) => {
    throw e;
  });
}

async function handleGetRequest(): Promise<User[]> {
  const users = await getUsers();
  return users;
}

export default async function handler(
  req: MyNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { method } = req;

  try {
    switch (method?.toLowerCase()) {
      case 'post': {
        const user = await handlePostRequest(req);
        return res
          .status(200)
          .json({ result: 'Successfuly created user', data: user });
      }
      case 'get': {
        const users = await handleGetRequest();
        return res.status(200).json({
          result: 'Successfully retrieved users',
          data: users,
        });
      }
      default:
        break;
    }
  } catch (error: ApiError | unknown) {
    console.log(error);
    return res.status(500).json({
      result: 'Something went wrong during request, see error for more details',
      data: null,
      error,
    });
  }
}
