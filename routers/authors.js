const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("authorpage dalam bentuk tabel!");
});

router.get("/detail", (req, res) => {
  res.send("author dengan informasi yang di dapat dr post!");
});

module.exports = router;
