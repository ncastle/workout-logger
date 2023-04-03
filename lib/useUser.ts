import { useEffect } from 'react';
import useSWR from 'swr';
import Router from 'next/router';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// useUser hook based off of nextjs iron-session example:
// https://github.com/vvo/iron-session/blob/main/examples/next.js-typescript/lib/useUser.ts
export default function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const {
    data: user,
    error,
    isLoading,
    mutate: mutateUser,
  } = useSWR('/api/user', fetcher);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, error, isLoading, mutateUser };
}
