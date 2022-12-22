// prisma scripts that must be run on the server
// will through an error if called on Client
import { Exercise, User } from '@prisma/client';
import { UserData } from '../components/Test';
import { ExerciseItem } from '../utils/types';
import { prisma } from './db';

export async function createUser(data: UserData): Promise<User> {
  return prisma.user
    .create({
      data,
    })
    .catch((error) => {
      console.error('error caught in createUser script');
      throw error;
    });
}

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany().catch((error) => {
    console.error('error caught in getUsers script');
    throw error;
  });
}

// Prisma call to create an Exercise and connect it to a User
// Required params: an ExerciseItem and the user's email to link
// Returns the created Exercise
export async function logExercise(
  item: ExerciseItem,
  userEmail: string
): Promise<Exercise> {
  return prisma.exercise
    .create({
      data: {
        id: item.id,
        exercise: item.exercise,
        weight: item.weight,
        reps: item.reps,
        user: {
          connect: { email: userEmail },
        },
      },
    })
    .catch((error) => {
      console.error('error caught in logExercise script');
      throw error;
    });
}

// Prisma call to find all exercises in db
// Required param: user email
// Returns an array of ExerciseItems
export async function getExercises(email: string): Promise<ExerciseItem[]> {
  return prisma.exercise
    .findMany({
      where: {
        user: { email },
      },
      select: {
        id: true,
        exercise: true,
        reps: true,
        weight: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
    .catch((error) => {
      console.error('error caught in getExercises script');
      throw error;
    });
}

// update exercise based on the item id
// Required Params: an ExerciseItem
export async function updateExercise(
  item: ExerciseItem
): Promise<ExerciseItem> {
  return prisma.exercise
    .update({
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
    })
    .catch((error) => {
      console.error('error caught in updateExercise script');
      throw error;
    });
}

export async function deleteExercise(
  exerciseId: string
): Promise<ExerciseItem> {
  return prisma.exercise
    .delete({
      where: { id: exerciseId },
      select: {
        id: true,
        exercise: true,
        reps: true,
        weight: true,
      },
    })
    .catch((error) => {
      console.error('error caught in deleteExercise script');
      throw error;
    });
}
