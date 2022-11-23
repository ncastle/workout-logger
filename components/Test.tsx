import { ResponseData } from '../pages/api/users';

export type UserData = {
  name: string;
  email: string;
};

function TestPage() {
  const createUser = async (): Promise<void> => {
    const data: UserData = {
      name: 'Timmothy',
      email: 'tim@ncdev.io',
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

  return (
    <main>
      <button onClick={createUser}>Test Create</button>
      <button onClick={getUsers}>Test Get</button>
    </main>
  );
}

export default TestPage;
