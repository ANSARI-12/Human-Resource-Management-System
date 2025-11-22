import React, { useEffect, useState } from "react";
import api from "../services/api";
import TeamForm from "../components/TeamForm";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]); // Store list of all employees

  const [selectedTeamEmployees, setSelectedTeamEmployees] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [employeeToAssign, setEmployeeToAssign] = useState(""); // Selection for dropdown

  const [showForm, setShowForm] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(true);

  useEffect(() => {
    loadTeams();
    loadAllEmployees(); // Load employees on startup
  }, []);

  async function loadTeams() {
    try {
      setLoadingTeams(true);
      const response = await api.get("/teams");
      setTeams(response.data);
    } catch {
      alert("Failed to load teams");
    } finally {
      setLoadingTeams(false);
    }
  }

  async function loadAllEmployees() {
    try {
      const response = await api.get("/employees");
      setAllEmployees(response.data);
    } catch (error) {
      console.error("Failed to load employees list");
    }
  }

  async function showTeamEmployees(teamId) {
    // If clicking the same team again, collapse it
    if (selectedTeam === teamId) {
      setSelectedTeam(null);
      return;
    }

    setSelectedTeam(teamId);
    setEmployeeToAssign(""); // Reset dropdown
    await fetchTeamMembers(teamId);
  }

  async function fetchTeamMembers(teamId) {
    try {
      const res = await api.get(`/teams/${teamId}/employees`);
      // Fix we made earlier: use .Employees
      setSelectedTeamEmployees(res.data.Employees || []);
    } catch {
      alert("Failed to load team employees");
    }
  }

  async function handleAssignEmployee() {
    if (!employeeToAssign) return alert("Please select an employee first");

    try {
      await api.post(`/teams/${selectedTeam}/assign`, {
        employeeId: employeeToAssign,
      });

      // Refresh the list so the new member shows up immediately
      await fetchTeamMembers(selectedTeam);
      setEmployeeToAssign(""); // Reset dropdown
      alert("Employee assigned successfully!");
    } catch (error) {
      alert("Failed to assign employee");
    }
  }

  async function handleRemoveEmployee(employeeId) {
    if (!window.confirm("Are you sure you want to remove this member?")) return;

    try {
      // Note: We use 'data' in axios delete for the body
      await api.delete(`/teams/${selectedTeam}/unassign`, {
        data: { employeeId },
      });

      await fetchTeamMembers(selectedTeam);
    } catch (error) {
      alert("Failed to remove employee");
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-3">Teams</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showForm ? "Cancel" : "Add Team"}
      </button>

      {showForm && (
        <TeamForm
          onSuccess={() => {
            setShowForm(false);
            loadTeams();
          }}
        />
      )}

      {loadingTeams ? (
        <p>Loading teams...</p>
      ) : (
        <ul className="space-y-3">
          {teams.map((team) => (
            <li key={team.id} className="p-3 border rounded bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <strong>{team.name}</strong>
                  <p className="text-gray-500">
                    {team.description || "No description"}
                  </p>
                </div>
                <button
                  onClick={() => showTeamEmployees(team.id)}
                  className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-black"
                >
                  {selectedTeam === team.id
                    ? "Hide Members"
                    : "View / Manage Members"}
                </button>
              </div>

              {/* EXPANDED SECTION */}
              {selectedTeam === team.id && (
                <div className="mt-4 pl-4 border-l-2 border-blue-100">
                  {/* 1. LIST EXISTING MEMBERS */}
                  <h4 className="font-semibold text-sm mb-2 text-gray-600">
                    Current Members:
                  </h4>
                  {selectedTeamEmployees.length > 0 ? (
                    <ul className="list-disc pl-5 mb-4">
                      {selectedTeamEmployees.map((emp) => (
                        <li key={emp.id} className="mb-1">
                          {emp.firstName} {emp.lastName}
                          <button
                            onClick={() => handleRemoveEmployee(emp.id)}
                            className="ml-3 text-xs text-red-500 hover:underline"
                          >
                            (Remove)
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 italic mb-4">No members yet.</p>
                  )}

                  {/* 2. ASSIGN NEW MEMBER FORM */}
                  <div className="flex items-center gap-2 mt-2 p-3 bg-gray-50 rounded">
                    <select
                      className="p-2 border rounded text-sm"
                      value={employeeToAssign}
                      onChange={(e) => setEmployeeToAssign(e.target.value)}
                    >
                      <option value="">-- Select Employee to Add --</option>
                      {allEmployees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.firstName} {emp.lastName} ({emp.email})
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleAssignEmployee}
                      className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
