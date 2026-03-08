import connect from "../../connect.js";
import { Order } from "../../models/order.js";
import createItem from "../items/create.js";

/**
 * @description Cria um pedido no banco de dados
 * @param {Order} order - Instância de pedido contendo dados e itens
 * @returns {string} "ok" se criado com sucesso ou mensagem de erro detalhada
 */
export async function createOrder(order = new Order()) {

  // Conecta ao banco de dados
  const client = await connect();

  try {
    // Insere os dados do pedido na tabela 'orders'
    await client.query(
      `INSERT INTO orders VALUES ($1, $2, $3);`,
      [order.numeroPedido, order.valorTotal, order.dataCriacao.toDateString()]
    );

    // Para cada item do pedido, chama a função de criação de item
    for (const item of order.items) {
      await createItem(item, order.numeroPedido);
    }

    // Retorna "ok" se tudo ocorreu bem
    return "ok";

  } catch (e) {

    // Retorna mensagem de erro detalhada caso algo falhe
    return "Não foi possível criar o pedido, segue detalhes do erro: \n" + e;
  }
}