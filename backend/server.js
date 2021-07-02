const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
require("./app/routes/clinica.routes.js")(app);
require("./app/routes/login.routes.js")(app);
require("./app/routes/consulta.routes.js")(app);
require("./app/routes/funcionario.routes.js")(app);
require("./app/routes/apostilas_info.routes.js")(app);
require("./app/routes/apostilas.routes.js")(app);

// set port, listen for requests
app.listen(3050, () => {
  console.log("Server is running on port 3050.");
});