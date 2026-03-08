import connect from "../../connect.js";

/**
 * @description Seleciona pedidos do banco de dados. Pode retornar todos ou apenas um por ID.
 * @param {string|null} id - ID do pedido (opcional). Se não fornecido, retorna todos os pedidos.
 * @returns {Array} Lista de pedidos, cada um com seus itens associados em formato JSON
 */
export async function selectOrders(id = null) {

  // Conecta ao banco de dados
  const client = await connect();

  let res;

  // Se nenhum ID for fornecido, seleciona todos os pedidos
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
        GROUP BY o.orderId;`
    );
  } 
  // Caso um ID seja fornecido, seleciona apenas o pedido correspondente
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
        WHERE o.orderId = $1
        GROUP BY o.orderId;`, [id]
    );
  }

  // Retorna os pedidos encontrados
  return res.rows;
}