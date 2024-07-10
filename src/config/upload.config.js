const path = require("path");
const rootPath = __dirname;
const location = path.parse(rootPath).dir;

module.exports = {
  rootPath,
  uploadPath: path.join(location, '../public/'),
};