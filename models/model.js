const pool = require("../db/connection");
const { Author, AuthorDetail, Post, PostDetail } = require("./class");

class Model {
  static async authorList() {
    let query = `
        SELECT * FROM "Authors" a;
        `;

    const result = await pool.query(query);
    const authors = result.rows.map((el) => {
      const { id, fullName, gender } = el;
      return new Author(id, fullName, gender);
    });
    // console.log(authors, "<authors sebaga instance");
    return authors;
  }

  static async authorDetails() {
    let query = `
    SELECT 
    a.id,
    a."fullName",
    a.gender,
    CAST(COUNT(p.id) AS FLOAT) AS "totalPost",
    CAST(SUM(p."totalVote") AS FLOAT) AS "totalVote",
    CAST(AVG(p."estimatedTime") AS FLOAT) AS "averageTime"
    FROM "Authors" a
    LEFT JOIN "Posts" p
    ON a.id = p."AuthorId"
    GROUP BY a.id
    ORDER BY a.id;
    `;

    const result = await pool.query(query);
    // console.log(result.rows);
    const authorDetails = result.rows.map((el) => {
      let { id, fullName, gender, totalPost, totalVote, averageTime } = el;

      //biar kehandle yg kosong2 itu hehe sekalian jg decimalnya
      function formatNum(num) {
        if (num === null) return 0;
        return num % 1 === 0 ? num : num.toFixed(1);
      }
      return new AuthorDetail(
        id,
        fullName,
        gender,
        totalPost,
        formatNum(totalVote),
        formatNum(averageTime)
      );
    });
    // console.log(authorDetails, `liat deh udh angka belom dan nullnya`);
    return authorDetails;
  }

  static async postList() {
    let query = `
        SELECT * FROM "Posts" p
        ORDER BY p."totalVote" DESC;
        `;
    const result = await pool.query(query);
    const posts = result.rows.map((el) => {
      const { id, title, difficulty, totalVote } = el;
      return new Post(id, title, difficulty, totalVote);
    });
    // console.log(posts, "<post sebaga instance");
    return posts;
  }

  static async getPostById(id) {
    const query = `
    SELECT 
      p.id, 
      p.title, 
      p.difficulty, 
      p."estimatedTime", 
      p."imageUrl", 
      p."createdDate", 
      p.description, 
      p."totalVote", 
      a."fullName" AS authorName
      FROM "Posts" p
      JOIN "Authors" a 
      ON p."AuthorId" = a.id
      WHERE p.id = $1;
  `;

    const result = await pool.query(query, [id]);
    const post = result.rows[0];
    // console.log(post);

    return new PostDetail(
      post.id,
      post.title,
      post.difficulty,
      post.totalVote,
      post.estimatedTime,
      post.description,
      post.imageUrl,
      post.createdDate,
      post.AuthorId,
      post.authorName
    );
  }

  static async addPost(
    title,
    authorId,
    difficulty,
    estimatedTime,
    imageUrl,
    createdDate,
    description
  ) {
    let query = `
    INSERT INTO "Posts" (title, "AuthorId", difficulty, "estimatedTime", "imageUrl", "createdDate", description, "totalVote")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;
    await pool.query(query, [
      title,
      authorId,
      difficulty,
      estimatedTime,
      imageUrl,
      createdDate,
      description,
      0,
    ]);
  }
}

module.exports = Model;
