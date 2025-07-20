import { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  UserCog,
  ToggleRight,
  ToggleLeft,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export default function AdminSettings() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [requireEmailVerification, setRequireEmailVerification] = useState(true);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.h2
        className="text-3xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Settings className="w-6 h-6" /> Admin Settings
      </motion.h2>

      {/* Site Info */}
      <motion.div
        className="bg-white dark:bg-[#1e222a] rounded-2xl shadow p-5 mb-6 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          🏷️ Site Information
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Name: <span className="font-medium text-gray-700 dark:text-gray-200">Blogify</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Version: <span className="font-medium text-gray-700 dark:text-gray-200">v1.2.0</span>
        </p>
      </motion.div>

      {/* User Management */}
      <motion.div
        className="bg-white dark:bg-[#1e222a] rounded-2xl shadow p-5 mb-6 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-semibold flex items-center gap-1 text-gray-800 dark:text-white mb-2">
          <UserCog size={20} /> User Management
        </h3>
        <ToggleRow
          label="Allow New User Registration"
          value={allowRegistration}
          onChange={setAllowRegistration}
        />
        <ToggleRow
          label="Require Email Verification"
          value={requireEmailVerification}
          onChange={setRequireEmailVerification}
        />
      </motion.div>

      {/* Feature Flags */}
      <motion.div
        className="bg-white dark:bg-[#1e222a] rounded-2xl shadow p-5 mb-6 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-semibold flex items-center gap-1 text-gray-800 dark:text-white mb-2">
          <ShieldCheck size={20} /> Feature Toggles
        </h3>
        <ToggleRow label="Enable Premium Blogs" value={true} disabled />
        <ToggleRow label="Enable AI Editor" value={false} disabled />
      </motion.div>

      {/* Maintenance */}
      <motion.div
        className="bg-white dark:bg-[#1e222a] rounded-2xl shadow p-5 border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-semibold flex items-center gap-1 text-gray-800 dark:text-white mb-2">
          <Wrench size={20} /> Maintenance
        </h3>
        <ToggleRow
          label="Enable Maintenance Mode"
          value={maintenanceMode}
          onChange={setMaintenanceMode}
        />
      </motion.div>
    </div>
  );
}

function ToggleRow({ label, value, onChange = () => {}, disabled = false }) {
  return (
    <div className="flex justify-between items-center py-3">
      <p className="text-sm text-gray-700 dark:text-gray-300">{label}</p>
      <button
        onClick={() => !disabled && onChange(!value)}
        className={`p-1 rounded-full transition-all ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
        }`}
      >
        {value ? (
          <ToggleRight className="text-green-500 w-6 h-6" />
        ) : (
          <ToggleLeft className="text-gray-400 dark:text-gray-600 w-6 h-6" />
        )}
      </button>
    </div>
  );
}
