import Navigation from '../components/Navigation';
import useUser from '../lib/useUser';

export default function Home() {
  const { user } = useUser();

  return (
    <main id='app'>
      <Navigation />

      <div>
        <h1>Home Page</h1>
        <p>Welcome {user.email}</p>
      </div>
    </main>
  );
}
