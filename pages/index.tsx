import { useState } from 'react';
import Head from 'next/head';
import LoggerPage from '../components/Logger';
import TestPage from '../components/Test';
import Navigation from '../components/Navigation';
import DaysPage from '../components/Days';

export default function Home() {
  const [page, setPage] = useState('logger');

  const displayPage = () => {
    switch (page) {
      case 'logger':
        return <LoggerPage />;
      case 'days':
        return <DaysPage />;
      case 'test':
        return <TestPage />;
      default:
        return <LoggerPage />;
    }
  };

  return (
    <main id='app'>
      <Head>
        <title>Workout App</title>
        <meta name='description' content='Workout logging application' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navigation setPage={setPage} />
      {displayPage()}
    </main>
  );
}
