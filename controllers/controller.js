const Model = require("../models/model");

class Controller {
  static index(req, res) {
    // res.send("homepage!!!");
    res.render("landing", {});
  }

  static async authorList(req, res) {
    try {
      const authors = await Model.authorList();
      res.render("authors", { authors });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async authorDetails(req, res) {
    try {
      const authorDetails = await Model.authorDetails();
      res.render("author-detail", { authorDetails });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async postList(req, res) {
    try {
      const posts = await Model.postList();
      res.render("posts", { posts });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async addPostForm(req, res) {
    try {
      const authors = await Model.authorList();
      res.render("add-post", { authors });
      //   console.log(authors);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async addPost(req, res) {
    // console.log(req.body);
    try {
      const {
        title,
        authorId,
        difficulty,
        estimatedTime,
        imageUrl,
        createdDate,
        description,
      } = req.body;

      await Model.addPost(
        title,
        authorId,
        difficulty,
        estimatedTime,
        imageUrl,
        createdDate,
        description
      );
      res.redirect("/posts");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Controller;
