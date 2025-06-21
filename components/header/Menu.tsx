/*'use client';

import { ChevronDown, Moon, ShoppingCart, Sun } from 'lucide-react';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';

import useCartService from '@/lib/hooks/useCartStore';
import useLayoutService from '@/lib/hooks/useLayout';

import { SearchBox } from './SearchBox';

const Menu = () => {
  const { items, init } = useCartService();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useLayoutService();

  const signOutHandler = () => {
    signOut({ callbackUrl: '/signin' });
    init();
  };

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <>
      <div className='hidden md:block'>
        <SearchBox />
      </div>
      <ul className='flex gap-2'>
        <li className='flex items-center gap-2 md:gap-4'>
          <label className='swap swap-rotate'>
           
            <input
              type='checkbox'
              checked={theme === 'light'}
              onChange={toggleTheme}
            />
            <Sun className='swap-on' />
            <Moon className='swap-off' />
          </label>
          <Link
            href='/cart'
            className='relative mr-1'
            aria-label='Shopping Cart'
          >
            <ShoppingCart />
            <span className='absolute -right-4 -top-4'>
              {items.length !== 0 && (
                <div className='badge badge-primary px-1.5'>
                  {items.reduce((a, c) => a + c.qty, 0)}
                </div>
              )}
            </span>
          </Link>
        </li>
        {session && session.user ? (
          <li>
            <div className='dropdown dropdown-end dropdown-bottom'>
              <label tabIndex={0} className='btn btn-ghost rounded-btn'>
                {session.user.name}
                <ChevronDown />
              </label>
              <ul
                tabIndex={0}
                className='menu dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow '
              >
                {session.user.isAdmin && (
                  <li onClick={handleClick}>
                    <Link href='/admin/dashboard'>Admin Dashboard</Link>
                  </li>
                )}

                <li onClick={handleClick}>
                  <Link href='/order-history'>Order history </Link>
                </li>
                <li onClick={handleClick}>
                  <Link href='/profile'>Profile</Link>
                </li>
                <li onClick={handleClick}>
                  <button type='button' onClick={signOutHandler}>
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <li>
            <button
              className='btn btn-ghost rounded-btn'
              type='button'
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;
*/



/*'use client';

import { ChevronDown, Moon, ShoppingCart, Sun } from 'lucide-react';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';

import useCartService from '@/lib/hooks/useCartStore';
import useLayoutService from '@/lib/hooks/useLayout';

import { SearchBox } from './SearchBox';

const Menu = () => {
  const { items, init } = useCartService();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useLayoutService();

  const signOutHandler = () => {
    signOut({ callbackUrl: '/signin' });
    init();
  };

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <>
      <div className='hidden md:block'>
        <SearchBox />
      </div>
      <ul className='flex gap-2'>
        <li className='flex items-center gap-2 md:gap-4'>
          <label className='swap swap-rotate'>
          
            <input
              type='checkbox'
              checked={theme === 'light'}
              onChange={toggleTheme}
            />
            <Sun className='swap-on' />
            <Moon className='swap-off' />
          </label>
          <Link
            href='/cart'
            className='relative mr-1'
            aria-label='Shopping Cart'
          >
            <ShoppingCart />
            <span className='absolute -right-4 -top-4'>
              {items.length !== 0 && (
                <div className='badge badge-primary px-1.5'>
                  {items.reduce((a, c) => a + c.qty, 0)}
                </div>
              )}
            </span>
          </Link>
        </li>
        {session && session.user ? (
          <li>
            <div className='dropdown dropdown-end dropdown-bottom'>
              <label tabIndex={0} className='btn btn-ghost rounded-btn'>
                {session.user.name}
                <ChevronDown />
              </label>
              <ul
                tabIndex={0}
                className='menu dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow '
              >
                {session.user.role === 'superAdmin' && (
                  <li onClick={handleClick}>
                    <Link href='/superadmin/dashboard'>Super Admin Dashboard</Link>
                  </li>
                )}
                {session.user.role === 'vendor' && (
                  <li onClick={handleClick}>
                    <Link href={`/vendor/${session.user._id}/dashboard`}>Vendor Dashboard</Link>
                  </li>
                )}
                {session.user.role === 'vendor' && (
                  <li onClick={handleClick}>
                    <Link href={`/vendor/${session.user._id}/shop`}>My Shop</Link>
                  </li>
                )}
                <li onClick={handleClick}>
                  <Link href='/order-history'>Order history</Link>
                </li>
                <li onClick={handleClick}>
                  <Link href='/profile'>Profile</Link>
                </li>
                <li onClick={handleClick}>
                  <button type='button' onClick={signOutHandler}>
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </li>
        ) : (
          <li>
            <button
              className='btn btn-ghost rounded-btn'
              type='button'
              onClick={() => signIn()}
            >
              Sign in
            </button>
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;*/

'use client';

import {
  ChevronDown,
  Moon,
  ShoppingCart,
  Sun,
  Search,
  User,
  LayoutDashboard,
  History,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';
import { signOut, signIn, useSession } from 'next-auth/react';
import { motion } from 'framer-motion';

import useCartService from '@/lib/hooks/useCartStore';
import useLayoutService from '@/lib/hooks/useLayout';

const Menu = () => {
  const { items, init } = useCartService();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useLayoutService();

  const signOutHandler = () => {
    signOut({ callbackUrl: '/signin' });
    init();
  };

  const handleClick = () => {
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      {/* Cart */}
      <Link href="/cart" className="relative" aria-label="Shopping Cart">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {items.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-[#bf2c7e] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
          >
            {items.reduce((a, c) => a + c.qty, 0)}
          </motion.span>
        )}
      </Link>

      {/* User Menu */}
      {session && session.user ? (
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="flex items-center gap-1 cursor-pointer hover:text-[#bf2c7e] transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">{session.user.name}</span>
            <ChevronDown className="w-4 h-4" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-white rounded-box w-52 border border-gray-100 mt-2 z-50"
          >
            {session.user.role === 'superAdmin' && (
              <li onClick={handleClick}>
                <Link
                  href="/superadmin/dashboard"
                  className="flex items-center gap-2 hover:bg-[#bf2c7e]/10"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Super Admin Dashboard
                </Link>
              </li>
            )}

            {session.user.role === 'vendor' && (
              <>
                <li onClick={handleClick}>
                  <Link
                    href={`/vendor/${session.user._id}/dashboard`}
                    className="flex items-center gap-2 hover:bg-[#bf2c7e]/10"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Vendor Dashboard
                  </Link>
                </li>
                <li onClick={handleClick}>
                  <Link
                    href={`/vendor/${session.user._id}/shop`}
                    className="flex items-center gap-2 hover:bg-[#bf2c7e]/10"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    My Shop
                  </Link>
                </li>
              </>
            )}

            {/* Show "Become a Seller" only if role is 'user' */}
            {session.user.role === 'user' && (
              <li onClick={handleClick}>
                <Link
                  href="/become-seller"
                  className="flex items-center gap-2 hover:bg-[#bf2c7e]/10 text-[#bf2c7e] font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Become a Seller
                </Link>
              </li>
            )}
            <li onClick={handleClick}>
              <Link href="/skills" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
                <LayoutDashboard className="w-4 h-4" />
                Skills Marketplace
              </Link>
            </li>

            <li onClick={handleClick}>
              <Link href="/order-history" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
                <History className="w-4 h-4" />
                Order history
              </Link>
            </li>
            <li onClick={handleClick}>
              <Link href="/profile" className="flex items-center gap-2 hover:bg-[#bf2c7e]/10">
                <User className="w-4 h-4" />
                Profile
              </Link>
            </li>
            <li onClick={handleClick}>
              <button
                type="button"
                onClick={signOutHandler}
                className="flex items-center gap-2 text-red-500 hover:bg-red-50 w-full text-left px-4 py-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <button
          className="px-4 py-2 rounded-full bg-[#bf2c7e] hover:bg-[#0f1c47] text-white font-medium transition-colors"
          type="button"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      )}
    </div>
  );
};

export default Menu;
