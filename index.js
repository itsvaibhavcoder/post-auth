const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
const { emailValidator } = require("./middlewares/emailValidator");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(emailValidator)
app.use("/user", userRouter);


const port = process.env.PORT;

app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
    }
    console.log("Server is running on port number", port);
});
