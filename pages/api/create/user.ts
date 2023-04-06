import { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '../../../lib/password';
import { prisma } from '../../../prisma/db';
import { v4 as uuid } from 'uuid';
import { withSessionRoute } from '../../../lib/withSession';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export default withSessionRoute(createUser);

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  // if no email or password, send appropriate response
  if (!email || !password) {
    return res
      .status(500)
      .send({
        user: null,
        message: 'No email or password provided',
        error: true,
      });
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
    return res.send({
      user: { ...user, isLoggedIn: true },
      message: `User created using email: ${email}`,
      error: false,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.json({
          user: null,
          message:
            'There is already an account using that email, please login or sign up using a different email',
          error: true,
        });
      } else {
        return res.json({ user: null, message: error.message, error: true });
      }
    }
  }
}
