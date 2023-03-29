import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DayItem } from '../utils/types';
import DayList from './DayList';
import { fetchDays } from './utils';

function DaysPage() {
  const [days, setDays] = useState<DayItem[]>([]);

  useEffect(() => {
    fetchDays()
      .then((data) => {
        const dayItems: DayItem[] = data.map((day): DayItem => {
          return {
            ...day,
            date: new Date(day.date),
          };
        });
        setDays(dayItems);
      })
      .catch((error: Error) => {
        console.error(error.message);
      });
  }, []);

  const createDay = async () => {
    const newDate = new Date();

    // create a new Day object
    const newDay: DayItem = {
      id: uuid(),
      date: newDate,
      workoutType: 'none',
    };

    const daysCopy = [...days];
    daysCopy.push(newDay);
    setDays(daysCopy);

    const data = {
      dayItem: newDay,
      userEmail: 'nick@ncdev.io',
    };

    await fetch('/api/create/day', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      <p>Days page</p>
      <button
        type='button'
        className='rounded bg-white border border-gray-500 py-px px-[6px] submit'
        onClick={createDay}
      >
        Create new log day
      </button>
      <DayList days={days} />
    </>
  );
}

export default DaysPage;
