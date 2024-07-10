require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const http = require('http');
const server = http.createServer(app);
app.use(cors());
app.use(bodyParser.json());

const db = require("./models/index");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Hello!" });
});

const PORT = process.env.PORT || 8010;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require("./routes/auth.route")(app);
require("./routes/file.route")(app);