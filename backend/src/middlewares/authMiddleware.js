const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;

    // Handle legacy tokens with orgId instead of organisationId
    if (!req.user.organisationId && req.user.orgId) {
      req.user.organisationId = req.user.orgId;
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
