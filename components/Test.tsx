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

  const createItem = async () => {
    const response = await fetch('api/log-exercise', {
      method: 'POST',
      body: JSON.stringify({
        item: {
          id: 'test-id',
          exercise: 'test',
          reps: 1,
          weight: 1,
        },
        userEmail: 'nick@ncdev.io',
      }),
    });
    const json = (await response.json()) as ResponseData;
    console.log({ json });
  };

  const deleteItem = async () => {
    const response = await fetch('api/delete-exercise/test-id', {
      method: 'DELETE',
    });
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
      <button
        className='rounded bg-white border border-gray-500 py-px px-[6px] submit'
        onClick={createItem}
      >
        CREATEITEM
      </button>
      <button
        className='rounded bg-white border border-gray-500 py-px px-[6px] submit'
        onClick={deleteItem}
      >
        DELETEITEM
      </button>
    </main>
  );
}

export default TestPage;
