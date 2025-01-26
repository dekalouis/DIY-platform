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

  //POST DETAILNYA LUPA AMPUN
  static async postDetail(req, res) {
    try {
      const { id } = req.params;
      const post = await Model.getPostById(id);
      res.render("post-details", { post });
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
        AuthorId,
        difficulty,
        estimatedTime,
        imageUrl,
        createdDate,
        description,
      } = req.body;

      await Model.addPost(
        title,
        AuthorId,
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

  static async editPostForm(req, res) {
    try {
      const { id } = req.params;
      const post = await Model.getPostById(id);
      const authors = await Model.authorList();

      //   console.log(post);
      //   console.log(post.formatCreatedDate);
      //   console.log(authors[0].id, authors[0].fullName);
      res.render("edit-post", { post, authors });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const {
        title,
        AuthorId,
        difficulty,
        estimatedTime,
        imageUrl,
        createdDate,
        description,
      } = req.body;

      await Model.updatePost(
        id,
        title,
        AuthorId,
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

  static async deletePost(req, res) {
    try {
      const { id } = req.params;

      await Model.deletePost(id);

      res.redirect("/posts");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = Controller;
