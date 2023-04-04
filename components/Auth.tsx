import { ChangeEvent, useState } from 'react';
import useUser from '../lib/useUser';
import clsx from 'clsx';

const center = `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`;

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const { mutateUser } = useUser();

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (message) setMessage('');
    if (error) setError(false);
    const { name, value } = evt.target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  // TODO: separate login and signup, currently, a typo in a login name
  // will just cause a new user to be created
  const login = async (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();

    if (json.user) {
      setEmail('');
      setMessage('Successfully logged in!');
    } else if (json.message === 'Wrong password') {
      setMessage('You entered the wrong password, try again!');
      setError(true);
    } else {
      // if no user found in db, create one
      await fetch('/api/create/user', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      setMessage(`User created using email: ${email}`);
      setEmail('');
    }
    setPassword('');
    setTimeout(() => {
      mutateUser(json);
    }, 2000);
  };

  return (
    <>
      <form
        className={`${center} flex flex-col gap-4 m-auto w-4/5 items-center h-48`}
        onSubmit={login}
      >
        <div className='w-full flex'>
          <label className='mr-2' htmlFor='email'>
            Email:
          </label>
          <input
            className='self-end w-full'
            type='text'
            name='email'
            id='email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='w-full flex'>
          <label className='mr-2' htmlFor='password'>
            Password:
          </label>
          <input
            className='self-end w-full'
            type='text'
            name='password'
            id='password'
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button className='w-full'>Login</button>

        {<p className={clsx(error && 'text-red-600 text-center')}>{message}</p>}
      </form>
    </>
  );
}
