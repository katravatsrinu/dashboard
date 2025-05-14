"use client";

import { useAuth } from "@/lib/auth-context"; // Your custom context
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const { user, updateUser } = useAuth(); // Access the context
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdate = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Name and Email are required.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      await updateUser({ name, email }); // Update user in context
      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      setError("❌ Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <div className="flex flex-col items-center">
          <Image
            src={user?.avatar || "/default-avatar.png"}
            width={96}
            height={96}
            alt="Avatar"
            className="rounded-full mb-4 border border-gray-300"
          />
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Profile</h1>
        </div>

        <label className="block mb-2 text-sm font-medium text-gray-600">Full Name</label>
        <input
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium text-gray-600">Email Address</label>
        <input
          className="w-full mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-indigo-500"
          placeholder="john@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          disabled={loading}
          className={`w-full py-3 rounded-md text-white font-medium transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

        {message && <p className="mt-4 text-green-600 text-center">{message}</p>}
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
}
