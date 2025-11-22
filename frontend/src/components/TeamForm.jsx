import React, { useState } from "react";
import api from "../services/api";

export default function TeamForm({ onSuccess }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/teams", { name, description });

      setName("");
      setDescription("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Failed to create team");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg shadow-sm bg-white space-y-3"
    >
      <h3 className="text-lg font-semibold">Create Team</h3>

      {error && <p className="text-red-600">{error}</p>}

      <div>
        <label className="font-medium">Team Name</label>
        <input
          required
          type="text"
          className="w-full mt-1 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter team name"
        />
      </div>

      <div>
        <label className="font-medium">Description</label>
        <textarea
          className="w-full mt-1 p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {loading ? "Saving..." : "Add Team"}
      </button>
    </form>
  );
}
