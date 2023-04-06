import {
  ChangeEventHandler,
  useEffect,
  useReducer,
  useState,
  Reducer,
} from 'react';
import { v4 as uuid } from 'uuid';
import { ActionTypes } from '../utils/types';
import type {
  ExerciseItem,
  LoggerAction,
  LoggerPayload,
  LoggerState,
} from '../utils/types';
import ExerciseList from './ExerciseList';
import LoggingForm from './LoggingForm';
import { fetchExercises } from './utils';

const initialState: LoggerState = {
  editIndex: -1,
  exercise: '',
  isEditing: false,
  items: [],
  reps: '',
  weight: '',
};

function reducer(state: LoggerState, action: LoggerAction) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET:
      return { ...state, ...payload };
    case ActionTypes.START_EDIT: {
      const { editIndex, editItem } = payload as LoggerPayload;

      return {
        ...state,
        isEditing: true,
        editIndex,
        exercise: editItem?.exercise,
        reps: editItem?.reps.toString(),
        weight: editItem?.weight.toString(),
      };
    }
    case ActionTypes.RESET_FORM:
      return {
        ...state,
        exercise: '',
        reps: '',
        weight: '',
        isEditing: false,
        editIndex: -1,
      };
    default:
      throw new Error('Unknown action type');
  }
}

function Logger() {
  const [state, dispatch] = useReducer(
    reducer as Reducer<LoggerState, LoggerAction>,
    initialState
  );

  const [loggerError, setLoggerError] = useState('');

  // fetches the exercises from the mysql database on load/refresh
  useEffect(() => {
    fetchExercises()
      .then((exercises) => {
        dispatch({ type: ActionTypes.SET, payload: { items: exercises } });
      })
      .catch((error: Error) => {
        console.error('Error fetching exercises: ', error);
        setLoggerError(error.message);
      });
  }, []);

  // ChangeEventHandler function for the logger form
  const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const { name, value } = evt.target;
    dispatch({ type: ActionTypes.SET, payload: { [name]: value } });
  };

  // constructs an ExerciseItem, pushes new item to items array useState,
  // logs the exercise in database, then resets form fields
  const handleSubmit = async () => {
    const { exercise, weight, reps, items } = state;
    if (!exercise || !weight || !reps) return;

    const item: ExerciseItem = {
      id: uuid(),
      exercise,
      weight: +weight,
      reps: +reps,
    };
    const itemsCopy = [...items];
    itemsCopy.push(item);
    dispatch({ type: ActionTypes.SET, payload: { items: itemsCopy } });

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

    dispatch({ type: ActionTypes.RESET_FORM });
  };

  // removes an ExerciseItem from the state and deletes from db
  const handleDelete = async (i: number) => {
    const { items } = state;
    const itemId = items[i].id;
    const itemsCopy = [...items];
    itemsCopy.splice(i, 1);
    dispatch({ type: ActionTypes.SET, payload: { items: itemsCopy } });

    await fetch(`api/delete-exercise/${itemId}`, {
      method: 'DELETE',
    });
  };

  const confirmEdit = async () => {
    const { exercise, weight, reps, items, editIndex } = state;
    if (!exercise || !weight || !reps) return;

    // get id of item that is being edited
    const itemId = items[editIndex].id;

    // create a new ExerciseItem using updated values from state
    const item: ExerciseItem = {
      id: itemId,
      exercise,
      weight: +weight,
      reps: +reps,
    };
    // update the items array with the new item value
    const itemsCopy = [...items];
    itemsCopy[editIndex] = item;
    dispatch({ type: ActionTypes.SET, payload: { items: itemsCopy } });

    const data = {
      item,
    };

    // send update to db
    await fetch('api/update-exercise', {
      method: 'PUT',
      body: JSON.stringify({ ...data }),
    });

    dispatch({ type: ActionTypes.RESET_FORM });
  };

  return (
    <>
      {loggerError && <div>Something Went wrong!</div>}
      <ExerciseList
        dispatch={dispatch}
        handleDelete={handleDelete}
        state={state}
      />

      <LoggingForm
        confirmEdit={confirmEdit}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        state={state}
      />
    </>
  );
}

export default Logger;
