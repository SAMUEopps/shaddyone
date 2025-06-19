/*import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';

const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping/,
        /\/payment/,
        /\/place-order/,
        /\/profile/,
        /\/order\/(.*)/,
        /\/admin/,
      ];
      const { pathname } = request.nextUrl;
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth;
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [*/
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    /*'/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
*/

import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';

const authConfig = {
  providers: [],
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping/,
        /\/payment/,
        /\/place-order/,
        /\/profile/,
        /\/order\/(.*)/,
        /\/admin/,
      ];
      const { pathname } = request.nextUrl;
      if (protectedPaths.some((p) => p.test(pathname))) {
        if (!auth) return false;
        const { user } = auth;
        if (user.role === 'superAdmin') return true;
        if (user.role === 'vendor' && pathname.startsWith('/admin')) return false;
        return true;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;

export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};