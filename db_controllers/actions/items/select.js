import connect from "../../connect.js";


export default async function selectItems(id) {

  const client = await connect();

  let res;

  if(id == null){

    res = await client.query("SELECT * FROM items;");

  }
  else{
    res = await client.query(`SELECT * FROM items WHERE orderid = '${id}';`);
  }

  return res.rows;  
}