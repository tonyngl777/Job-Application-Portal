const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const DB_NAME = "jobsdb";
const PORT = 4000;

const logger = require("./logger");
const userRouter = require("./routes/user");
const jobRouter = require("./routes/job");
const appRouter = require("./routes/application");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

// adding routes
app.use("/user", userRouter);
app.use("/job", jobRouter);
app.use("/application", appRouter);

// db connection
mongoose.connect("mongodb+srv://rsainarendra:7095.S%40i@cluster0.lrsuxfx.mongodb.net/jobsdb", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
const connection = mongoose.connection;
connection.once("open", function () {
    console.log("MongoDB database connection established successfully !");
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
