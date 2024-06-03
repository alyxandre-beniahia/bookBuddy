const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

app.use(bodyParser.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/books", require("./routes/books"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
