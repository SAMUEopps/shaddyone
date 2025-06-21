/*'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Form = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (session && session.user) {
      setValue('name', session.user.name!);
      setValue('email', session.user.email!);
    }
  }, [router, session, setValue]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 200) {
        toast.success('Profile updated successfully');
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            name,
            email,
          },
        };
        await update(newSession);
      } else {
        const data = await res.json();
        toast.error(data.message || 'error');
      }
    } catch (err: any) {
      const error =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error);
    }
  };

  return (
    <div className='card mx-auto my-4 max-w-sm bg-base-300'>
      <div className='card-body'>
        <h1 className='card-title'>Profile</h1>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className='my-2'>
            <label className='label' htmlFor='name'>
              Name
            </label>
            <input
              type='text'
              id='name'
              {...register('name', {
                required: 'Name is required',
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.name?.message && (
              <div className='text-error'>{errors.name.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='email'>
              Email
            </label>
            <input
              type='text'
              id='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Email is invalid',
                },
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.email?.message && (
              <div className='text-error'>{errors.email.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='password'>
              New Password
            </label>
            <input
              type='password'
              id='password'
              {...register('password', {})}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.password?.message && (
              <div className='text-error'>{errors.password.message}</div>
            )}
          </div>
          <div className='my-2'>
            <label className='label' htmlFor='confirmPassword'>
              Confirm New Password
            </label>
            <input
              type='password'
              id='confirmPassword'
              {...register('confirmPassword', {
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || 'Passwords should match!';
                },
              })}
              className='input input-bordered w-full max-w-sm'
            />
            {errors.confirmPassword?.message && (
              <div className='text-error'>{errors.confirmPassword.message}</div>
            )}
          </div>

          <div className='my-2'>
            <button
              type='submit'
              disabled={isSubmitting}
              className='btn btn-primary w-full'
            >
              {isSubmitting && (
                <span className='loading loading-spinner'></span>
              )}
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
*/

'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { User, Lock, Mail } from 'lucide-react';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const ProfileForm = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (session && session.user) {
      setValue('name', session.user.name!);
      setValue('email', session.user.email!);
    }
  }, [router, session, setValue]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { name, email, password } = form;
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 200) {
        toast.success('Profile updated successfully', {
          style: {
            background: '#f9fafb',
            color: '#059669',
            border: '1px solid #a7f3d0',
          },
          iconTheme: {
            primary: '#059669',
            secondary: '#f9fafb',
          },
        });
        const newSession = {
          ...session,
          user: {
            ...session?.user,
            name,
            email,
          },
        };
        await update(newSession);
      } else {
        const data = await res.json();
        toast.error(data.message || 'Error updating profile', {
          style: {
            background: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca',
          },
        });
      }
    } catch (err: any) {
      const error =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
      toast.error(error, {
        style: {
          background: '#fef2f2',
          color: '#dc2626',
          border: '1px solid #fecaca',
        },
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 sm:p-8 bg-white rounded-xl shadow-sm border border-gray-100 mt-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-500">Update your account information</p>
      </div>

      <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: 'Name is required',
              })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              placeholder="John Doe"
            />
          </div>
          {errors.name?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Please enter a valid email',
                },
              })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              placeholder="your@email.com"
            />
          </div>
          {errors.email?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            New Password (optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="password"
              {...register('password', {})}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
          {errors.password?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm New Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                validate: (value) => {
                  const { password } = getValues();
                  return password === value || 'Passwords do not match';
                },
              })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
              placeholder="••••••••"
            />
          </div>
          {errors.confirmPassword?.message && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </>
            ) : (
              'Update Profile'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;