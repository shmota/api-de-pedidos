import connect from "../../connect.js";
import { Order } from "../../models/orderModel.js";
import createItem from "../items/create.js";

export async function createOrder(order = new Order()) {
  
  const client = await connect();

  try{

    await client.query(`INSERT INTO orders VALUES ('${order.numeroPedido}', ${order.valorTotal}, '${order.dataCriacao.toDateString()}');`);

    console.log("criou")

    order.items.forEach(async item => {

      await createItem(item, order.numeroPedido);

    });

    return "ok";

  }
  catch(e){

    return "Não foi possível criar o pedido, segue detalhes do erro: \n" + e;

  }

}