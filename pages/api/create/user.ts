import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../../lib/password';
import { prisma } from '../../../prisma/db';
import { v4 as uuid } from 'uuid';
import { withSessionRoute } from '../../../lib/withSession';

export default withSessionRoute(createUser);

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  // if no email or password, send appropriate response
  if (!email || !password) {
    return res
      .status(500)
      .send({ user: null, message: 'No email or password' });
  }
  // generate hased password
  const hashedPass = await hashPassword(password);

  try {
    // create user
    const user = await prisma.user.create({
      data: {
        id: uuid(),
        email,
        password: hashedPass,
      },
      select: {
        id: true,
        email: true,
      },
    });

    req.session.user = { ...user, isLoggedIn: true };
    await req.session.save();
    return res.send({ user: { ...user, isLoggedIn: true } });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return res.json({ ok: false, message: error.message });
    }
  }
}
