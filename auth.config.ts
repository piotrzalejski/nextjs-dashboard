import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isOnDasbhoard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDasbhoard) {
        if (isLoggedIn) return true;
        return false; // redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // add providers with an empty array for now
} satisfies NextAuthConfig;
