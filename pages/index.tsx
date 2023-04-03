import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const center = `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  flex flex-col gap-4 m-auto`;

export default function Landing() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const login = async () => {
    console.log('login using email: ', email);
    router.push('/home').catch(console.error);
  };

  const logout = async () => {
    console.log('logout');
  };

  return (
    <main id='app'>
      <Head>
        <title>Workout App</title>
        <meta name='description' content='Workout logging application' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1 className='w-fit mx-auto mt-8 text-3xl'>Workout Tracker</h1>
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
