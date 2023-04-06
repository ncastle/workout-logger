import { NextApiRequest, NextApiResponse } from 'next';
import { withSessionRoute } from '../../lib/withSession';
import { prisma } from '../../prisma/db';
import { hashPassword, verifyPassword } from '../../lib/password';

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  // look up user
  let user = await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });

  // if no user is found, send null user and message
  if (!user) {
    return res.send({
      user,
      message: 'No user found with that email address',
      error: true,
    });
  }

  // verify password
  const verified = await verifyPassword(password, user.password);

  // if password is wrong, send null user with message
  if (!verified) {
    return res.send({
      user: null,
      message: 'You entered the wrong password, try again!',
      error: true,
    });
  }

  // verified condition is extra precaution
  if (verified && user) {
    req.session.user = { ...user, isLoggedIn: true };
    await req.session.save();
    return res.send({
      user: { ...user, isLoggedIn: true },
      message: 'Successfully logged in!',
      error: false,
    });
  } else {
    return res.send({
      user: null,
      message: 'Something unexpected happened',
      error: true,
    });
  }
}
