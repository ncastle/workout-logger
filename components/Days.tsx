import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import type { DayItem } from '../utils/types';
import DayList from './DayList';
import { fetchDays } from './utils';
import { datesAreEqual } from '../utils/tools';

function DaysPage() {
  const [days, setDays] = useState<DayItem[]>([]);

  // TODO: Why do I have to map the date to a new Date?
  // Date object gets sent to client as a string in json
  // can use superjson package to handle this
  // should also change this use effect to be a getServerSideProps call
  useEffect(() => {
    fetchDays()
      .then((data) => {
        // this is a workaround to get the date as a Date object for now
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

  // TODO: only allow one Day to be created with the same mmddyyyy value
  const createDay = async () => {
    const newDate = new Date();
    const isExistingDay = days.find((day) => datesAreEqual(newDate, day.date));

    if (isExistingDay) return;

    // create a new Day object
    const newDay: DayItem = {
      id: uuid(),
      date: newDate,
      workoutType: 'none',
    };

    const daysCopy = [...days];
    daysCopy.push(newDay);
    setDays(daysCopy);

    // TODO: change hard coded email to dynamic value
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
