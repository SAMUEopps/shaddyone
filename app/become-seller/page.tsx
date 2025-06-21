// app/become-seller/page.tsx
/*'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function BecomeSeller() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/become-seller', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        // Update session to reflect any changes
        await update();
        router.refresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (session?.user.role === 'vendor') {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-4">You're Already a Vendor</h1>
        <p>You already have vendor privileges.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Become a Seller</h1>
      <p className="mb-6">
        Submit a request to become a seller on our platform. Once approved,
        you'll be able to list and manage your products.
      </p>
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Request'}
      </button>
    </div>
  );
}*/

// app/become-seller/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle2, Clock, BadgeCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function BecomeSeller() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/become-seller', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message, {
          icon: <CheckCircle2 className="text-green-500" />,
          style: {
            background: '#f0fdf4',
            color: '#166534',
          },
        });
        setHasSubmitted(true);
        await update();
        router.refresh();
      } else {
        toast.error(data.message, {
          icon: <AlertCircle className="text-red-500" />,
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        icon: <AlertCircle className="text-red-500" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (session?.user.role === 'vendor') {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 mt-12">
        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-green-100 rounded-full mb-4">
            <BadgeCheck className="w-12 h-12 text-green-600" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">You're Already a Verified Seller</h1>
          <p className="text-gray-600 mb-6 max-w-md">
            You currently have full vendor privileges on our platform. Start listing your products and
            growing your business today!
          </p>
          <Link
            href="/vendor/dashboard"
            className="px-6 py-3 bg-gradient-to-r from-[#bf2c7e] to-[#0f1c47] text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Go to Vendor Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (hasSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 mt-12">
        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-blue-100 rounded-full mb-4 animate-pulse">
            <Clock className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Submitted!</h1>
          <p className="text-gray-600 mb-6 max-w-md">
            Your request to become a seller is under review. Our team will process your application
            and notify you via email once a decision has been made.
          </p>
          <div className="w-full max-w-sm bg-blue-50 rounded-lg p-4 border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">What's Next?</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                <span>Application under review (24-48 hours)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                <span>Approval notification via email</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                <span>Access to vendor dashboard upon approval</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100 mt-12">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Join Our Seller Community</h1>
        <p className="text-gray-600 mb-8 text-center max-w-lg">
          Expand your business by selling on our platform. Get access to thousands of customers and
          powerful selling tools.
        </p>

        <div className="w-full max-w-md space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Seller Benefits</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-[#bf2c7e]/10 p-1 rounded-full mr-3">
                  <CheckCircle2 className="w-5 h-5 text-[#bf2c7e]" />
                </div>
                <span className="text-gray-700">Reach thousands of potential customers</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#bf2c7e]/10 p-1 rounded-full mr-3">
                  <CheckCircle2 className="w-5 h-5 text-[#bf2c7e]" />
                </div>
                <span className="text-gray-700">Powerful analytics dashboard</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#bf2c7e]/10 p-1 rounded-full mr-3">
                  <CheckCircle2 className="w-5 h-5 text-[#bf2c7e]" />
                </div>
                <span className="text-gray-700">Secure payment processing</span>
              </li>
              <li className="flex items-start">
                <div className="bg-[#bf2c7e]/10 p-1 rounded-full mr-3">
                  <CheckCircle2 className="w-5 h-5 text-[#bf2c7e]" />
                </div>
                <span className="text-gray-700">24/7 customer support</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Seller Requirements</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <div className="bg-gray-100 p-1 rounded-full mr-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-500" />
                </div>
                <span>Valid government-issued ID</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-100 p-1 rounded-full mr-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-500" />
                </div>
                <span>Bank account for payouts</span>
              </li>
              <li className="flex items-start">
                <div className="bg-gray-100 p-1 rounded-full mr-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-500" />
                </div>
                <span>Agreement to our seller terms</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-gradient-to-r from-[#bf2c7e] to-[#0f1c47] text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Submit Seller Application'
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By submitting, you agree to our{' '}
            <a href="/terms/sellers" className="text-[#bf2c7e] hover:underline">
              Seller Terms and Conditions
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}