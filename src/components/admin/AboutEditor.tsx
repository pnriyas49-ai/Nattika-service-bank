'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';

interface TeamMember {
  name: string;
  nameMl?: string;
  post: string;
  postMl?: string;
  image: string;
  number: string;
}

interface AboutData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  history: string;
  mission: string;
  vision: string;
  stats?: {
    deposits: string;
    loans: string;
    capital: string;
    members: string;
  };
  team: TeamMember[];
}

export default function AboutEditor({ initialData }: { initialData: any }) {
  const router = useRouter();
  
  // Ensure defaults exist
  const [data, setData] = useState<AboutData>({
    heroTitle: initialData?.heroTitle || '',
    heroSubtitle: initialData?.heroSubtitle || '',
    heroImage: initialData?.heroImage || '',
    history: initialData?.history || '',
    mission: initialData?.mission || '',
    vision: initialData?.vision || '',
    stats: initialData?.stats || { deposits: '', loans: '', capital: '', members: '' },
    team: initialData?.team || [],
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Save handler ─────────────────────────────────────────────
  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          model: 'about',
          type: 'singleton',
          slug: 'about',
          data,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to save');
      alert('Saved successfully! Changes pushed to GitHub. Cloudflare will rebuild in 1-2 minutes.');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Field Updater ───────────────────────────────────────────
  const updateField = (field: keyof AboutData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleHeroImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setData({ ...data, heroImage: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  // ── Team Helpers ───────────────────────────────────────────
  const addTeamMember = () => {
    setData({
      ...data,
      team: [
        ...data.team,
        { name: '', post: '', image: '', number: '' },
      ],
    });
  };

  const removeTeamMember = (idx: number) => {
    if (!confirm('Remove this team member?')) return;
    const updated = [...data.team];
    updated.splice(idx, 1);
    setData({ ...data, team: updated });
  };

  const updateTeamMember = (idx: number, field: keyof TeamMember, value: string) => {
    const updated = [...data.team];
    updated[idx] = { ...updated[idx], [field]: value };
    setData({ ...data, team: updated });
  };

  const handleTeamImage = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateTeamMember(idx, 'image', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage About Us</h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#047038] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-green-800 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving...' : '💾 Save All Changes'}
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}

      {/* Hero Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Hero Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Hero Title</label>
              <input value={data.heroTitle} onChange={(e) => updateField('heroTitle', e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
           </div>
           <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Hero Subtitle</label>
              <input value={data.heroSubtitle} onChange={(e) => updateField('heroSubtitle', e.target.value)} className="w-full border border-gray-300 rounded-lg p-2" />
           </div>
           <div className="col-span-full">
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Hero Background Image</label>
              <div className="flex items-center space-x-4">
                 {data.heroImage && <img src={data.heroImage} alt="Hero" className="h-24 w-40 object-cover rounded-lg" />}
                 <input type="file" accept="image/*" onChange={handleHeroImage} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              </div>
           </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Content</h2>
        <div className="space-y-4">
           <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">History (Story)</label>
              <textarea value={data.history} onChange={(e) => updateField('history', e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg p-2" />
           </div>
           <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Mission</label>
              <textarea value={data.mission} onChange={(e) => updateField('mission', e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg p-2" />
           </div>
           <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Vision</label>
              <textarea value={data.vision} onChange={(e) => updateField('vision', e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg p-2" />
           </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h2 className="text-xl font-bold">Team Members</h2>
          <button onClick={addTeamMember} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-1" /> Add Member
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.team.map((member, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-200 relative">
              <button onClick={() => removeTeamMember(idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600 bg-white rounded-full p-1 shadow-sm">
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="space-y-3 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Photo</label>
                  <div className="flex items-center space-x-3">
                    {member.image ? (
                      <img src={member.image} alt="Preview" className="h-16 w-16 object-cover rounded-full border-2 border-white shadow" />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs text-center border-2 border-white shadow">No Image</div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleTeamImage(idx, e)}
                      className="text-xs text-gray-500 w-full" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Name</label>
                  <input value={member.name} onChange={(e) => updateTeamMember(idx, 'name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 font-semibold text-sm" placeholder="John Doe" />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Post / Role</label>
                  <input value={member.post} onChange={(e) => updateTeamMember(idx, 'post', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm" placeholder="President / Manager" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Phone Number</label>
                  <input value={member.number} onChange={(e) => updateTeamMember(idx, 'number', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm" placeholder="+91 98765 43210" />
                </div>
              </div>
            </div>
          ))}
          {data.team.length === 0 && (
             <div className="col-span-full text-center text-gray-400 py-8 italic border-2 border-dashed border-gray-200 rounded-xl">
                No team members added yet. Click "Add Member" to start.
             </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button onClick={handleSave} disabled={loading} className="bg-[#0A3D91] text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-blue-800 disabled:opacity-50 transition-colors">
          {loading ? 'Saving...' : '💾 Save All Changes'}
        </button>
      </div>
    </div>
  );
}
