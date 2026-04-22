import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Facilities', href: '/admin/facilities' },
    { name: 'News & Announcements', href: '/admin/news' },
    { name: 'Photo Gallery', href: '/admin/photos' },
    { name: 'Video Gallery', href: '/admin/videos' },
    { name: 'Homepage Settings', href: '/admin/homepage' },
    { name: 'About Page', href: '/admin/about' },
    { name: 'Bank Settings', href: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-[#0A3D91] text-white p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-8">Bank CMS</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 rounded hover:bg-blue-800 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex-1 overflow-y-auto p-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
          <p className="font-bold">Notice</p>
          <p>Any changes saved here will take approximately 1-2 minutes to appear on the live website while Cloudflare rebuilds the application.</p>
        </div>
        {children}
      </div>
    </div>
  );
}
