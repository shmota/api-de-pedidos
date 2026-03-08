import connect from "../../connect.js";

/**
 * @description Remove um item específico de um pedido no banco de dados
 * @param {string} orderId - ID do pedido
 * @param {string} itemId - ID do item a ser removido
 * @returns {void} Não retorna nada
 */
export async function deleteItem(orderId, itemId) {

  // Conecta ao banco de dados
  const client = await connect();

  // Deleta o item da tabela 'items' com base no pedido e no ID do item
  await client.query(
    `DELETE FROM items WHERE orderid = $1 AND productid = $2`,
    [orderId, itemId]
  );
}