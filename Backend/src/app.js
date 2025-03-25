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
app.use(cookieParser())
app.use(express.json())
const cors = require("cors");
const userRouter = require("./routes/user");
const eligibleStudentsRouter = require("./routes/eligibleStudents");

app.use(cors({
  origin: ["http://localhost:5173", "https://e-voting-red.vercel.app/"], // Frontend URL
  credentials: true
}));

app.use("/api", userRouter);
app.use('/api',authRouter)
app.use('/api',adminRouter)
app.use('/api',studentRouter)
app.use('/api',voteRouter)
app.use('/api',eligibleStudentsRouter)

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

