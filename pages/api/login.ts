import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../lib/withSession';

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  let email;
  try {
    const body = JSON.parse(req.body);
    email = body.email;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }

  const user = {
    id: 123,
    email: email ?? 'nick@ncdev.io',
    admin: true,
  };

  console.log({ user });
  // get user from database then:
  req.session.user = { ...user };
  await req.session.save();

  res.send({ user: { ...user, isLoggedIn: true } });
}
