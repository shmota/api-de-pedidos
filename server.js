import express from 'express'
import { selectOrders } from './db_controllers/actions/select.js'

const app = express()


//Uri para criar um novo pedido 
app.post('/order/teste', (req, res) => {
  res.send('Hello World')
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

//Uri para listar todos os pedidos 
app.get('/order/list', (req, res) => {
  res.send('Hello World')
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