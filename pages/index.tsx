import { useEffect, useState } from 'react';
import Head from 'next/head';
import useUser from '../lib/useUser';
import Link from 'next/link';

const center = `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  flex flex-col gap-4 m-auto`;

export default function Landing() {
  const [email, setEmail] = useState('');
  const { user, error, isLoading, mutateUser } = useUser({
    redirectTo: '/home',
    redirectIfFound: true,
  });

  useEffect(() => {
    user?.email ? setEmail(user.email) : setEmail('');
  }, [user]);

  const login = async () => {
    const res = await fetch('/api/login');
    const json = await res.json();
    mutateUser(json);
  };

  const logout = async () => {
    const res = await fetch('/api/logout');
    const json = await res.json();
    mutateUser(json);
  };

  return (
    <main id='app'>
      <Head>
        <title>Workout App</title>
        <meta name='description' content='Workout logging application' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='w-fit mx-auto mt-8 text-3xl'>Workout Tracker</h1>
      <Link className='block w-fit mx-auto' href='/home'>
        Home
      </Link>
      <div className={`${center} w-4/5 items-center`}>
        <div className='w-fit'>
          <label className='mr-2' htmlFor='email'>
            Email:
          </label>
          <input
            type='text'
            name='email'
            id='email'
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex gap-8'>
          <button className='w-fit' type='button' onClick={login}>
            Login
          </button>
          <button className='w-fit' type='button' onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
