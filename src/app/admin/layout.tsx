"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import AdminAuthProvider from "@/components/admin/SessionProvider";
import { useState, useEffect } from "react";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dbConnected, setDbConnected] = useState<boolean | null>(null);
  const [cloudinaryConfigured, setCloudinaryConfigured] = useState<boolean | null>(null);

  const isLoginPage = pathname === "/admin/login";

  // Check MongoDB and Cloudinary connection status on dashboard mount
  useEffect(() => {
    if (isLoginPage) return;
    async function checkConnection() {
      try {
        const res = await fetch("/api/travel-items?limit=1");
        if (res.ok) {
          setDbConnected(true);
        } else {
          setDbConnected(false);
        }
      } catch (err) {
        setDbConnected(false);
      }

      try {
        const res = await fetch("/api/upload");
        if (res.ok) {
          const data = await res.json();
          setCloudinaryConfigured(data.configured);
        } else {
          setCloudinaryConfigured(false);
        }
      } catch (err) {
        setCloudinaryConfigured(false);
      }
    }
    checkConnection();
  }, [isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard Overview", href: "/admin", icon: "📊" },
    { label: "Package Categories", href: "/admin/categories", icon: "🏷️" },
    { label: "Group Departures", href: "/admin/destinations", icon: "✈️" },
    { label: "Top Locations", href: "/admin/top-locations", icon: "⭐" },
    { label: "Hero Slides", href: "/admin/hero-slides", icon: "🖼️" },
    { label: "Highlights Slider", href: "/admin/highlight-cards", icon: "💎" },
    { label: "About Section", href: "/admin/home-about", icon: "🤝" },
    { label: "Testimonials", href: "/admin/testimonials", icon: "💬" },
    { label: "FAQs", href: "/admin/faqs", icon: "❓" },
    { label: "Photo Gallery", href: "/admin/gallery", icon: "📸" },
    { label: "Inquiries (Leads)", href: "/admin/inquiries", icon: "📧" },
    { label: "Bookings", href: "/admin/bookings", icon: "🎟️" },
    { label: "Invoices", href: "/admin/invoices", icon: "🧾" },
    { label: "Itineraries", href: "/admin/itineraries", icon: "🗺️" },
    { label: "Add Travel Item", href: "/admin/travel-items/new", icon: "➕" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row text-slate-800">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 bg-slate-900 text-white shrink-0 flex-col justify-between p-6 border-r border-slate-800 select-none">
        <div>
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 pb-8 border-b border-slate-800">
            <div className="relative w-[50px] h-[50px] shrink-0 flex items-center justify-center">
              <img
                src="/website-logo.webp"
                alt="Royals Tours Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base tracking-tight text-white leading-none">
                ROYALS TOURS
              </span>
              <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider mt-1.5">
                Admin Control Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-1.5">
            {(() => {
              const isActive = (itemHref: string) => {
                if (pathname === itemHref) return true;
                if (itemHref === "/admin/destinations" && pathname.startsWith("/admin/travel-items")) return true;
                if (itemHref === "/admin/categories" && pathname.startsWith("/admin/categories")) return true;
                return false;
              };
              return navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/10"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              });
            })()}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-slate-800 flex flex-col gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-amber-400 transition-colors"
          >
            <span>View Live Website</span>
            <span>↗</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full text-left flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300 py-2 transition-colors cursor-pointer"
          >
            <span>🚪</span>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Navigation */}
      <header className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <div className="relative w-[40px] h-[40px] shrink-0 flex items-center justify-center">
            <img
              src="/website-logo.webp"
              alt="Royals Tours Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xs tracking-tight text-white leading-none">
              ROYALS TOURS
            </span>
            <span className="text-[8px] text-amber-400 font-bold uppercase tracking-wider mt-0.5">
              Admin Portal
            </span>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-slate-400 hover:text-white focus:outline-none"
        >
          <span className="text-xl">{mobileMenuOpen ? "✕" : "☰"}</span>
        </button>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-4 select-none">
          <nav className="flex flex-col gap-1.5">
            {(() => {
              const isActive = (itemHref: string) => {
                if (pathname === itemHref) return true;
                if (itemHref === "/admin/destinations" && pathname.startsWith("/admin/travel-items")) return true;
                if (itemHref === "/admin/categories" && pathname.startsWith("/admin/categories")) return true;
                return false;
              };
              return navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider ${
                      active
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              });
            })()}
          </nav>
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-[11px] font-bold uppercase tracking-wider text-slate-400 hover:text-amber-400"
            >
              Live Site ↗
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-400 hover:text-rose-300"
            >
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200 px-8 items-center justify-between select-none shrink-0">
          <h1 className="font-heading font-extrabold text-sm uppercase tracking-wider text-slate-800">
            Royals Tours Control Board
          </h1>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
            {dbConnected === null ? (
              <>
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                <span className="text-slate-500">Checking DB...</span>
              </>
            ) : dbConnected ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-600">MongoDB Connected</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-rose-600">DB Disconnected</span>
              </>
            )}
            
            <span className="text-slate-300">|</span>

            {cloudinaryConfigured === null ? (
              <>
                <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                <span className="text-slate-500">Checking CDN...</span>
              </>
            ) : cloudinaryConfigured ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-600">Cloudinary Connected</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-amber-600">Cloudinary Not Config</span>
              </>
            )}

            {session?.user?.email && (
              <>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600">User: {session.user.email}</span>
              </>
            )}
          </div>
        </header>

        {/* Dashboard Pages Root */}
        <main className="p-4 md:p-8 flex-1 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
