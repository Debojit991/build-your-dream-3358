import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldAlert, ShieldCheck, FileText, Settings2, Shield } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  component: UserManagementAdmin,
});

const MOCK_DATA = [
  { id: "U-5192", name: "Arijit M.", email: "arijit.m@example.com", profession: "Salaried Professional", role: "seeker", status: "Verified", date: "2026-07-09" },
  { id: "U-5193", name: "Sneha D.", email: "sneha.d@example.com", profession: "Student", role: "seeker", status: "Pending ID", date: "2026-07-08" },
  { id: "U-5194", name: "Vikram S.", email: "vikram@example.com", profession: "Freelancer", role: "lister", status: "Verified", date: "2026-07-08" },
  { id: "U-5195", name: "Pooja K.", email: "pooja.k@example.com", profession: "Student", role: "lister", status: "Flagged", date: "2026-07-07" },
];

function UserManagementAdmin() {
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = MOCK_DATA.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === "All" || item.role === filterRole;
    const matchesStatus = filterStatus === "All" || item.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200"><ShieldCheck className="w-3 h-3 mr-1" /> Verified</span>;
      case "Pending ID":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200"><FileText className="w-3 h-3 mr-1" /> Pending ID</span>;
      case "Flagged":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200"><ShieldAlert className="w-3 h-3 mr-1" /> Flagged</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-sm text-slate-500 mt-1">Oversee accounts, verify IDs, and manage user roles.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between bg-slate-50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Name, Email, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="text-sm border border-slate-300 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white shadow-sm"
            >
              <option value="All">All Roles</option>
              <option value="seeker">Seeker</option>
              <option value="lister">Lister</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm border border-slate-300 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white shadow-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Verified">Verified</option>
              <option value="Pending ID">Pending ID</option>
              <option value="Flagged">Flagged</option>
            </select>
          </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 font-semibold">
              <tr>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Name & Email</th>
                <th className="px-6 py-4">Profession</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Verification</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    No users found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="bg-white hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-500 text-xs">{item.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{item.name}</div>
                      <div className="text-slate-500 text-xs">{item.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{item.profession}</td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-slate-600 font-medium px-2 py-1 bg-slate-100 rounded-md text-xs">{item.role}</span>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                    <td className="px-6 py-4 text-slate-500">{item.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button title="Review ID Document" className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"><FileText className="h-4 w-4" /></button>
                        <button title="Manage Role" className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded"><Shield className="h-4 w-4" /></button>
                        <button title="Account Settings" className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded"><Settings2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50">
          <div>Showing {filtered.length} users</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-300 rounded bg-white hover:bg-slate-50 shadow-sm disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-300 rounded bg-white hover:bg-slate-50 shadow-sm disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
