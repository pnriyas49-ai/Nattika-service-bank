'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, GripVertical, ImagePlus } from 'lucide-react';

interface FacilitySection {
  title: string;
  titleMl: string;
  columns: string[];
  rows: string[][];
}

interface Subsidiary {
  title: string;
  titleMl: string;
  description: string;
  image: string;
}

interface FacilitiesData {
  heroImage: string;
  sections: FacilitySection[];
  subsidiaries: Subsidiary[];
}

export default function FacilitiesEditor({ initialData }: { initialData: FacilitiesData }) {
  const router = useRouter();
  const [data, setData] = useState<FacilitiesData>(initialData);
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
          model: 'facilities',
          type: 'singleton',
          slug: 'facilities',
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

  // ── Section helpers ──────────────────────────────────────────
  const addSection = () => {
    setData({
      ...data,
      sections: [
        ...data.sections,
        { title: 'New Section', titleMl: '', columns: ['Column 1', 'Column 2'], rows: [['', '']] },
      ],
    });
  };

  const removeSection = (idx: number) => {
    if (!confirm('Delete this entire section?')) return;
    const updated = [...data.sections];
    updated.splice(idx, 1);
    setData({ ...data, sections: updated });
  };

  const updateSectionField = (sIdx: number, field: string, value: string) => {
    const updated = [...data.sections];
    (updated[sIdx] as any)[field] = value;
    setData({ ...data, sections: updated });
  };

  // ── Column helpers ───────────────────────────────────────────
  const addColumn = (sIdx: number) => {
    const updated = [...data.sections];
    updated[sIdx].columns.push('New Column');
    updated[sIdx].rows = updated[sIdx].rows.map(row => [...row, '']);
    setData({ ...data, sections: updated });
  };

  const removeColumn = (sIdx: number, cIdx: number) => {
    const updated = [...data.sections];
    updated[sIdx].columns.splice(cIdx, 1);
    updated[sIdx].rows = updated[sIdx].rows.map(row => {
      const r = [...row];
      r.splice(cIdx, 1);
      return r;
    });
    setData({ ...data, sections: updated });
  };

  const updateColumn = (sIdx: number, cIdx: number, value: string) => {
    const updated = [...data.sections];
    updated[sIdx].columns[cIdx] = value;
    setData({ ...data, sections: updated });
  };

  // ── Row helpers ──────────────────────────────────────────────
  const addRow = (sIdx: number) => {
    const updated = [...data.sections];
    updated[sIdx].rows.push(new Array(updated[sIdx].columns.length).fill(''));
    setData({ ...data, sections: updated });
  };

  const removeRow = (sIdx: number, rIdx: number) => {
    const updated = [...data.sections];
    updated[sIdx].rows.splice(rIdx, 1);
    setData({ ...data, sections: updated });
  };

  const updateCell = (sIdx: number, rIdx: number, cIdx: number, value: string) => {
    const updated = [...data.sections];
    updated[sIdx].rows[rIdx][cIdx] = value;
    setData({ ...data, sections: updated });
  };

  // ── Subsidiary helpers ───────────────────────────────────────
  const addSubsidiary = () => {
    setData({
      ...data,
      subsidiaries: [
        ...data.subsidiaries,
        { title: '', titleMl: '', description: '', image: '' },
      ],
    });
  };

  const removeSubsidiary = (idx: number) => {
    const updated = [...data.subsidiaries];
    updated.splice(idx, 1);
    setData({ ...data, subsidiaries: updated });
  };

  const updateSubsidiary = (idx: number, field: string, value: string) => {
    const updated = [...data.subsidiaries];
    (updated[idx] as any)[field] = value;
    setData({ ...data, subsidiaries: updated });
  };

  const handleSubImage = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateSubsidiary(idx, 'image', reader.result as string);
    };
    reader.readAsDataURL(file);
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

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Manage Facilities</h1>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#047038] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-green-800 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving...' : '💾 Save All Changes'}
        </button>
      </div>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>}

      {/* Hero Image */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold mb-3">Hero Banner Image</h2>
        <div className="flex items-center space-x-4">
          {data.heroImage && (
            <img src={data.heroImage} alt="Hero" className="h-24 w-40 object-cover rounded-lg" />
          )}
          <input type="file" accept="image/*" onChange={handleHeroImage}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* ── TABLE SECTIONS ───────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Table Sections</h2>
          <button onClick={addSection} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-1" /> Add Section
          </button>
        </div>

        {data.sections.map((section, sIdx) => (
          <div key={sIdx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
            {/* Section header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Section Title (English)</label>
                  <input
                    value={section.title}
                    onChange={(e) => updateSectionField(sIdx, 'title', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Title (Malayalam)</label>
                  <input
                    value={section.titleMl}
                    onChange={(e) => updateSectionField(sIdx, 'titleMl', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2"
                  />
                </div>
              </div>
              <button onClick={() => removeSection(sIdx)} className="ml-4 text-red-500 hover:text-red-700 p-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Column headers */}
            <div className="mb-3">
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase">Column Headers</label>
              <div className="flex flex-wrap gap-2">
                {section.columns.map((col, cIdx) => (
                  <div key={cIdx} className="flex items-center bg-gray-100 rounded-lg">
                    <input
                      value={col}
                      onChange={(e) => updateColumn(sIdx, cIdx, e.target.value)}
                      className="bg-transparent px-3 py-1.5 text-sm font-semibold w-40 border-none outline-none"
                    />
                    {section.columns.length > 1 && (
                      <button onClick={() => removeColumn(sIdx, cIdx)} className="text-red-400 hover:text-red-600 pr-2">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={() => addColumn(sIdx)} className="flex items-center text-blue-600 text-sm font-semibold px-3 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100">
                  <Plus className="w-3 h-3 mr-1" /> Column
                </button>
              </div>
            </div>

            {/* Table rows */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    {section.columns.map((col, cIdx) => (
                      <th key={cIdx} className="px-3 py-2 text-left font-semibold text-gray-600 text-xs uppercase">{col}</th>
                    ))}
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="border-t border-gray-100 hover:bg-blue-50/30">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-1 py-1">
                          <input
                            value={cell}
                            onChange={(e) => updateCell(sIdx, rIdx, cIdx, e.target.value)}
                            className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:border-blue-400 outline-none"
                          />
                        </td>
                      ))}
                      <td className="px-1">
                        <button onClick={() => removeRow(sIdx, rIdx)} className="text-red-400 hover:text-red-600 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => addRow(sIdx)} className="mt-3 flex items-center text-green-700 text-sm font-semibold px-4 py-2 bg-green-50 rounded-lg hover:bg-green-100">
              <Plus className="w-4 h-4 mr-1" /> Add Row
            </button>
          </div>
        ))}
      </div>

      {/* ── SUBSIDIARY FIRMS ─────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Subsidiary Firms</h2>
          <button onClick={addSubsidiary} className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700">
            <Plus className="w-4 h-4 mr-1" /> Add Firm
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.subsidiaries.map((sub, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 relative">
              <button onClick={() => removeSubsidiary(idx)} className="absolute top-3 right-3 text-red-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Name (English)</label>
                  <input value={sub.title} onChange={(e) => updateSubsidiary(idx, 'title', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 font-semibold" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Name (Malayalam)</label>
                  <input value={sub.titleMl} onChange={(e) => updateSubsidiary(idx, 'titleMl', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Description</label>
                  <textarea value={sub.description} onChange={(e) => updateSubsidiary(idx, 'description', e.target.value)}
                    rows={2} className="w-full border border-gray-300 rounded-lg p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Image</label>
                  <div className="flex items-center space-x-3">
                    {sub.image && <img src={sub.image} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />}
                    <input type="file" accept="image/*" onChange={(e) => handleSubImage(idx, e)}
                      className="text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom save button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-[#0A3D91] text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-blue-800 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving...' : '💾 Save All Changes'}
        </button>
      </div>
    </div>
  );
}
