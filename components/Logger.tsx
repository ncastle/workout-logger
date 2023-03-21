import {
  ChangeEventHandler,
  useEffect,
  useReducer,
  useState,
  Reducer,
} from 'react';
import { v4 as uuid } from 'uuid';
import { ExerciseItem, LoggerAction, LoggerState } from '../utils/types';
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

const ActionTypes = {
  RESET_FORM: 'RESET_FORM',
  SET: 'SET',
  START_EDIT: 'START_EDIT',
};

function reducer(state: LoggerState, action: LoggerAction) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SET:
      return { ...state, ...payload };
    case ActionTypes.START_EDIT: {
      const { editIndex, editItem } = payload;

      return {
        ...state,
        isEditing: true,
        editIndex,
        exercise: editItem.exercise,
        reps: editItem.reps.toString(),
        weight: editItem.weight.toString(),
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

function initState() {
  return { ...initialState };
}

// TODO: I think I can pull some of the state and functionality out
// of the component and create a useReducer
function LoggerPage() {
  const [state, dispatch] = useReducer(
    reducer as Reducer<LoggerState, LoggerAction>,
    initialState,
    initState
  );

  // const [isEditing, setIsEditing] = useState(false);
  // default is -1 because indexes are going to be > 0
  // const [editIndex, setEditIndex] = useState(-1);
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      id: uuid(),
      exercise,
      weight: +weight,
      reps: +reps,
    };
    const itemsCopy: ExerciseItem[] = [...items];
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

    const itemId = items[editIndex].id;
    const item: ExerciseItem = {
      id: itemId,
      exercise,
      weight: +weight,
      reps: +reps,
    };
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
        confirmEdit={confirmEdit}
        dispatch={dispatch}
        handleDelete={handleDelete}
        isEditIndex={isEditIndex}
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

export default LoggerPage;

function isEditIndex(editIndex: number, i: number): boolean {
  return editIndex === i;
}
