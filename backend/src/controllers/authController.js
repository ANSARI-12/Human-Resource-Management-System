const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Organisation } = require("../models");
const config = require("../../config");

exports.register = async (req, res) => {
  try {
    const { email, password, name, organisationName } = req.body;

    if (!organisationName || organisationName.trim() === "") {
      return res.status(400).json({ message: "Organisation name is required" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const organisation = await Organisation.create({ name: organisationName });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      passwordHash,
      organisationId: organisation.id,
    });

    res.status(201).json({ message: "Registered successfully", user });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, orgId: user.organisationId },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
