import connect from "../../connect.js";

/**
 * @description Seleciona itens de pedidos no banco de dados. Pode retornar todos ou apenas os de um pedido específico.
 * @param {string|null} id - ID do pedido (opcional). Se não fornecido, retorna todos os itens.
 * @returns {Array} Lista de itens encontrados
 */
export default async function selectItems(id) {

  // Conecta ao banco de dados
  const client = await connect();

  let res;

  // Se nenhum ID for fornecido, seleciona todos os itens
  if (id == null) {
    res = await client.query("SELECT * FROM items;");
  } 
  // Caso um ID seja fornecido, seleciona apenas os itens daquele pedido
  else {
    res = await client.query(
      `SELECT * FROM items WHERE orderid = $1;`, [id]
    );
  }

  // Retorna os itens encontrados
  return res.rows;  
}