import connect from "../connect.js";
import { Item } from "../models/itemModel.js";
import { Order } from "../models/orderModel.js";

export async function createOrder(order = new Order()) {
  
  const client = await connect();

  try{

    await client.query(`INSERT INTO orders VALUES ('${order.numeroPedido}', ${order.valorTotal}, '${order.dataCriacao.toDateString()}');`);

    console.log("criou")

    order.items.forEach(async item => {

      console.log(item)

      const itemMode = new Item(item);

      await client.query(`INSERT INTO items VALUES ('${order.numeroPedido}', '${itemMode.idItem}', ${itemMode.quantidadeItem}, ${itemMode.valorItem});`)
    });

    return "ok";

  }
  catch(e){

    if(e.code == "23505")
      return "Não foi possível criar um pedido com esse numero.";

    else
      return "Não foi possível criar o pedido, segue detalhes do erro: \n" + e;


  }

}