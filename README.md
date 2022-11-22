# workout-app

## Description
An app to create and track workouts and progress made in the gym


## Stack
Mern Stack


## Configuration
- The webpack & babel configuration for this project is based off of [this article](https://levelup.gitconnected.com/freedom-from-create-react-app-how-to-create-react-apps-without-cra-27fadeb79c82)
- I will be looking into the difference between development and production webpack configuration suggestions based on the [webpack docs](https://webpack.js.org/guides/production/)


## Future Features:
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
- Connect to MongoDB and store data
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
