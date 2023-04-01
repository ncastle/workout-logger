import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { Day } from '@prisma/client';
import { fetchDay } from '../../components/utils';

function Day() {
  const [data, setData] = useState<Day>({} as Day);
  const { query } = useRouter();
  const slug = query.slug as string;
  // const { query: { slug }} = useRouter() as string;
  console.log({ slug });
  const isoString = decodeURIComponent(slug);
  console.log({ isoString });

  useEffect(() => {
    if (slug) {
      fetchDay(slug)
        .then((day) => {
          console.log({ day });
          setData(day);
        })
        .catch((error: Error) => {
          console.error(error.message);
        });
    }
  }, [slug]);

  return (
    <>
      {data.id ? (
        <>
          {/* <h1>{data.date.getTime()}</h1> */}
          <p>The slug for this day is: {slug}</p>
          <p>isoString: {isoString}</p>
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default Day;
