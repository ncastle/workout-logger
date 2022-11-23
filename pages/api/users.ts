// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import { ApiError } from 'next/dist/server/api-utils';
import { createUser, getUsers } from '../../prisma/scripts';
import { UserData } from '../../components/Test';

export type ResponseData = {
  result: string;
  error?: ApiError | unknown;
  users?: User[];
};

interface MyNextApiRequest extends NextApiRequest {
  body: string;
}

async function handlePostRequest(req: MyNextApiRequest): Promise<void> {
  console.log(req);
  console.log(typeof req.body);
  const userData = JSON.parse(req.body) as UserData;
  console.log('run createUser');
  return createUser(userData).catch(async (e) => {
    console.error(e);
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
        await handlePostRequest(req);
        return res.status(200).json({ result: 'Successfuly created user' });
      }
      case 'get': {
        const users = await handleGetRequest();
        return res.status(200).json({
          result: 'Successfully retrieved users',
          users,
        });
      }
      default:
        break;
    }
  } catch (error: ApiError | unknown) {
    console.log(error);
    return res.status(500).json({
      result: 'Something went wrong during request, see error for more details',
      error,
    });
  }
}
