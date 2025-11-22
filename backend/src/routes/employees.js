const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  listEmployees,
  createEmployee,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.get("/", authMiddleware, listEmployees);
router.post("/", authMiddleware, createEmployee);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, updateEmployee);
router.delete("/:id", authMiddleware, deleteEmployee);

module.exports = router;
