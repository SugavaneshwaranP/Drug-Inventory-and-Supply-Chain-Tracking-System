import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AdminSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [profile, setProfile] = useState({ name: "Admin", email: "admin@example.com" });
  const [newPassword, setNewPassword] = useState("");
  const [backupStatus, setBackupStatus] = useState("No recent backups");

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const handleBackup = () => {
    setBackupStatus("Last backup: " + new Date().toLocaleString());
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className={`min-h-screen p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      <motion.h2 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        Admin Settings
      </motion.h2>
      
      {/* Profile Settings */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
        <Link to="/admin-dashboard" className="bg-blue-500 p-2 rounded text-white">Back to Dashboard</Link>
        <input type="text" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full p-2 mb-2 border rounded-md" placeholder="Admin Name" />
        <input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="w-full p-2 mb-2 border rounded-md" placeholder="Admin Email" />
      </motion.div>
      
      {/* Password Change */}
      <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 p-6 mt-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Change Password</h3>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 mb-2 border rounded-md" placeholder="New Password" />
      </motion.div>
      
      {/* Notifications Toggle */}
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 p-6 mt-6 rounded-lg shadow-md flex justify-between">
        <span className="text-xl font-semibold">Enable Notifications</span>
        <Switch checked={notifications} onChange={setNotifications} className={`${notifications ? "bg-green-500" : "bg-gray-500"} relative inline-flex items-center h-6 rounded-full w-11`}>
          <span className="sr-only">Enable notifications</span>
          <span className={`${notifications ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full`}/>
        </Switch>
      </motion.div>
      
      {/* Dark Mode Toggle */}
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 p-6 mt-6 rounded-lg shadow-md flex justify-between">
        <span className="text-xl font-semibold">Dark Mode</span>
        <Switch checked={darkMode} onChange={setDarkMode} className={`${darkMode ? "bg-gray-700" : "bg-gray-300"} relative inline-flex items-center h-6 rounded-full w-11`}>
          <span className="sr-only">Toggle Dark Mode</span>
          <span className={`${darkMode ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full`}/>
        </Switch>
      </motion.div>
      
      {/* Database Backup */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="bg-white dark:bg-gray-800 p-6 mt-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Database Backup</h3>
        <p className="mb-2 text-gray-500">{backupStatus}</p>
        <button onClick={handleBackup} className="bg-blue-500 text-white px-4 py-2 rounded-md">Backup Now</button>
      </motion.div>
      
      {/* Save Settings Button */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="mt-6 flex justify-end">
        <button onClick={handleSave} className="bg-green-500 text-white px-6 py-2 rounded-md shadow-md">Save Settings</button>
      </motion.div>
    </motion.div>
  );
};

export default AdminSettings;
