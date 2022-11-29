// prisma scripts that must be run on the server
// will through an error if called on Client
import { Exercise, User } from '@prisma/client';
import { UserData } from '../components/Test';
import { ExerciseItem } from '../utils/types';
import { prisma } from './db';

export async function createUser(data: UserData): Promise<User> {
  const user = await prisma.user.create({
    data,
  });
  return user;
}

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

// Prisma call to create an Exercise and connect it to a User
// Required params: an ExerciseItem and the user's email to link
// Returns the created Exercise
export async function logExercise(
  item: ExerciseItem,
  userEmail: string
): Promise<Exercise> {
  try {
    const exercise = await prisma.exercise.create({
      data: {
        exercise: item.exercise,
        weight: item.weight,
        reps: item.reps,
        user: {
          connect: { email: userEmail },
        },
      },
    });
    return exercise;
  } catch (error: Error | unknown) {
    console.error('error caught in logExercise script');
    throw error;
  }
}

// Prisma call to find all exercises in db
// Required param: user email
// Returns an array of ExerciseItems
export async function getExercises(email: string): Promise<ExerciseItem[]> {
  return prisma.exercise.findMany({
    where: {
      user: { email },
    },
    select: {
      id: true,
      exercise: true,
      reps: true,
      weight: true,
    },
  });
}

// update exercise based on the item id
// Required Params: an ExerciseItem
export async function updateExercise(
  item: ExerciseItem
): Promise<ExerciseItem> {
  const exercise = await prisma.exercise.update({
    where: { id: item.id },
    data: {
      exercise: item.exercise,
      weight: item.weight,
      reps: item.reps,
    },
    select: {
      id: true,
      exercise: true,
      reps: true,
      weight: true,
    },
  });
  return exercise;
}
