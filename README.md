# workout-app

## Description

An app to create and track workouts and progress made in the gym

## Stack

Next.js, React, TypeScript, TailwindCSS, Prisma, MySQL

## Configuration

- Created using `create-next-app` using TypeScript and TailwindCSS configuration options

## Future Features:

- Weight logging page
- Can generate workouts based on criteria:
  - Certain exercises/types (Ex: Pull, Push, Legs, Upper, Lower, Core, Arms, Shoulders, etc.)
  - How many days you want
- Create a custom workout selecting from exercise list or creating your own
- Admin to see created workouts among all users?
- Create a workout and post to database and allow for other users to search workouts?
- Profile?
- UI to easily see progress in certain areas based on selected filters
- remove placeholders and use floating labels?
  - can do this with all CSS or just use something like MUI, which has it built in with inputs

## MVP:

- Will be a ToDo list type of application
  - Enter in your exercises into a field
  - Will populate an 'ExerciseCard' (name pending) component and display to screen
  - Can edit, or delete a card
- Connect to MySQL using Prisma to store and edit data
- Mobile-first

## Log:

### 10/4/22:

- added to readme
- learned more about manual webpack setup through doc guides
  - source maps & asset and output management

### 10/7/22

- created basic add and delete funcitonality for logging an exercise

## 10/9/22

- created edit funcitonality on a logged exercise
