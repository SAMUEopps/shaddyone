// app/skills/[id]/page.tsx
/*'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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

type RelatedSkill = {
  _id: string;
  name: string;
  category: string;
};

export default function SkillDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [relatedSkills, setRelatedSkills] = useState<RelatedSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await fetch(`/api/skills/${id}`);
        const data = await response.json();
        if (response.ok) {
          setSkill(data);
          setIsOwner(session?.user?._id === data.user._id);
          fetchRelatedSkills(data.category, data._id);
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

    const fetchRelatedSkills = async (category: string, currentSkillId: string) => {
      try {
        const response = await fetch(`/api/skills?category=${category}`);
        const data = await response.json();
        setRelatedSkills(data.filter((s: any) => s._id !== currentSkillId).slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch related skills', error);
      }
    };

    if (id) {
      fetchSkill();
    }
  }, [id, session, router]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        router.push('/skills');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading skill details...</div>;
  }

  if (!skill) {
    return <div className="text-center py-10">Skill not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/skills" className="text-[#bf2c7e] hover:underline">
            &larr; Back to all skills
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl md:text-3xl font-bold">{skill.name}</h1>
              {skill.pricePerHour && (
                <span className="bg-[#bf2c7e]/10 text-[#bf2c7e] px-4 py-2 rounded-full text-lg font-medium">
                  ${skill.pricePerHour}/hr
                </span>
              )}
            </div>

            <div className="flex items-center mb-6">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm mr-4">
                {skill.category}
              </span>
              <Link
                href={`/profile/${skill.user._id}`}
                className="text-gray-600 hover:text-[#bf2c7e]"
              >
                By {skill.user.name}
              </Link>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="whitespace-pre-line">{skill.description}</p>
            </div>

            {isOwner && (
              <div className="flex gap-4 mt-6">
                <Link
                  href={`/skills/${skill._id}/edit`}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Edit Skill
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
                >
                  Delete Skill
                </button>
              </div>
            )}

            {!isOwner && session && (
              <button className="bg-[#bf2c7e] text-white px-6 py-3 rounded-md hover:bg-[#0f1c47] transition-colors mt-6">
                Contact {skill.user.name.split(' ')[0]} to Hire
              </button>
            )}
          </div>
        </div>

        {relatedSkills.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Related Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedSkills.map((relatedSkill) => (
                <Link
                  key={relatedSkill._id}
                  href={`/skills/${relatedSkill._id}`}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium hover:text-[#bf2c7e]">{relatedSkill.name}</h3>
                  <span className="text-sm text-gray-600">{relatedSkill.category}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}*/

// app/skills/[id]/page.tsx
'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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

type RelatedSkill = {
  _id: string;
  name: string;
  category: string;
};

export default function SkillDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [skill, setSkill] = useState<Skill | null>(null);
  const [relatedSkills, setRelatedSkills] = useState<RelatedSkill[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await fetch(`/api/skills/${id}`);
        const data = await response.json();
        if (response.ok) {
          setSkill(data);
          setIsOwner(session?.user?._id === data.user._id);
          fetchRelatedSkills(data.category, data._id);
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

    const fetchRelatedSkills = async (category: string, currentSkillId: string) => {
      try {
        const response = await fetch(`/api/skills?category=${category}`);
        const data = await response.json();
        setRelatedSkills(data.filter((s: any) => s._id !== currentSkillId).slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch related skills', error);
      }
    };

    if (id) {
      fetchSkill();
    }
  }, [id, session, router]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        router.push('/skills');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error('You need to be logged in to contact the seller');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skillId: id,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setMessage('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to send inquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading skill details...</div>;
  }

  if (!skill) {
    return <div className="text-center py-10">Skill not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/skills" className="text-[#bf2c7e] hover:underline">
            &larr; Back to all skills
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl md:text-3xl font-bold">{skill.name}</h1>
              {skill.pricePerHour && (
                <span className="bg-[#bf2c7e]/10 text-[#bf2c7e] px-4 py-2 rounded-full text-lg font-medium">
                  ${skill.pricePerHour}/hr
                </span>
              )}
            </div>

            <div className="flex items-center mb-6">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm mr-4">
                {skill.category}
              </span>
              <Link
                href={`/profile/${skill.user._id}`}
                className="text-gray-600 hover:text-[#bf2c7e]"
              >
                By {skill.user.name}
              </Link>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="whitespace-pre-line">{skill.description}</p>
            </div>

            {isOwner && (
              <div className="flex gap-4 mt-6">
                <Link
                  href={`/skills/${skill._id}/edit`}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Edit Skill
                </Link>
                <button
                  onClick={handleDelete}
                  className="bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition-colors"
                >
                  Delete Skill
                </button>
              </div>
            )}

            {!isOwner && session && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Contact {skill.user.name.split(' ')[0]}</h3>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Hi ${skill.user.name.split(' ')[0]}, I'm interested in your "${skill.name}" skill...`}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#bf2c7e]"
                      rows={4}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#bf2c7e] text-white px-6 py-2 rounded-md hover:bg-[#0f1c47] transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {relatedSkills.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Related Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedSkills.map((relatedSkill) => (
                <Link
                  key={relatedSkill._id}
                  href={`/skills/${relatedSkill._id}`}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-medium hover:text-[#bf2c7e]">{relatedSkill.name}</h3>
                  <span className="text-sm text-gray-600">{relatedSkill.category}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}