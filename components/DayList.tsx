import Link from 'next/link';
import { DayItem } from '../utils/types';

type DayListProps = {
  days: Array<DayItem>;
};

function DayList(props: DayListProps) {
  const { days } = props;

  return (
    <>
      {days.length ? (
        <ul className='pt-2 px-4 flex flex-col-reverse'>
          {days.map((day, i) => (
            <li className='item rounded' key={i}>
              <Link
                href={`/day/${getSlug(day.date)}`}
                className='text-base whitespace-pre-line w-full'
              >{`${day.date.toLocaleString()}`}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className='w-fit m-auto'>No days to display</div>
      )}
    </>
  );
}

export default DayList;

// returns localDateString in the format: MM-DD-YYYY
// could use date-fns node package
function getSlug(date: Date) {
  return date.toLocaleDateString().replaceAll('/', '-');
}
