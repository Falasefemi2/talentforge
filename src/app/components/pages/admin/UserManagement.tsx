import { useState } from "react";
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  Search,
  Filter,
} from "lucide-react";
import { Badge } from "../../ui/badge";
// Supabase usage disabled — credentials import commented out.
// import { projectId, publicAnonKey } from "/utils/supabase/info";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "employer" | "applicant";
  status: "active" | "suspended";
  company?: string;
  createdAt: string;
  lastLogin?: string;
}

export function UserManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | User["role"]>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | User["status"]>(
    "all",
  );

  // Mock data - in production, this would come from Supabase
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      email: "admin@talentforge.com",
      name: "System Admin",
      role: "admin",
      status: "active",
      createdAt: "2024-01-01",
      lastLogin: "2024-02-24",
    },
    {
      id: "2",
      email: "john@techcorp.com",
      name: "John Smith",
      role: "employer",
      status: "active",
      company: "TechCorp Inc.",
      createdAt: "2024-02-10",
      lastLogin: "2024-02-23",
    },
    {
      id: "3",
      email: "jane@email.com",
      name: "Jane Doe",
      role: "applicant",
      status: "active",
      createdAt: "2024-02-15",
      lastLogin: "2024-02-24",
    },
  ]);

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "applicant" as "applicant" | "employer",
  });

  const handleCreateUser = async () => {
    try {
      const fullName = `${newUser.firstName} ${newUser.lastName}`;
      // Supabase admin API disabled — fallback to demo/local creation.
      const mockUser: User = {
        id: String(users.length + 1),
        email: newUser.email,
        name: fullName,
        role: newUser.role,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, mockUser]);
      setShowCreateModal(false);
      setNewUser({ firstName: "", lastName: "", email: "", role: "applicant" });
      alert("User created successfully (Demo Mode)!");
    } catch (error) {
      console.error("Error creating user:", error);
      // For demo purposes, add locally
      const mockUser: User = {
        id: String(users.length + 1),
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        company: newUser.company,
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setUsers([...users, mockUser]);
      setShowCreateModal(false);
      setNewUser({ email: "", name: "", role: "applicant", company: "" });
      alert("User created successfully (Demo Mode)!");
    }
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
            ...user,
            status: user.status === "active" ? "suspended" : "active",
          }
          : user,
      ),
    );
  };

  const handleDeleteUser = (userId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this user? This action cannot be undone.",
      )
    ) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const getRoleBadgeColor = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return "bg-amber-100 text-amber-700 border-amber-300";
      case "employer":
        return "bg-teal-100 text-teal-700 border-teal-300";
      case "applicant":
        return "bg-emerald-100 text-emerald-700 border-emerald-300";
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    admins: users.filter((u) => u.role === "admin").length,
    employers: users.filter((u) => u.role === "employer").length,
    applicants: users.filter((u) => u.role === "applicant").length,
    active: users.filter((u) => u.status === "active").length,
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            User Management
          </h1>
          <p className="text-gray-600">Manage all users on the platform</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Create New User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-500 mb-1">Total Users</div>
          <div className="text-2xl font-semibold text-gray-900">
            {stats.total}
          </div>
        </div>
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <div className="text-sm text-amber-600 mb-1">Admins</div>
          <div className="text-2xl font-semibold text-amber-700">
            {stats.admins}
          </div>
        </div>
        <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
          <div className="text-sm text-teal-600 mb-1">Employers</div>
          <div className="text-2xl font-semibold text-teal-700">
            {stats.employers}
          </div>
        </div>
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="text-sm text-emerald-600 mb-1">Applicants</div>
          <div className="text-2xl font-semibold text-emerald-700">
            {stats.applicants}
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="text-sm text-green-600 mb-1">Active</div>
          <div className="text-2xl font-semibold text-green-700">
            {stats.active}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="employer">Employer</option>
            <option value="applicant">Applicant</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Created
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                  Last Login
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={`${getRoleBadgeColor(user.role)} border`}>
                      {user.role === "admin" && (
                        <Shield className="w-3 h-3 mr-1" />
                      )}
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.company || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      className={
                        user.status === "active"
                          ? "bg-green-100 text-green-700 border-0"
                          : "bg-red-100 text-red-700 border-0"
                      }
                    >
                      {user.status === "active" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <Ban className="w-3 h-3 mr-1" />
                      )}
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.createdAt}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.lastLogin || "Never"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditModal(true);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit user"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title={
                          user.status === "active"
                            ? "Suspend user"
                            : "Activate user"
                        }
                      >
                        <Ban
                          className={`w-4 h-4 ${user.status === "active" ? "text-orange-600" : "text-green-600"}`}
                        />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-full sm:max-w-md w-full mx-4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Create New User
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={newUser.firstName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={newUser.lastName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, lastName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="john@example.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  A temporary password will be sent to this email
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      role: e.target.value as "applicant" | "employer",
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="applicant">Applicant</option>
                  <option value="employer">Recruiter</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateUser}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                Create User
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    role: "applicant",
                  });
                }}
                className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
