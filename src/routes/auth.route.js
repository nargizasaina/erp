const controller = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware.js");

module.exports = (app) => {
  app.post("/signup", controller.signup);
  app.post("/signin", controller.signin);
  app.post("/signin/new_token", controller.newToken);
  app.get("/info", [authMiddleware.verifyToken], controller.info);
  app.get("/logout", [authMiddleware.verifyToken], controller.logout);
};