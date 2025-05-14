"use client";

import { useAuth } from "@/lib/auth-context"; // Same context
import { useState } from "react";

export default function SettingsPage() {
  const { user, updateSettings } = useAuth(); // Assume `settings` in user
  const [darkMode, setDarkMode] = useState(user?.settings?.darkMode || false);
  const [notifications, setNotifications] = useState(user?.settings?.notifications || false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    try {
      await updateSettings({ darkMode, notifications });
      setMessage("Settings updated successfully!");
    } catch (error) {
      setMessage("Update failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Settings</h1>

        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700">Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="h-5 w-5"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-700">Email Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="h-5 w-5"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Save Settings
        </button>

        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}
