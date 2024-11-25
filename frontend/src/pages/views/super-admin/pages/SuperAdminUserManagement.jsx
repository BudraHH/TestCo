import React from "react";
import { Search, MoreVertical, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";

const SuperAdminUserManagement = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState("All Roles");

  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      lastActive: "2 hours ago",
      avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Instructor",
      status: "Active",
      lastActive: "5 mins ago",
      avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Student",
      status: "Inactive",
      lastActive: "1 day ago",
      avatar:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      lastActive: "2 hours ago",
      avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Instructor",
      status: "Active",
      lastActive: "5 mins ago",
      avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Student",
      status: "Inactive",
      lastActive: "1 day ago",
      avatar:
          "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  ];

  // Filter users based on search query and selected role
  const filteredUsers = users.filter(user => {
    const query = searchQuery.toLowerCase();
    const roleMatches = selectedRole === "All Roles" || user.role === selectedRole;
    const nameOrEmailMatches = user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);
    return roleMatches && nameOrEmailMatches;
  });

  return (
      <div className="p-4 rounded-lg flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center ">
          <h1 className="font-bold text-white">User Management</h1>
          <motion.button
              variants={fadeIn("center", "", 0.5, 0.25)}
              initial="hidden"
              animate="show"
              whileTap={{scale: 0.95}}
              whileHover={{scale: 1.025}}
              transition={{duration: 0.02, ease: "easeInOut"}}
              className=" flex items-center px-4 py-2 bg-palatte-secondary hover:bg-palatte-primary4 cursor-pointer text-palatte-extraLight rounded-lg"
          >
            <UserPlus className="w-4 h-4 mr-2"/>
            Add User
          </motion.button>
        </div>

        {/* Search and Filter */}
        <div className="bg-palatte-primary2 rounded-xl shadow-sm p-4 border-b border-palatte-secondary flex gap-4">
          <div className="w-full flex items-center ">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-palatte-medium hover:text-palatte-secondary w-5 h-5 cursor-pointer"/>
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full pl-12 pr-4 py-2 bg-palatte-light focus:bg-palatte-extraLight placeholder:text-palatte-secondary border rounded-lg focus:outline-none focus:ring-2 focus:ring-palatte-primary4 text-palatte-dark"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Handle input change
                />
              </div>
            </div>

            {/* Role Filter */}
            <div className="ml-4">
              <motion.select
                  variants={fadeIn("center", "", 0.5, 0.25)}
                  initial="hidden"
                  animate="show"
                  whileHover={{scale: 1.025}}
                  transition={{duration: 0.02, ease: "easeInOut"}}
                  className="px-4 py-3 bg-palatte-secondary hover:bg-palatte-primary4 text-palatte-extraLight rounded-lg text-sm focus:outline-none"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)} // Update role filter
              >
                <option>All Roles</option>
                <option>Admin</option>
                <option>Instructor</option>
                <option>Student</option>
              </motion.select>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="h-[29rem] mt-4 bg-palatte-primary2 rounded-lg shadow-lg overflow-y-auto stylish-scrollbar">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="sticky top-0 bg-palatte-secondary z-10">
            <tr className="h-16 text-palatte-extraLight">
              <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
                Status
              </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-palatte-secondary">
            {filteredUsers.map((user, index) => (
                <tr
                    key={index}
                    className="hover:bg-palatte-primary3 transition-all duration-150 ease-in-out cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <img
                          className="h-12 w-12 rounded-full border-2 border-palatte-primary4"
                          src={user.avatar}
                          alt={user.name}
                      />
                      <div>
                        <div className="text-white font-bold text-lg">{user.name}</div>
                        <div className="text-palatte-medium">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
            <span
                className=" text-palatte-extraLight text-sm font-medium">
              {user.role}
            </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
            <span
                className={`px-3 py-1 inline-flex rounded-lg ${
                    user.status === "Active"
                        ? "bg-green-500 bg-opacity-20 text-green-400"
                        : "bg-red-500 bg-opacity-20 text-red-400"
                } text-sm font-medium`}
            >
              {user.status}
            </span>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

      </div>
  );
};

export default SuperAdminUserManagement;
