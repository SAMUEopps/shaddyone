// app/skills/[id]/edit/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Skill = {
  _id: string;
  name: string;
  description: string;
  category: string;
  pricePerHour?: number;
};

export default function EditSkillPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState<Omit<Skill, '_id'>>({
    name: '',
    description: '',
    category: '',
    pricePerHour: undefined,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await fetch(`/api/skills/${id}`);
        const data = await response.json();

        if (response.ok) {
          // Check if current user owns the skill
          if (data.user._id !== session?.user?._id) {
            toast.error('You can only edit your own skills');
            router.push('/skills');
            return;
          }

          setFormData({
            name: data.name,
            description: data.description,
            category: data.category,
            pricePerHour: data.pricePerHour,
          });
        } else {
          toast.error(data.message);
          router.push('/skills');
        }
      } catch (error) {
        toast.error('Failed to fetch skill details');
      } finally {
        setLoading(false);
      }
    };

    if (id && session) {
      fetchSkill();
    }
  }, [id, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pricePerHour' ? (value === '' ? undefined : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error('You need to be logged in to edit a skill');
      return;
    }

    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Skill updated successfully!');
        router.push(`/skills/${id}`);
      } else {
        toast.error(data.message || 'Failed to update skill');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading skill details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <Link href={`/skills/${id}`} className="text-[#bf2c7e] hover:underline">
          &larr; Back to skill
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Edit Skill</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Skill Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e]"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e]"
          >
            <option value="">Select a category</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Marketing">Marketing</option>
            <option value="Writing">Writing</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e]"
          />
        </div>

        <div>
          <label htmlFor="pricePerHour" className="block text-sm font-medium text-gray-700 mb-1">
            Price Per Hour (optional)
          </label>
          <input
            type="number"
            id="pricePerHour"
            name="pricePerHour"
            value={formData.pricePerHour || ''}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#bf2c7e] text-white py-2 px-4 rounded-md hover:bg-[#0f1c47] transition-colors"
        >
          Update Skill
        </button>
      </form>
    </div>
  );
}