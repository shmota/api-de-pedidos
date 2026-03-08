import connect from "../../connect.js";
import { Item } from "../../models/itemModel.js";
import { Order } from "../../models/order.js";
import createItem from "../items/create.js";
import { deleteItem } from "../items/delete.js";
import selectItems from "../items/select.js";

/**
 * @description Atualiza um pedido e seus itens associados no banco de dados
 * @param {string} id - ID do pedido a ser atualizado
 * @param {Order} newOrder - Instância do pedido com os novos dados
 * @returns {string} Mensagem de sucesso ou detalhes do erro
 */
export async function updateOrder(id, newOrder = new Order()) {

  // Conecta ao banco de dados
  const client = await connect();

  try {

    // Atualiza os dados básicos do pedido na tabela 'orders'
    await client.query(
      `UPDATE orders SET value = $1, creationdate = $2 WHERE orderid = $3`,
      [newOrder.valorTotal, newOrder.dataCriacao.toDateString(), id]
    );

    // Seleciona os itens atuais associados ao pedido
    let currentItems = await selectItems(id);

    // Se houver itens existentes, verifica quais devem ser removidos
    if (currentItems.length > 0) {

      for (let item of currentItems) {

        // Cria um objeto com os dados do item atual
        let itemModel = {
          idItem: item.productid, 
          quantidadeItem: item.quantity, 
          valorItem: item.price
        };

        // Verifica se o item ainda existe na nova lista de itens do pedido
        const exists = newOrder.items.some(i => JSON.stringify(i) === JSON.stringify(itemModel));

        // Se o item não existir mais, deleta-o
        if (!exists) {
          await deleteItem(item.orderid, item.productid);
        }
      }
    }

    // Atualiza a lista de itens atuais após exclusões
    currentItems = await selectItems(id);

    // Para cada item da nova ordem, verifica se precisa ser criado
    for (let item of newOrder.items) {

      // Converte o item para o formato do banco de dados
      const itemModel = new Item({ ...item, numeroPedido: id }).parseDbSchema();

      // Se o item não existe na lista atual, cria-o
      const exists = currentItems.some(i => JSON.stringify(i) === JSON.stringify(itemModel));
      if (!exists) {
        await createItem(item, id);
      }
    }

    // Retorna mensagem de sucesso após a atualização completa
    return "Pedido alterado com sucesso!";

  } catch (e) {

    // Retorna mensagem de erro detalhada em caso de falha
    return "Não foi possível alterar o pedido, segue detalhes do erro: \n" + e;

  }
}