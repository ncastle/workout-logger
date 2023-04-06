import Link from 'next/link';
import useUser from '../lib/useUser';

function Navigation() {
  const { mutateUser } = useUser({
    redirectTo: '/',
  });

  const logout = async () => {
    const res = await fetch('/api/logout');
    const json = await res.json();
    mutateUser(json);
  };

  return (
    <nav className='sticky top-0 bg-[#bec8e6] pt-8 px-8 border-b-gray-600 border-b-2'>
      <ul className='flex gap-1 mb-2'>
        <li className='border-black'>
          <Link href='/home'>Home</Link>
        </li>
        <li className='border-black'>
          <Link href='/logger'>Logger</Link>
        </li>
        <li className='border-black'>
          <Link href='/days'>Days</Link>
        </li>
        <li className='border-black' onClick={logout}>
          Log Out
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
