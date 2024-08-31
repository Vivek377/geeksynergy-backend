const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRoute = require("./routes/user.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoute);

app.get("/", () => {
  console.log("working");
});

app.listen(process.env.PORT, async (req, res) => {
  try {
    await connection;
    console.log("connected");
  } catch (e) {
    console.log(e);
  }
});
