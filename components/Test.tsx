import { ResponseData } from '../utils/types';

export type UserData = {
  name: string;
  email: string;
};

function TestPage() {
  const createUser = async (): Promise<void> => {
    const data: UserData = {
      name: 'Nick',
      email: 'nick@ncdev.io',
    };
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify(data),
    };
    const response = await fetch('api/users', options);
    const json = (await response.json()) as ResponseData;
    console.log({ json });
  };

  const getUsers = async (): Promise<void> => {
    const options: RequestInit = {
      method: 'GET',
    };
    const response = await fetch('api/users', options);
    const json = (await response.json()) as ResponseData;
    console.log({ json });
  };

  const find = async (): Promise<void> => {
    const options: RequestInit = {
      method: 'GET',
    };
    const reqQuery = encodeURIComponent('nick@ncdev.io');
    const response = await fetch(`api/get-exercises/${reqQuery}`, options);
    const json = (await response.json()) as ResponseData;
    console.log({ json });
  };

  return (
    <main>
      <button
        className='rounded bg-white border border-gray-500 py-px px-[6px] submit'
        onClick={createUser}
      >
        Test Create
      </button>
      <button
        className='rounded bg-white border border-gray-500 py-px px-[6px] submit'
        onClick={getUsers}
      >
        Test Get
      </button>
      <button
        className='rounded bg-white border border-gray-500 py-px px-[6px] submit'
        onClick={find}
      >
        Test Find
      </button>
    </main>
  );
}

export default TestPage;
