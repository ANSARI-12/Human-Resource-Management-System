const { Log } = require("../models");

module.exports = (action) => async (req, res, next) => {
  res.on("finish", async () => {
    if ([200, 201].includes(res.statusCode)) {
      await Log.create({
        organisationId: req.user.organisationId,
        userId: req.user.id,
        action,
        meta: { path: req.originalUrl, body: req.body },
      });
    }
  });

  next();
};
