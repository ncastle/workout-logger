export const ironConfig = {
  cookieName: process.env.IRON_SESSION_COOKIE_NAME as string,
  password: process.env.IRON_SESSION_PASSWORD as string,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
