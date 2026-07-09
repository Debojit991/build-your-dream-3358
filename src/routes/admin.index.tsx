import { createFileRoute } from "@tanstack/react-router";
import { Building2, Users, AlertCircle, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const stats = [
    { label: "Total Active Listings", value: "1,248", icon: Building2, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Verifications", value: "42", icon: AlertCircle, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Registered Users", value: "8,930", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Verified Today", value: "15", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-4 rounded-lg ${s.bg}`}>
              <s.icon className={`h-6 w-6 ${s.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
              <p className="text-2xl font-bold text-slate-900">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
        <p className="text-slate-500 text-sm">Dashboard metrics are currently populated with placeholder data while backend connections are finalizing.</p>
        <div className="mt-6 flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 bg-slate-50">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">New property listed in Salt Lake</p>
                <p className="text-xs text-slate-500">2 minutes ago</p>
              </div>
              <button className="text-sm text-indigo-600 font-medium hover:underline">Review</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
