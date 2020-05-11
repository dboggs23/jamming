const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");

let call = require("./routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/app", call);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`server started on ${port}`));
