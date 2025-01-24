const pool = require("./connection");

async function createTables() {
  try {
    //gender not null juga
    const query = `
        DROP TABLE IF EXISTS "Authors", "Posts";

        CREATE TABLE IF NOT EXISTS "Authors" (
        	id SERIAL PRIMARY KEY,
        	"fullName" VARCHAR(120) NOT NULL,
        	gender VARCHAR(6)
        );

        CREATE TABLE IF NOT EXISTS "Posts" (
        	id SERIAL PRIMARY KEY,
        	title VARCHAR(100) NOT NULL, 
        	difficulty VARCHAR(6),
        	"estimatedTime" INTEGER, 
        	description TEXT,
        	"totalVote" INTEGER,
        	"imageUrl" VARCHAR(100),
        	"createdDate" DATE,
        	"AuthorId" INTEGER REFERENCES "Authors" (id)

        );       
        `;

    const result = await pool.query(query);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
createTables();
