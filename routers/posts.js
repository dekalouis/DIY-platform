const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.postList);

router.get("/add", Controller.addPostForm);
router.post("/add", Controller.addPost);

//! YANG INI SKRG
router.get("/:id", Controller.postDetail);

// router.get("/:id/edit", Controller.editPostForm);

// router.post("/:id/edit", Controller.updatePost);

// router.get("/:id/delete", Controller.deletePost);

module.exports = router;
