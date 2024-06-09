const express = require("express");
const morgan = require("morgan");

const env = require("dotenv").config().parsed;

const app = express();

// const port = 3000;
app.use(express.json());
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

const routes = require("./router/routes");

app.use("/v1", routes);

app.listen(env.PORT, () => {
  console.log(`App listening at http://localhost:${env.PORT}`);
});
