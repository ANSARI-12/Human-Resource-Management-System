import React, { useEffect, useState } from "react";
import api from "../services/api";
import EmployeeForm from "../components/EmployeeForm";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      setLoading(true);
      const res = await api.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      alert("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-3">Employees</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showForm ? "Cancel" : "Add Employee"}
      </button>

      {showForm && (
        <EmployeeForm
          onSuccess={() => {
            loadEmployees();
            setShowForm(false);
          }}
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {employees.map((emp) => (
            <li key={emp.id} className="p-3 border rounded shadow-sm bg-white">
              <strong>
                {emp.firstName} {emp.lastName}
              </strong>{" "}
              <span className="text-gray-500">({emp.email})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
