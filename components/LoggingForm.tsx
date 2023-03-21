import { ChangeEventHandler } from 'react';
import { LoggerState } from '../utils/types';

type LoggingFormProps = {
  confirmEdit: () => Promise<void>;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  handleSubmit: () => Promise<void>;
  state: LoggerState;
};

// Component is a form that handles entering and editing ExericseItem values
function LoggingForm(props: LoggingFormProps) {
  const {
    confirmEdit,
    handleChange,
    handleSubmit,
    state: { exercise, reps, weight, isEditing },
  } = props;

  return (
    <form className='fixed bottom-0 h-[15vh] bg-[#bec8e6] pt-4 px-6'>
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
  );
}

export default LoggingForm;
