type NavigationProps = {
  setPage: (pageName: string) => void;
};

function Navigation(props: NavigationProps) {
  const { setPage } = props;

  return (
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
  );
}

export default Navigation;
