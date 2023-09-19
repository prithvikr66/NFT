import express from "express";
import cors from "cors";
import passport from "passport";
import expressSession from "express-session";
import { connectDB } from "./data/database.js";
import UserRouter from "./routes/Users/user.js";
const app = express();
const port = process.env.PORT || 5000;
import {config} from "dotenv"
//Mongodb connection
connectDB();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
config();

//Routes
app.use("/api/user", UserRouter);

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
