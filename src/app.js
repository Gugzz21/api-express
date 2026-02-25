const express = require("express");
const path = require("path");
require("dotenv").config();
require("dotenv").config({path: path.resolve(__dirname, ".env")});

const logger = require("./middlewares/logger");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();

//Middleware que transforma a request em JSON
app.use(express.json());

// Moddleware de LOG 
app.use(logger);

app.use("/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);

// Middleware para Rotas não encontradas 
app.use(notFound);

// Middleware para Erros 
app.use(errorHandler);

module.exports = app; 