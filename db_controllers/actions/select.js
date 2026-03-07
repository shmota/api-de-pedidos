import connect from "../connect.js";

export async function selectOrders(id = null) {
    const client = await connect();

    let res;

    if(id == null){
      res = await client.query('SELECT * FROM orders');
    }
    else{
      res = await client.query(`SELECT * FROM orders WHERE orderid = '${id}'`);
    }

    console.log(JSON.stringify(res.rows))

    return res.rows;
}