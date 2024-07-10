const controller = require("../controllers/file.controller");
const authMiddleware = require("../middlewares/auth.middleware.js");
let upload = require('../config/multer.config.js');

module.exports = (app) => {
  app.get("/file/list", [authMiddleware.verifyToken], controller.list);
  app.get("/file/:id", [authMiddleware.verifyToken], controller.byId);
  app.post(
    "/file/upload", 
    [authMiddleware.verifyToken], 
    upload.single("file"),
    controller.upload
  );
  app.put(
    "/file/update/:id", 
    [authMiddleware.verifyToken], 
    upload.single("file"),
    controller.update
  );
  app.get("/file/download/:id", [authMiddleware.verifyToken], controller.download);
  app.delete("/file/delete/:id", [authMiddleware.verifyToken], controller.delete);
};