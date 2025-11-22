const { Team, Employee, EmployeeTeam } = require("../models");

exports.createTeam = async (req, res) => {
  const team = await Team.create({
    ...req.body,
    organisationId: req.user.organisationId,
  });
  res.status(201).json(team);
};

exports.listTeams = async (req, res) => {
  const teams = await Team.findAll({
    where: { organisationId: req.user.organisationId },
  });
  res.json(teams);
};

exports.getTeamEmployees = async (req, res) => {
  const team = await Team.findByPk(req.params.teamId, {
    include: Employee,
  });
  res.json(team);
};

exports.updateTeam = async (req, res) => {
  await Team.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Team updated" });
};

exports.deleteTeam = async (req, res) => {
  await Team.destroy({ where: { id: req.params.id } });
  res.json({ message: "Team deleted" });
};

exports.assignEmployeeToTeam = async (req, res) => {
  const { employeeId } = req.body;

  await EmployeeTeam.create({
    employeeId,
    teamId: req.params.teamId,
  });

  res.json({ message: "Employee assigned" });
};

exports.unassignEmployeeFromTeam = async (req, res) => {
  const { employeeId } = req.body;

  await EmployeeTeam.destroy({
    where: { employeeId, teamId: req.params.teamId },
  });

  res.json({ message: "Employee unassigned" });
};
