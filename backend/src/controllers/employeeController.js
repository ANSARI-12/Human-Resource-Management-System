const { Employee } = require("../models");

exports.listEmployees = async (req, res) => {
  const employees = await Employee.findAll({
    where: { organisationId: req.user.organisationId },
  });
  res.json(employees);
};

exports.createEmployee = async (req, res) => {
  const employee = await Employee.create({
    ...req.body,
    organisationId: req.user.organisationId,
  });
  res.status(201).json(employee);
};

exports.getEmployee = async (req, res) => {
  const employee = await Employee.findOne({
    where: { id: req.params.id, organisationId: req.user.organisationId },
  });
  res.json(employee);
};

exports.updateEmployee = async (req, res) => {
  await Employee.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Updated successfully" });
};

exports.deleteEmployee = async (req, res) => {
  await Employee.destroy({ where: { id: req.params.id } });
  res.json({ message: "Deleted successfully" });
};
