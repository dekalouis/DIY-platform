const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("menampilkan data post dalam tabel!");
});

router.get("/add", (req, res) => {
  res.send("form penambahan post!");
});
//need to router.post add

//get post/:id

//get post/:id/edit

//post post/:id/edit

//get post/:id/delete

//get post/:id/vote

module.exports = router;
