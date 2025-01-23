const pool = require("./connection");
const fs = require("fs");

async function seedTables() {
  try {
    let authors = JSON.parse(fs.readFileSync("./data/authors.json", "utf-8"));
    authors = authors
      .map((el) => {
        return `('${el.fullName}','${el.gender}')`;
      })
      .join(",\n");
    // console.log(authors);

    let posts = JSON.parse(fs.readFileSync("./data/posts.json", "utf-8"));
    posts = posts
      .map((el) => {
        return `('${el.title}','${el.difficulty}','${el.estimatedTime}','${el.description}','${el.totalVote}','${el.imageUrl}','${el.createdDate}','${el.AuthorId}')`;
      })
      .join(",\n");
    // console.log(posts);

    const query = `
      INSERT INTO "Authors" ("fullName", gender)
      VALUES ${authors};

      INSERT INTO "Posts" (title, difficulty, "estimatedTime", description, "totalVote", "imageUrl", "createdDate", "AuthorId")
      VALUES ${posts};
      `;

    const result = await pool.query(query);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
seedTables();
