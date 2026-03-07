import express from 'express'
import { selectOrders } from './db_controllers/actions/select.js'
import { Order } from './db_controllers/models/orderModel.js';
import { createOrder } from './db_controllers/actions/create.js';

const app = express()

app.use(express.json());

//Uri para criar um novo pedido 
app.post('/order', async (req, res) => {

  const order = new Order(req.body)

  const errors = order.isValid() 

  if(errors.length == 0){

    const creation = await createOrder(order);

    if(creation === "ok"){

      res.status(201).send("Pedido criado com sucesso")

    }
    else{

      res.status(501).send( creation )

    }

  }
  else(

    res.status(400).send(errors)

  )

})

//Uri para listar todos os pedidos 
app.get('/order/list', async (req, res) => {
  
  const resposta = await selectOrders();
  
  res.send(resposta)
})

//Uri para obter dados de um pedido recebendo um id como parêmetro na URL
app.get('/order/:id', async (req, res) => {
  
  const resposta = await selectOrders(req.params.id);

  if(resposta.length == 0){
    res.status(404).send("Pedido não encontrado");
  }
  else{
    
    res.json(resposta)

  }

})

//Uri para atualizar os dados de um pedido recebendo o id como parêmetro na URL
app.put('/order', (req, res) => {
  res.send('Hello World')
})

//Uri para excluir um pedido recebendo o id como parêmetro na URL
app.delete('/order', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})