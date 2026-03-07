import connect from "../../connect.js";
import { deleteItem } from "../items/delete.js";
import selectItems from "../items/select.js";

export async function deleteOrder(id = null) {

  const client = await connect();

  try {

    if (id != null) {

      const currentItems = await selectItems(id);

      if(currentItems.length > 0 ){
        currentItems.forEach(async item => {
          await deleteItem(id, item.productid);
        });
      }

      await client.query(`DELETE
      FROM orders
      WHERE orderid = '${id}';`);

      return "Pedido exlcuido com sucesso!"
    }
    
  } catch (e) {
    
    return "Não foi possível excluir o pedido, segue detalhes do erro: \n" + e;

  }

}