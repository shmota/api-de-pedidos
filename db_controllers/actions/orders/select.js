import connect from "../../connect.js";

export async function selectOrders(id = null) {
  const client = await connect();

  let res;

  if (id == null) {
    res = await client.query(
      `SELECT o.*,
        COALESCE(
          json_agg(
            json_build_object(
              'productId', i.productId,
              'quantity', i.quantity,
              'price', i.price
            )
          ) FILTER (WHERE i.productId IS NOT NULL),
          '[]'
        ) AS items
        FROM orders o
        LEFT JOIN items i
          ON i.orderId = o.orderId
        GROUP BY o.orderId;`);
  }
  else {
    res = await client.query(
      `SELECT o.*,
        COALESCE(
          json_agg(
            json_build_object(
              'productId', i.productId,
              'quantity', i.quantity,
              'price', i.price
            )
          ) FILTER (WHERE i.productId IS NOT NULL),
          '[]'
        ) AS items
        FROM orders o
        LEFT JOIN items i
          ON i.orderId = o.orderId
        WHERE o.orderId = '${id}'
        GROUP BY o.orderId;`);
  }

  console.log(JSON.stringify(res.rows))

  return res.rows;
}