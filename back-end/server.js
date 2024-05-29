const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
app.use(cors());

connectDB();

app.use(bodyParser.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/books", require("./routes/books"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
