const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.postList);

router.get("/add", Controller.addPostForm);
router.post("/add", Controller.addPost);

router.get("/:id", Controller.postDetail);
router.get("/:id/edit", Controller.editPostForm);
router.post("/:id/edit", Controller.updatePost);

//!YOK BISA YOK
router.get("/:id/delete", Controller.deletePost);

//! PART DUA NAMBAHIN VOTE
router.get("/:id/vote", Controller.incrementVote);

module.exports = router;
