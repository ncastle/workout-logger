import { ChangeEventHandler, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { ExerciseItem } from '../utils/types';
import ExerciseList from './ExerciseList';
import LoggingForm from './LoggingForm';
import { fetchExercises } from './utils';

// TODO: I think I can pull some of the state and functionality out
// of the component and create a useReducer
function LoggerPage() {
  const [items, setItems] = useState([] as ExerciseItem[]);
  const [exercise, setExercise] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  // default is -1 because indexes are going to be > 0
  const [editIndex, setEditIndex] = useState(-1);
  const [loggerError, setLoggerError] = useState('');

  // fetches the exercises from the mysql database on load/refresh
  useEffect(() => {
    fetchExercises(setItems).catch((error: Error) => {
      console.error('Error fetching exercises: ', error);
      setLoggerError(error.message);
    });
  }, []);

  // ChangeEventHandler function for the logger form
  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { name, value } = evt.target;
    if (name === 'exercise') {
      setExercise(value);
    }
    if (name === 'reps') {
      setReps(value);
    }
    if (name === 'weight') {
      setWeight(value);
    }
  };

  // constructs an ExerciseItem, pushes new item to items array useState,
  // logs the exercise in database, then resets form fields
  const handleSubmit = async () => {
    if (!exercise || !weight || !reps) return;
    const item: ExerciseItem = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      id: uuid(),
      exercise,
      weight: +weight,
      reps: +reps,
    };
    const itemsCopy: ExerciseItem[] = [...items];
    itemsCopy.push(item);
    setItems(itemsCopy);

    // create data for req body
    const data = {
      item,
      userEmail: 'nick@ncdev.io',
    };

    // hit api route
    await fetch('api/log-exercise', {
      method: 'POST',
      body: JSON.stringify({ ...data }),
    });

    setExercise('');
    setWeight('');
    setReps('');
  };

  // removes an ExerciseItem from the state and deletes from db
  const handleDelete = async (i: number) => {
    const itemId = items[i].id;
    const itemsCopy = [...items];
    itemsCopy.splice(i, 1);
    setItems(itemsCopy);

    await fetch(`api/delete-exercise/${itemId}`, {
      method: 'DELETE',
    });
  };

  const startEdit = (item: ExerciseItem, index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    setExercise(item.exercise);
    setWeight(item.weight.toString());
    setReps(item.reps.toString());
  };

  const confirmEdit = async () => {
    if (!exercise || !weight || !reps) return;

    const itemId = items[editIndex].id;
    const item: ExerciseItem = {
      id: itemId,
      exercise,
      weight: +weight,
      reps: +reps,
    };
    const itemsCopy = [...items];
    itemsCopy[editIndex] = item;
    setItems(itemsCopy);
    setIsEditing(false);

    const data = {
      item,
    };

    // send update to db
    await fetch('api/update-exercise', {
      method: 'PUT',
      body: JSON.stringify({ ...data }),
    });

    setExercise('');
    setWeight('');
    setReps('');
    setEditIndex(-1);
  };

  const isEditIndex = (i: number): boolean => {
    return editIndex === i;
  };

  return (
    <>
      {loggerError && <div>Something Went wrong!</div>}
      <ExerciseList
        confirmEdit={confirmEdit}
        handleDelete={handleDelete}
        isEditIndex={isEditIndex}
        isEditing
        items={items}
        startEdit={startEdit}
      />

      <LoggingForm
        confirmEdit={confirmEdit}
        exercise={exercise}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={isEditing}
        reps={reps}
        weight={weight}
      />
    </>
  );
}

export default LoggerPage;
