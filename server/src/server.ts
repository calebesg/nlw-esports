import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    status: "RUNNING",
    port: "3333",
    routes: ["/"],
  });
});

app.listen(3333, () => console.log("Api is running on port: 3333"));
