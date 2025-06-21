// app/profile/[id]/page.tsx
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type UserProfile = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type Skill = {
  _id: string;
  name: string;
  description: string;
  category: string;
  pricePerHour?: number;
};

export default function UserProfilePage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Fetch user details
        const userResponse = await fetch(`/api/users/${id}`);
        const userData = await userResponse.json();
        
        if (userResponse.ok) {
          setUser(userData);
          setIsCurrentUser(session?.user?._id === id);
        } else {
          toast.error(userData.message);
        }

        // Fetch user skills
        const skillsResponse = await fetch(`/api/skills?userId=${id}`);
        const skillsData = await skillsResponse.json();
        setSkills(skillsData);
      } catch (error) {
        toast.error('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserProfile();
    }
  }, [id, session]);

  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center py-10">User not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-3xl font-bold text-gray-500">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
                <span className="inline-block mt-2 bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {user.role}
                </span>
              </div>
            </div>

            {isCurrentUser && (
              <div className="mb-8">
                <Link
                  href="/skills/add"
                  className="bg-[#bf2c7e] text-white px-6 py-2 rounded-md hover:bg-[#0f1c47] transition-colors inline-block"
                >
                  Add New Skill
                </Link>
              </div>
            )}

            <h2 className="text-xl font-bold mb-6">
              {isCurrentUser ? 'My Skills' : `${user.name.split(' ')[0]}'s Skills`}
            </h2>

            {skills.length === 0 ? (
              <p className="text-gray-500">
                {isCurrentUser ? 'You haven' : 'This user hasn'}t added any skills yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill._id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <Link href={`/skills/${skill._id}`}>
                      <h3 className="font-medium text-lg hover:text-[#bf2c7e]">
                        {skill.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {skill.description}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                        {skill.category}
                      </span>
                      {skill.pricePerHour && (
                        <span className="text-sm font-medium">
                          ${skill.pricePerHour}/hr
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}