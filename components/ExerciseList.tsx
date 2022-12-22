import { ExerciseItem } from '../utils/types';

type ExerciseListProps = {
  confirmEdit: () => Promise<void>;
  handleDelete: (i: number) => Promise<void>;
  isEditIndex: (i: number) => boolean;
  isEditing: boolean;
  items: ExerciseItem[];
  startEdit: (item: ExerciseItem, i: number) => void;
};

function ExerciseList(props: ExerciseListProps) {
  const {
    confirmEdit,
    handleDelete,
    isEditIndex,
    isEditing,
    items,
    startEdit,
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
      ) : (
        <div className='w-fit m-auto'>No items to display</div>
      )}
    </>
  );
}

export default ExerciseList;
