import { Order } from "../../database/models/order.js";
import { createOrder } from "../../database/actions/orders/create.js";
import { selectOrders } from "../../database/actions/orders/select.js";
import { updateOrder } from "../../database/actions/orders/update.js";
import { deleteOrder } from "../../database/actions/orders/delete.js";

/**
 * @description Criação de um novo pedido
 * @param {JSON} req - Objeto contendo os dados do pedido no corpo da requisição
 * 
 * Retornos:
 * - Se os dados forem inválidos: retorna status 400 com os erros
 * - Se ocorrer um erro durante a criação: retorna status 500 com a mensagem de erro
 * - Se criado com sucesso: retorna status 201 com mensagem de sucesso
 */
export async function create(req, res) {

  // Cria uma instância de pedido com os dados enviados
  const order = new Order(req.body);

  // Valida os dados do pedido
  const errors = order.isValid();

  // Se houver erros de validação, retorna 400 com a lista de erros
  if(errors.length > 0)
    return res.status(400).send(errors);

  // Tenta criar o pedido no banco de dados
  const result = await createOrder(order);

  // Se a criação for bem-sucedida, retorna 201 com mensagem
  if(result === "ok")
    return res.status(201).send("Pedido criado com sucesso");

  // Caso haja algum erro durante a criação, retorna 500
  return res.status(500).send(result);
}

/**
 * @description Lista todos os pedidos cadastrados
 * @returns {JSON} Lista de pedidos
 */
export async function list(req, res) {

  // Busca todos os pedidos no banco de dados
  const orders = await selectOrders();

  // Retorna os pedidos
  res.status(200).send(orders);
}

/**
 * @description Busca um pedido específico pelo ID
 * @param {JSON} req - ID passado com parametro na URL do pedido
 * @returns {JSON | string} Pedido encontrado ou mensagem de erro 404
 */
export async function getById(req, res) {

  // Busca o pedido pelo ID
  const order = await selectOrders(req.params.id);

  // Se não encontrar o pedido, retorna 404
  if(!order || order.length === 0)
    return res.status(404).send("Pedido não encontrado");

  // Retorna o pedido encontrado
  res.json(order);
}

/**
 * @description Atualiza um pedido existente
 * @param {JSON} req - Objeto contendo os dados atualizados do pedido
 * 
 * Retornos:
 * - Se os dados forem inválidos: retorna status 400 com erros de validação
 * - Se atualizado com sucesso: retorna o resultado da operação
 */
export async function update(req, res) {

  // Pega o ID do pedido dos parâmetros da URL
  const paramId = req.params.id;

  // Cria uma instância de pedido com os dados enviados e o ID do parâmetro
  const order = new Order({ ...req.body, numeroPedido: paramId });

  // Valida os dados do pedido
  const errors = order.isValid();

  // Se houver erros de validação, retorna 400
  if(errors.length > 0)
    return res.status(400).send(errors);

  // Atualiza o pedido no banco de dados
  const result = await updateOrder(paramId, order);

  // Retorna o resultado
  res.send(result);
}

/**
 * @description Remove um pedido pelo ID
 * @param {JSON} req - Objeto contendo o ID do pedido em req.params.id
 * @returns {string} Resultado da operação de exclusão
 */
export async function remove(req, res) {

  // Tenta remover o pedido pelo ID
  const result = await deleteOrder(req.params.id);

  // Retorna o resultado da exclusão
  res.send(result);
}