
export class Order{

  constructor({numeroPedido = "", valorTotal=0.1, dataCriacao= new Date(), items=[]}){
    this.numeroPedido = numeroPedido;
    this.valorTotal = valorTotal;
    this.dataCriacao = new Date(dataCriacao);
    this.items = items;
  }

  isValid(){

    let erros = [];

    if(!(typeof this.numeroPedido === "string" &&
      this.numeroPedido.length > 0))
      erros.push("O numero do pedido informado não é do tipo texto");

    if(!(Number.isFinite(this.valorTotal)))
      erros.push("O valor total informado não é do tipo numerico")

    if(isNaN(this.dataCriacao.getTime()))
      erros.push("A data de criação é inválida")

    if(!Array.isArray(this.items))
      erros.push("Não foi fornecida uma lista para os itens do pedido.")

    return erros;

  }

}