import { useState } from 'react';
import Head from 'next/head';
import LoggerPage from '../components/Logger';
import TestPage from '../components/Test';

export default function Home() {
  const [page, setPage] = useState('logger');

  const displayPage = () => {
    switch (page) {
      case 'logger':
        return <LoggerPage />;
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
      <nav className='sticky top-0 h-[13vh] bg-[#bec8e6] pt-8 px-8 border-b-gray-600 border-b-2'>
        <ul className='flex gap-1 mb-2'>
          <li className='border-black' onClick={() => setPage('logger')}>
            Logger
          </li>
          <li className='border-black' onClick={() => setPage('test')}>
            Test
          </li>
        </ul>
      </nav>
      {displayPage()}
    </main>
  );
}
