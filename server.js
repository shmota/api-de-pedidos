import express from 'express'
import loginRouter from './routers/loginRouter.js';
import orderRouter from "./routers/orderRouter.js";

const app = express()

app.use(express.json());

/**
 * @description Endpoint de tratamento dos pedidos
 */
app.use("/order", orderRouter);

/**
 * @description Tratamento da autenticação
 * @returns { JSON }
 */
app.use("/login", loginRouter);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})