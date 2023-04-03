import useUser from '../lib/useUser';
type NavigationProps = {
  setPage: (pageName: string) => void;
};

function Navigation(props: NavigationProps) {
  const { setPage } = props;

  const { mutateUser } = useUser();

  const logout = async () => {
    const res = await fetch('/api/logout');
    const json = await res.json();
    mutateUser(json);
  };

  return (
    <nav className='sticky top-0 bg-[#bec8e6] pt-8 px-8 border-b-gray-600 border-b-2'>
      <ul className='flex gap-1 mb-2'>
        <li onClick={logout}>Logout</li>
      </ul>
      <ul className='flex gap-1 mb-2'>
        <li className='border-black' onClick={() => setPage('logger')}>
          Logger
        </li>
        <li className='border-black' onClick={() => setPage('days')}>
          Days
        </li>
        <li className='border-black' onClick={() => setPage('test')}>
          Test
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
