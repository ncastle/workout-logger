import { useEffect, useState } from 'react';
import Head from 'next/head';
import useUser from '../lib/useUser';
import Link from 'next/link';
import Auth from '../components/Auth';

export default function Landing() {
  const { user, error, isLoading, mutateUser } = useUser({
    redirectTo: '/home',
    redirectIfFound: true,
  });

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
      <Auth />
    </main>
  );
}
