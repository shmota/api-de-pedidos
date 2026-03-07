import connect from "../../connect.js";
import { Item } from "../../models/itemModel.js";
import { Order } from "../../models/orderModel.js";
import createItem from "../items/create.js";
import { deleteItem } from "../items/delete.js";
import selectItems from "../items/select.js";

export async function updateOrder(id, newOrder = new Order()) {

  const client = await connect();

  try{

    await client.query(`UPDATE orders
      SET
      value = ${newOrder.valorTotal},
      creationdate = '${newOrder.dataCriacao.toDateString()}'
      WHERE orderid = '${id}';`);

    let currentItems = await selectItems(id);

    if(currentItems.length > 0){

      currentItems.forEach(async item => {

        let itemModel = {
          idItem: item.productid, 
          quantidadeItem: item.quantity, 
          valorItem: item.price
        };

        const exists = newOrder.items.some(i => JSON.stringify(i) === JSON.stringify(itemModel));

        if(!exists){
          await deleteItem(item.orderid, item.productid);
        }

      });

    }

    currentItems = await selectItems(id);

    newOrder.items.forEach(async item => {

      const itemModel = new Item({...item, numeroPedido: id}).parseDbSchema();

      const exists = currentItems.some(i => JSON.stringify(i) === JSON.stringify(itemModel));
        
      if(!exists){
        await createItem(item, id);
      }

    })

    return "Pedido alterado com sucesso!"

  }
  catch(e){

    return "Não foi possível alterar o pedido, segue detalhes do erro: \n" + e;

  }

}