// app/skills/page.tsx
'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Skill = {
  _id: string;
  name: string;
  description: string;
  category: string;
  pricePerHour?: number;
  user: {
    _id: string;
    name: string;
    email: string;
  };
};

export default function SkillsPage() {
  const { data: session } = useSession();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        let url = '/api/skills';
        if (searchTerm || categoryFilter) {
          url += `?${new URLSearchParams({
            ...(searchTerm && { search: searchTerm }),
            ...(categoryFilter && { category: categoryFilter }),
          })}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        toast.error('Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, [searchTerm, categoryFilter]);

  const categories = [
    'All',
    'Design',
    'Development',
    'Marketing',
    'Writing',
    'Business',
    'Other',
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Find Talent</h1>
        {session && (
          <Link
            href="/skills/add"
            className="bg-[#bf2c7e] text-white px-6 py-2 rounded-md hover:bg-[#0f1c47] transition-colors"
          >
            Add Your Skill
          </Link>
        )}
      </div>

      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e]"
          />
        </div>
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value === 'All' ? '' : e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e]"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading skills...</div>
      ) : skills.length === 0 ? (
        <div className="text-center py-10">No skills found. Try adjusting your search.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold mb-2">
                    <Link href={`/skills/${skill._id}`} className="hover:text-[#bf2c7e]">
                      {skill.name}
                    </Link>
                  </h2>
                  {skill.pricePerHour && (
                    <span className="bg-[#bf2c7e]/10 text-[#bf2c7e] px-3 py-1 rounded-full text-sm font-medium">
                      ${skill.pricePerHour}/hr
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{skill.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs">
                    {skill.category}
                  </span>
                  <Link
                    href={`/profile/${skill.user._id}`}
                    className="text-sm text-gray-600 hover:text-[#bf2c7e]"
                  >
                    By {skill.user.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}