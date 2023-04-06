import { ChangeEvent, useState } from 'react';
import useUser from '../lib/useUser';
import clsx from 'clsx';

const center = `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`;

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [authType, setAuthType] = useState('login');

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

  const toggleAuthTypeState = () => {
    setMessage('');
    if (authType === 'login') {
      setAuthType('signup');
    } else {
      setAuthType('login');
    }
  };

  const handleSubmit = async (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const json = authType === 'login' ? await login() : await signup();

    if (json.user) {
      setEmail('');
      setTimeout(() => {
        mutateUser(json.user);
      }, 2000);
    }

    setMessage(json.message);
    setError(json.error);
    setPassword('');
  };

  const login = async (): Promise<{
    user: { id: string; email: string; name: string; isLoggedIn: boolean };
    message: string;
    error: boolean;
  }> => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    return json;
  };

  const signup = async (): Promise<{
    user: { id: string; email: string; name: string; isLoggedIn: boolean };
    message: string;
    error: boolean;
  }> => {
    // if no user found in db, create one
    const res = await fetch('/api/create/user', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    return json;
  };

  return (
    <>
      <form
        className={`${center} flex flex-col gap-4 m-auto w-4/5 items-center h-48`}
        onSubmit={handleSubmit}
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
        <button className='w-full'>{getBtnText(authType)}</button>

        {<p className={clsx(error && 'text-red-600 text-center')}>{message}</p>}
        <p
          className='text-sm text-blue-600 cursor-pointer'
          onClick={toggleAuthTypeState}
        >
          {getHelperText(authType)}
        </p>
      </form>
    </>
  );
}

function getBtnText(authType: string) {
  return authType === 'login' ? 'Login' : 'Sign Up';
}

function getHelperText(authType: string) {
  return authType === 'login' ? 'No account? Sign up here' : 'Login';
}
