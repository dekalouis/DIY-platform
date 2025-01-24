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
}

module.exports = Controller;
