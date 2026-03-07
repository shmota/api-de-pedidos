import connect from "../connect.js";

export async function selectOrders(id = null) {
    const client = await connect();

    let res;

    if(id == null){
      res = await client.query(
        `SELECT o.*,
        json_agg(
          json_build_object(
            'productId', i.productId,
            'quantity', i.quantity,
            'price', i.price
            )
          ) AS items
          FROM orders o
          JOIN items i 
          ON o.orderId = i.orderId
          GROUP BY o.orderId;`);
    }
    else{
      res = await client.query(
        `SELECT o.*,
        json_agg(
          json_build_object(
            'productId', i.productId,
            'quantity', i.quantity,
            'price', i.price
            )
          ) AS items
          FROM orders o
          JOIN items i 
          ON o.orderId = i.orderId
          WHERE o.orderId = '${id}'
          GROUP BY o.orderId;`);
    }

    console.log(JSON.stringify(res.rows))

    return res.rows;
}