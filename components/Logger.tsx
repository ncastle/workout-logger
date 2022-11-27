import { ChangeEventHandler, useEffect, useState } from 'react';
import { ExerciseItem, ResponseData } from '../utils/types';

function LoggerPage() {
  const [items, setItems] = useState([] as ExerciseItem[]);
  const [exercise, setExercise] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(0);

  useEffect(() => {
    const fetchExercises = async () => {
      const options: RequestInit = {
        method: 'GET',
      };
      const reqQuery = encodeURIComponent('nick@ncdev.io');
      const response = await fetch(`/api/get-exercises/${reqQuery}`, options);
      const json = (await response.json()) as ResponseData;
      const exercises = json.data as ExerciseItem[];
      setItems(exercises);
    };
    fetchExercises().catch((error: Error) => {
      console.error(error.message);
    });
  }, []);

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

  const handleSubmit = async () => {
    if (!exercise || !weight || !reps) return;
    const item = {
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
    const response = await fetch('api/log-exercise', {
      method: 'POST',
      body: JSON.stringify({ ...data }),
    });

    const json = (await response.json()) as ResponseData;
    console.log({ json });

    setExercise('');
    setWeight('');
    setReps('');
  };

  const handleDelete = (i: number) => {
    const itemsCopy = [...items];
    itemsCopy.splice(i, 1);
    setItems(itemsCopy);
  };

  const startEdit = (item: ExerciseItem, index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    setExercise(item.exercise);
    setWeight(item.weight.toString());
    setReps(item.reps.toString());
  };

  const confirmEdit = () => {
    if (!exercise || !weight || !reps) return;
    const item = {
      exercise,
      weight: +weight,
      reps: +reps,
    };
    const itemsCopy = [...items];
    itemsCopy[editIndex] = item;
    setItems(itemsCopy);
    setIsEditing(false);
    setExercise('');
    setWeight('');
    setReps('');
  };

  const isEditIndex = (i: number) => {
    return editIndex === i;
  };

  return (
    <>
      <form>
        <div className='flex w-full gap-4'>
          <input
            className='rounded min-w-0 basis-2/4'
            name='exercise'
            onChange={handleChange}
            placeholder='Exercise'
            value={exercise}
          />
          <input
            className='rounded min-w-0 basis-1/4'
            name='weight'
            onChange={handleChange}
            placeholder='Weight'
            type='number'
            value={weight}
          />
          <input
            className='rounded min-w-0 basis-1/4'
            name='reps'
            onChange={handleChange}
            placeholder='Reps'
            type='number'
            value={reps}
          />
        </div>
        {isEditing ? (
          <button
            type='button'
            className='rounded bg-white border border-gray-500 py-px px-[6px] submit'
            onClick={confirmEdit}
          >
            Edit Exercise
          </button>
        ) : (
          <button
            type='button'
            className='rounded bg-white border border-gray-500 py-px px-[6px] submit'
            onClick={handleSubmit}
          >
            Log Exercise
          </button>
        )}
      </form>

      {!!items.length && (
        <ul>
          {items.map((item, i) => (
            <li className='item rounded' key={i}>
              <div>
                <p className='text-base whitespace-pre-line'>
                  {`${item.exercise} - \n ${item.reps} reps @ ${item.weight} lbs`}
                </p>
              </div>

              {isEditing && isEditIndex(i) ? (
                <button
                  className='rounded text-base bg-white border border-gray-500 py-px px-[6px]'
                  onClick={() => confirmEdit()}
                >
                  confirm
                </button>
              ) : (
                <button
                  className='rounded text-base bg-white border border-gray-500 py-px px-[6px]'
                  onClick={() => startEdit(item, i)}
                >
                  edit
                </button>
              )}
              <button
                className='rounded text-base bg-white border border-gray-500 py-px px-[6px]'
                onClick={() => handleDelete(i)}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default LoggerPage;
