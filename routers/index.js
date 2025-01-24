const express = require("express");
const router = express.Router();
const authors = require("./authors");
const posts = require("./posts");

router.get("/", (req, res) => {
  res.send("this is the homepage!");
});

router.get("/authors", authors);
router.get("/post", posts);

module.exports = router;
