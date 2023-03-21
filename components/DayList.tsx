type DayListProps = {
  days: Array<Date>;
};

function DayList(props: DayListProps) {
  const { days } = props;

  return (
    <>
      {days.length ? (
        <ul className='overflow-scroll pt-2 px-4 flex flex-col-reverse'>
          {days.map((day, i) => (
            <li className='item rounded' key={i}>
              <div>
                <p className='text-base whitespace-pre-line'>{`${day}`}</p>
              </div>
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
