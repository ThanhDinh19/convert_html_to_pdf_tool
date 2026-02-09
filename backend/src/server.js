const express = require("express");
const cors = require("cors");
const routes = require("../src/routes/routes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api", routes);

app.listen(4000, () => {
  console.log("🚀 Backend running at http://localhost:4000");
});
