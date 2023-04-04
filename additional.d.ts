import * as IronSession from 'iron-session';

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: string;
      email: string;
      admin?: boolean;
      name?: string;
      isLoggedIn: boolean;
    };
  }
}
