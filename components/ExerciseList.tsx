import { Dispatch } from 'react';
import { LoggerAction, LoggerState } from '../utils/types';

type ExerciseListProps = {
  confirmEdit: () => Promise<void>;
  dispatch: Dispatch<LoggerAction>;
  handleDelete: (i: number) => Promise<void>;
  isEditIndex: (editIndex: number, i: number) => boolean;
  state: LoggerState;
};

function ExerciseList(props: ExerciseListProps) {
  const {
    confirmEdit,
    dispatch,
    handleDelete,
    isEditIndex,
    state: { editIndex, isEditing, items },
  } = props;

  return (
    <>
      {items.length ? (
        <ul className='overflow-scroll h-[72vh] pt-2 px-4'>
          {items.map((item, i) => (
            <li className='item rounded' key={i}>
              <div>
                <p className='text-base whitespace-pre-line'>
                  {`${item.exercise} - \n ${item.reps} reps @ ${item.weight} lbs`}
                </p>
              </div>

              {isEditing && isEditIndex(editIndex, i) ? (
                <button
                  className='rounded text-base bg-white border border-gray-500 py-px px-[6px]'
                  onClick={() => confirmEdit()}
                >
                  confirm
                </button>
              ) : (
                <button
                  className='rounded text-base bg-white border border-gray-500 py-px px-[6px]'
                  onClick={() =>
                    dispatch({
                      type: 'START_EDIT',
                      payload: { editItem: item, editIndex: i },
                    })
                  }
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
      ) : (
        <div className='w-fit m-auto'>No items to display</div>
      )}
    </>
  );
}

export default ExerciseList;
