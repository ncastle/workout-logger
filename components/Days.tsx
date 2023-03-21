import { useState } from 'react';
import DayList from './DayList';

function DaysPage() {
  const [days, setDays] = useState<Date[]>([]);

  function createDay() {
    console.log('creating day', Date());
    const newDate = new Date();
    const daysCopy = [...days];
    daysCopy.push(newDate);
    setDays(daysCopy);
  }

  return (
    <div>
      <p>Days page</p>
      <button
        type='button'
        className='rounded bg-white border border-gray-500 py-px px-[6px] submit'
        onClick={createDay}
      >
        Create new log day
      </button>
      <DayList days={days} />
    </div>
  );
}

export default DaysPage;
