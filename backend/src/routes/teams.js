const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createTeam,
  listTeams,
  getTeamEmployees,
  updateTeam,
  deleteTeam,
  assignEmployeeToTeam,
  unassignEmployeeFromTeam,
} = require("../controllers/teamController");

router.post("/", authMiddleware, createTeam);
router.get("/", authMiddleware, listTeams);
router.get("/:teamId/employees", authMiddleware, getTeamEmployees);
router.put("/:id", authMiddleware, updateTeam);
router.delete("/:id", authMiddleware, deleteTeam);
router.post("/:teamId/assign", authMiddleware, assignEmployeeToTeam);
router.delete("/:teamId/unassign", authMiddleware, unassignEmployeeFromTeam);

module.exports = router;
