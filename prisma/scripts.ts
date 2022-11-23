// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
import { User } from '@prisma/client';
import { UserData } from '../components/Test';
import { prisma } from './db';

export async function createUser(data: UserData): Promise<void> {
  const user = await prisma.user.create({
    data,
  });
  console.log(user);
}

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}
