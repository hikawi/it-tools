import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import path from "path";
import mainRouter from "./routes/main-router";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// The application instance.
const app = express();

// Setup view engine for EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Setup routes
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", mainRouter);

// Setup public folder for static file serving.
app.use("/static", express.static(path.join(__dirname, "..", "public")));

// Start the app.
app.listen(parseInt(process.env["PORT"]!), () => {
  console.log(`Process started on ${process.env["PORT"]}`);
});
