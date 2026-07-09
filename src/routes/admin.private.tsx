import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Filter, MoreVertical, CheckCircle, XCircle, Eye, MapPin } from "lucide-react";

export const Route = createFileRoute("/admin/private")({
  component: PrivateListingsAdmin,
});

const MOCK_DATA = [
  { id: "P-8021", title: "Luxury 3 BHK in Salt Lake", locality: "Salt Lake", type: "Flat", bhk: "3 BHK", lister: "Sandeep R.", status: "Active", date: "2026-07-09" },
  { id: "P-8022", title: "Premium PG in New Town", locality: "New Town", type: "PG", bhk: "N/A", lister: "Meera H.", status: "Pending", date: "2026-07-08" },
  { id: "P-8024", title: "Independent House in Ballygunge", locality: "Ballygunge", type: "Independent House", bhk: "4+ BHK", lister: "Amit K.", status: "Active", date: "2026-07-06" },
  { id: "P-8025", title: "2 BHK near Metro in Garia", locality: "Garia", type: "Flat", bhk: "2 BHK", lister: "Priya C.", status: "Flagged", date: "2026-07-05" },
];

const LOCALITIES = ["All Localities", "Salt Lake", "New Town", "Rajarhat", "Ballygunge", "Park Street", "Jadavpur", "Garia", "Behala", "Bhowanipore"];

function PrivateListingsAdmin() {
  const [filterLocality, setFilterLocality] = useState("All Localities");
  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = MOCK_DATA.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
    const matchesLocality = filterLocality === "All Localities" || item.locality === filterLocality;
    const matchesStatus = filterStatus === "All" || item.status === filterStatus;
    return matchesSearch && matchesLocality && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Active</span>;
      case "Pending":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Pending</span>;
      case "Flagged":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">Flagged</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Private Listings</h2>
          <p className="text-sm text-slate-500 mt-1">Manage standard residential listings for professionals and families.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between bg-slate-50">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID or Title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-500" />
              <select
                value={filterLocality}
                onChange={(e) => setFilterLocality(e.target.value)}
                className="text-sm border border-slate-300 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white shadow-sm"
              >
                {LOCALITIES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm border border-slate-300 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white shadow-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Flagged">Flagged</option>
            </select>
          </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200 font-semibold">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Locality</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Lister</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                    No private listings found matching your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="bg-white hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700 truncate max-w-xs">{item.title}</td>
                    <td className="px-6 py-4 text-slate-600">{item.locality}</td>
                    <td className="px-6 py-4 text-slate-500">{item.type}</td>
                    <td className="px-6 py-4 text-slate-600">{item.lister}</td>
                    <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                    <td className="px-6 py-4 text-slate-500">{item.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button title="View Details" className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"><Eye className="h-4 w-4" /></button>
                        <button title="Approve" className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded"><CheckCircle className="h-4 w-4" /></button>
                        <button title="Reject" className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><XCircle className="h-4 w-4" /></button>
                        <button title="More" className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded"><MoreVertical className="h-4 w-4" /></button>
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
          <div>Showing {filtered.length} results</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-300 rounded bg-white hover:bg-slate-50 shadow-sm disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-300 rounded bg-white hover:bg-slate-50 shadow-sm disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
