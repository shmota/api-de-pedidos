import connect from "../../connect.js";
import { deleteItem } from "../items/delete.js";
import selectItems from "../items/select.js";

/**
 * @description Remove um pedido e seus itens associados do banco de dados
 * @param {string} id - ID do pedido a ser deletado
 * @returns {string} Mensagem de sucesso ou detalhes do erro
 */
export async function deleteOrder(id) {

  // Conecta ao banco de dados
  const client = await connect();

  try {

    // Só tenta deletar se um ID válido for fornecido
    if (id != null) {

      // Seleciona todos os itens associados ao pedido
      let currentItems = await selectItems(id);

      // Se existirem itens, deleta cada um deles
      if (currentItems.length > 0) {
        for (const item of currentItems) {
          await deleteItem(id, item.productid);
        }
      }

      // Atualiza a lista de itens para garantir que foram removidos
      currentItems = await selectItems(id);

      // Deleta o pedido da tabela 'orders'
      await client.query(
        `DELETE FROM orders WHERE orderid = $1;`,
        [id]
      );

      // Retorna mensagem de sucesso
      return "Pedido excluído com sucesso!";
    }

    throw new ErrorEvent("O id informado é inválido");

  } catch (e) {

    // Retorna mensagem de erro detalhada caso algo falhe
    return "Não foi possível excluir o pedido, segue detalhes do erro: \n" + e;

  }
}