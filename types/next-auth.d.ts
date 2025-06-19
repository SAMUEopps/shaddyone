/*import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string | null;
      isAdmin?: boolean;
    } & DefaultSession['user'];
  }

  export interface User extends DefaultUser {
    _id?: string;
    isAdmin?: boolean;
  }
}*/

import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string | null;
      role?: UserRole;
      shop?: {
        name?: string;
        location?: string;
        description?: string;
      };
    } & DefaultSession['user'];
  }

  export interface User extends DefaultUser {
    _id?: string;
    role?: UserRole;
    shop?: {
      name?: string;
      location?: string;
      description?: string;
    };
  }
}

export type UserRole = 'user' | 'vendor' | 'superAdmin';
