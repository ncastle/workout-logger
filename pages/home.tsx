import { useState } from 'react';
import LoggerPage from '../components/Logger';
import TestPage from '../components/Test';
import Navigation from '../components/Navigation';
import DaysPage from '../components/Days';
import useUser from '../lib/useUser';

// TODO: Move these to individual pages instead of switching to
// components
export default function Home() {
  const [page, setPage] = useState('logger');
  const { user } = useUser({
    redirectTo: '/',
  });

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
      <Navigation setPage={setPage} />
      {displayPage()}
    </main>
  );
}