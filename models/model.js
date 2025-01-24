const pool = require("../db/connection");
const { Author, AuthorDetail } = require("./class");

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
}

module.exports = Model;
