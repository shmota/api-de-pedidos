
export class Item {

  constructor({numeroPedido = "", idItem="", quantidadeItem=0, valorItem=0}) {
    this.numeroPedido = numeroPedido;
    this.idItem = idItem;
    this.quantidadeItem = quantidadeItem;
    this.valorItem = valorItem;
  }

  parseDbSchema(){

    return {
      orderid: this.numeroPedido,
      productid: this.idItem,
      quantity: this.quantidadeItem,
      price: this.valorItem
    }
  }

}