import { useState } from "react";
import {
  User,
  Trash2,
  ShieldCheck,
  Ban,
  Check,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";

const dummyUsers = [
  {
    id: 1,
    name: "Kishan Raj",
    email: "kishan@example.com",
    role: "admin",
    isBanned: false,
  },
  {
    id: 2,
    name: "Ayesha Verma",
    email: "ayesha@example.com",
    role: "user",
    isBanned: false,
  },
  {
    id: 3,
    name: "Ravi Kumar",
    email: "ravi@example.com",
    role: "user",
    isBanned: true,
  },
];

export default function AdminUser() {
  const [users, setUsers] = useState(dummyUsers);

  const toggleBan = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, isBanned: !user.isBanned } : user
      )
    );
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <User size={28} /> Manage Users
      </motion.h1>

      <div className="overflow-x-auto bg-white dark:bg-[#1e222a] rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800 dark:text-gray-200">
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        : "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-4 text-center">
                  {user.isBanned ? (
                    <span className="text-red-500 font-medium">Banned</span>
                  ) : (
                    <span className="text-green-500 font-medium">Active</span>
                  )}
                </td>
                <td className="p-4 text-center flex justify-center gap-3">
                  <button
                    onClick={() => toggleBan(user.id)}
                    className={`rounded-full p-1.5 text-white ${
                      user.isBanned
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    title={user.isBanned ? "Unban User" : "Ban User"}
                  >
                    {user.isBanned ? <Check size={18} /> : <Ban size={18} />}
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="rounded-full p-1.5 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-red-600 dark:text-red-400"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                  <button
                    className="rounded-full p-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
                    title="More"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
