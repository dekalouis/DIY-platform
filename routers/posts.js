const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.postList);

router.get("/add", Controller.addPostForm);
//kerjain ini dulu ya

router.post("/add", Controller.addPost);

// router.get("/:id", Controller.postDetail);

// router.get("/:id/edit", Controller.editPostForm);

// router.post("/:id/edit", Controller.updatePost);

// router.get("/:id/delete", Controller.deletePost);

module.exports = router;
