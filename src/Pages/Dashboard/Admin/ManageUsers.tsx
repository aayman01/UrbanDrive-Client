import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ClipLoader, SyncLoader } from "react-spinners";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { VerifiedShieldSVG } from "../../../Components/Common/SVG/FeatureBadges";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface RoleOption {
  role: string;
}

const ManageUsers = () => {
  const axiosPublic = useAxiosPublic();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const {
    refetch,
    data: users = [],
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/user");
      return res.data;
    },
  });

  const options: RoleOption[] = [
    { role: "Admin" },
    { role: "Host" },
    { role: "User" },
  ];

  const handleChange = (role: string, id: string) => {
    setUpdatingId(id);
    axiosPublic.patch(`/users/admin/${id}`, { role }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
      setUpdatingId(null);
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <SyncLoader color="#0D9488" size={14} />
      </div>
    );
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Host":
        return "bg-teal-50 text-teal-700 border-teal-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-8 font-poppins">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 mb-2">
          <VerifiedShieldSVG className="w-3.5 h-3.5 text-teal-600" />
          <span>Access & Permissions</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Manage Users
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review accounts, update administrative privileges, and assign host permissions
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Registered Accounts</h2>
            <p className="text-xs text-slate-500 mt-0.5">Total of {users.length} registered profiles</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
                <th className="py-3.5 px-6 w-12">#</th>
                <th className="py-3.5 px-6">User Details</th>
                <th className="py-3.5 px-6">Email Address</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6 text-right">Assign Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {users.map((item, idx) => (
                <tr key={item._id} className="hover:bg-teal-50/30 transition-colors">
                  <td className="py-4 px-6 text-xs text-slate-400 font-semibold">{idx + 1}</td>
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-teal-700 font-bold flex items-center justify-center text-xs">
                        {item.name ? item.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <span>{item.name || "Unnamed User"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600 text-xs font-medium">
                    {item.email}
                  </td>
                  <td className="py-4 px-6">
                    {updatingId === item._id ? (
                      <ClipLoader color="#0D9488" size={16} />
                    ) : (
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold border ${getRoleBadge(
                          item.role
                        )}`}
                      >
                        {item.role}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <select
                      className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
                      defaultValue={item.role}
                      onChange={(e) => handleChange(e.target.value, item._id)}
                    >
                      {options.map((opt, oIdx) => (
                        <option key={oIdx} value={opt.role}>
                          {opt.role}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
