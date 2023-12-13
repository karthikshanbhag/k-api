const express = require("express");
const app = express();
const fs = require("fs");
const port = 5000;
const data = require("./data.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/data", (req, res) => res.send(data));

app.get("/data/:usn", (req, res) => {
  const usn = req.params.usn;
  const item = data.find((item) => item.usn === usn);
  res.send(item);
});

app.post("/add-data", (req, res) => {
    const item = req.body;
    data.push(item);
    fs.writeFileSync("./data.json", JSON.stringify(data));
    res.send("Data added successfully");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
