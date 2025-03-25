require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin");
const studentRouter = require("./routes/student");
const voteRouter = require("./routes/vote");
const app = express();
const PORT = process.env.PORT;
const cors = require("cors");
const userRouter = require("./routes/user");
const eligibleStudentsRouter = require("./routes/eligibleStudents");

app.use(
  cors({
    origin: [
      "http://localhost:5173", // Vite default port
      "http://localhost:3000", // Alternative local port
      "https://e-voting-red.vercel.app", // Remove trailing slash
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);

app.use(express.json())
app.use(cookieParser())

app.use("/api", userRouter);
app.use('/api', authRouter)
app.use('/api', adminRouter)
app.use('/api', studentRouter)
app.use('/api', voteRouter)
app.use('/api', eligibleStudentsRouter)

connectDB()
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(PORT, () => {
        console.log("Server is Listening on port " + PORT);
      });
  })
  .catch((err) => {
    console.log("Database Could not be connected " + err);
  });

