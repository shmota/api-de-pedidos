import connect from "../../connect.js";
import { Item } from "../../models/itemModel.js";

/**
 * @description Cria um item associado a um pedido no banco de dados
 * @param {Object} item - Objeto contendo os dados do item (id, quantidade, valor)
 * @param {string} orderId - ID do pedido ao qual o item pertence
 * @returns {string|undefined} Mensagem de erro se falhar, undefined se sucesso
 */
export default async function createItem(item, orderId) {

  // Conecta ao banco de dados
  const client = await connect();

  // Cria uma instância do item com os dados fornecidos
  const itemMode = new Item(item);

  try {

    // Insere o item na tabela 'items' com referência ao pedido
    await client.query(
      `INSERT INTO items VALUES ($1, $2, $3, $4);`,
      [orderId, itemMode.idItem, itemMode.quantidadeItem, itemMode.valorItem]
    );

  } catch (e) {

    // Retorna mensagem detalhada de erro caso a inserção falhe
    return `Não foi possível criar todos os itens ${itemMode.idItem} do pedido, segue detalhes do erro: \n` + e;

  }
  
}