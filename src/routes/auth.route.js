const controller = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware.js");

module.exports = (app) => {
  app.post("/auth/signup", controller.signup);
  app.post("/auth/signin", controller.signin);
  app.post("/auth/signin/new_token", controller.newToken);
  app.get("/auth/info", [authMiddleware.verifyToken], controller.info);
  app.get("/auth/logout", [authMiddleware.verifyToken], controller.logout);
};