import connect from "../../connect.js";

export async function getUser(username) {

  const client = await connect();

  const result = await client.query(`
    SELECT *
    FROM users
    WHERE username = '${username}'
  `);

  return result.rows[0];
}