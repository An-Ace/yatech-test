import express from "express"
import cookieParser from "cookie-parser"

import cors from "cors"
import morgan from "morgan"

import { router } from "./router"

const path = require('path');
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan("short"))
app.use(cookieParser());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/logic', function(req, res) {
  res.sendFile(path.join(__dirname, './logic.html'));
});

app.get('/auth', function(req, res) {
  res.sendFile(path.join(__dirname, './auth.html'));
});

app.use("/api", router)

app.listen(3333, () => console.log("Server started on port 3333"))

export { app }
