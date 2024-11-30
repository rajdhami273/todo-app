const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectMongo } = require("./mongo");

// middlewares
const authMiddleware = require("./api/middlewares/auth.middleware");

// routes
const authRoutes = require("./api/auth/auth.routes");
const userRoutes = require("./api/users/user.routes");
const todoRoutes = require("./api/todos/todo.routes");

// Middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Connect mongo
connectMongo()
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.log);

// Routes registeration
app.use("/auth", authRoutes); // they do not require authentication
app.use("/user", authMiddleware, userRoutes);
app.use("/todo", authMiddleware, todoRoutes); // these routes require authentication

// Server invoke
app.listen(3001, (err) => {
  if (err) console.log("Server error:", err);
  else console.log("Success!");
});
