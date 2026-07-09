import { createFileRoute, Outlet, useNavigate, Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Logo } from "@/components/Logo";
import { LayoutDashboard, Users, Home, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().role === "admin") {
            setIsAdmin(true);
          } else {
            nav({ to: "/" });
          }
        } catch (error) {
          console.error("Error verifying admin role:", error);
          nav({ to: "/" });
        }
      } else {
        nav({ to: "/" });
      }
      setLoading(false);
    });
    return () => unsub();
  }, [nav]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium text-sm">Verifying Access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect via useEffect
  }

  const currentPath = location.pathname;

  const SIDEBAR_ITEMS = [
    { label: "Overview", to: "/admin", icon: LayoutDashboard },
    { label: "Student Listings", to: "/admin/students", icon: GraduationCap },
    { label: "Private Listings", to: "/admin/private", icon: Home },
    { label: "User Management", to: "/admin/users", icon: Users },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Logo size="sm" />
          <span className="ml-3 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 tracking-wider">
            ADMIN
          </span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = currentPath === item.to || (item.to !== "/admin" && currentPath.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-100"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-200">
          <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
            Exit Admin Panel
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm">
          <h1 className="font-semibold text-lg text-slate-800">
            {SIDEBAR_ITEMS.find((i) => i.to === currentPath)?.label || "Admin Dashboard"}
          </h1>
        </header>
        <div className="flex-1 overflow-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
