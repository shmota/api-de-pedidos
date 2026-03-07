import connect from "../../connect.js";

export async function deleteItem(orderId, itemId) {

  const client = await connect();

  await client.query(`DELETE FROM items WHERE orderid = '${orderId}' AND productid = '${itemId}'`);
    
}