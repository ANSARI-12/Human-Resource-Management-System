import React, { useState } from "react";
import api from "../services/api";

export default function EmployeeForm({ onSuccess }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/employees", { firstName, lastName, email });

      // Reset
      setFirstName("");
      setLastName("");
      setEmail("");

      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg shadow-sm bg-white space-y-3"
    >
      <h3 className="text-lg font-semibold">Add Employee</h3>

      {error && <p className="text-red-600">{error}</p>}

      <input
        required
        className="w-full p-2 border rounded"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        required
        className="w-full p-2 border rounded"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type="email"
        required
        className="w-full p-2 border rounded"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Add Employee"}
      </button>
    </form>
  );
}
