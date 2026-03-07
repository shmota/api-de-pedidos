import express from 'express'
import { selectOrders } from './db_controllers/actions/orders/select.js'
import { Order } from './db_controllers/models/orderModel.js';
import { createOrder } from './db_controllers/actions/orders/create.js';
import { updateOrder } from './db_controllers/actions/orders/update.js';
import { deleteOrder } from './db_controllers/actions/orders/delete.js';
import jwt from "jsonwebtoken";
import { authenticateToken } from './auth_controller/auth.js';
import { getUser } from './auth_controller/getUser.js';
import bcrypt from "bcrypt";
import 'dotenv/config';

const app = express()

app.use(express.json());

//Uri para criar um novo pedido 
app.post('/order', authenticateToken, async (req, res) => {

  const order = new Order(req.body)

  const errors = order.isValid() 

  if(errors.length == 0){

    const creation = await createOrder(order);

    if(creation === "ok"){

      res.status(201).send("Pedido criado com sucesso")

    }
    else{

      res.status(501).send(creation)

    }

  }
  else(

    res.status(400).send(errors)

  )

})

//Uri para listar todos os pedidos 
app.get('/order/list', authenticateToken, async (req, res) => {
  
  const resposta = await selectOrders();
  
  res.send(resposta)
})

//Uri para obter dados de um pedido recebendo um id como parêmetro na URL
app.get('/order/:id', authenticateToken, async (req, res) => {
  
  const orderId = await selectOrders(req.params.id);

  if(resposta.length == 0){
    res.status(404).send("Pedido não encontrado");
  }
  else{
    
    res.json(orderId)

  }

})

//Uri para atualizar os dados de um pedido recebendo o id como parêmetro na URL
app.put('/order/:id', authenticateToken, async (req, res) => {

  const orderId = req.params.id;

  const newOrder = new Order(req.body);

  const errors = newOrder.isValid();

  if(errors.length == 0){
    const result = await updateOrder(orderId, newOrder);
    res.status(202).send(result);
  }
  else{

    res.status(400).send(errors);
  
  }

})

//Uri para excluir um pedido recebendo o id como parêmetro na URL
app.delete('/order/:id', authenticateToken, async (req, res) => {

  const orderId = req.params.id;

  const result = await deleteOrder(orderId);

  if(result === "ok"){

    res.status(202).send(result)

  }
  else{

    res.status(501).send(result)

  }

})

app.post("/login", async (req, res) => {

  const { username, password } = req.body;

  // buscar usuário no banco
  const user = await getUser(username);

  if(!user){
    return res.status(401).json({error: "Usuário inválido"});
  }

  const validPassword = await bcrypt.compare(password, user.password);

  console.log(req.body)

  if(!validPassword){
    return res.status(401).json({error: "Senha inválida"});
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });

});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})