import connect from "../../connect.js";
import { Item } from "../../models/itemModel.js";


export default async function createItem(item, orderId) {

  const client = await connect();

  const itemMode = new Item(item);

  try{
    
    await client.query(`INSERT INTO items VALUES ('${orderId}', '${itemMode.idItem}', ${itemMode.quantidadeItem}, ${itemMode.valorItem});`)

  }
  catch(e){

    return `Não foi possível criar todos os item ${itemMode.idItem} do pedido, segue detalhes do erro: \n` + e;

  }
  
}