module.exports = (err, req, res, next) => {
  console.error("\n🔥🔥🔥 GLOBAL ERROR HANDLER 🔥🔥🔥");
  console.error(err);
  console.error("🔥🔥🔥 END ERROR 🔥🔥🔥\n");
  res.status(500).json({ error: err.message || "Internal Server Error" });
};
