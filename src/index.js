import express from "express";
import Allroutes from "./routes/index.js";

const app = express();
const port = 3000;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Kambing!");
});

app.use(Allroutes);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
