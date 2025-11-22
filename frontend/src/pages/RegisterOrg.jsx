import React, { useState } from "react";
import api from "../services/api";

export default function RegisterOrg() {
  const [orgName, setOrgName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        organisationName: orgName,
        name: adminName,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/teams";
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-4">Register Organisation</h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label>Organisation Name:</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded mt-1"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
          />
        </div>

        <div>
          <label>Admin Name:</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded mt-1"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            className="w-full p-2 border rounded mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            required
            className="w-full p-2 border rounded mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}
