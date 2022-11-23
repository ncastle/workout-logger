import { ChangeEventHandler, useState } from 'react';

function LoggerPage() {
  const [items, setItems] = useState([] as string[]);
  const [exercise, setExercise] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editIndex, setEditIndex] = useState(0);

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
    if (name === 'editValue') {
      setEditValue(value);
    }
  };

  const handleSubmit = () => {
    if (!exercise) return;
    const itemsCopy: string[] = [...items];
    const itemString = `${exercise} - \n ${reps} reps @ ${weight} lbs`;
    itemsCopy.push(itemString);
    setItems(itemsCopy);
    setExercise('');
    setWeight('');
    setReps('');
  };

  const handleDelete = (i: number) => {
    const itemsCopy = [...items];
    itemsCopy.splice(i, 1);
    setItems(itemsCopy);
  };

  const startEdit = (item: string, index: number) => {
    setIsEditing(true);
    setEditIndex(index);
    setEditValue(item);
  };

  const confirmEdit = (i: number) => {
    const itemsCopy = [...items];
    itemsCopy[i] = editValue;
    setItems(itemsCopy);
    setIsEditing(false);
    setEditValue('');
  };

  const isEditIndex = (i: number) => {
    return editIndex === i;
  };

  console.log(items);
  return (
    <>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          handleSubmit();
        }}
      >
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
        <button id='submit' className='rounded' onClick={handleSubmit}>
          Log Exercise
        </button>
      </form>

      {!!items.length && (
        <ul>
          {items.map((item, i) => (
            <li className='item rounded' key={i}>
              {isEditing && isEditIndex(i) ? (
                <input
                  className='rounded'
                  name='editValue'
                  value={editValue}
                  onChange={handleChange}
                />
              ) : (
                <div>
                  <p className='text-base whitespace-pre-line'>{item}</p>
                </div>
              )}

              {isEditing && isEditIndex(i) ? (
                <button
                  className='rounded text-base'
                  onClick={() => confirmEdit(i)}
                >
                  confirm
                </button>
              ) : (
                <button
                  className='rounded text-base'
                  onClick={() => startEdit(item, i)}
                >
                  edit
                </button>
              )}
              <button
                className='rounded text-base'
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
