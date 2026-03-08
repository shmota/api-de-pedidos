import express from "express"
import * as orderController from "../controllers/orderController.js"
import { authenticateToken } from "../controllers/tokenController.js"

const orderRouter = express.Router()


/**
 * @file ordersRouter.js
 * Atribuição de função para cada método do endpoint /orders
 * Consultar {@link ../controllers/orderController.js|orderController} para mais detalhes.
 * 
 * Rotas disponíveis:
 * POST   /orders       → Criar um pedido
 * GET    /orders/list  → Listar todos os pedidos
 * GET    /orders/:id   → Obter um pedido específico
 * PUT    /orders/:id   → Atualizar um pedido
 * DELETE /orders/:id   → Excluir um pedido
 */

orderRouter.post("/", authenticateToken, orderController.create)

orderRouter.get("/list", authenticateToken, orderController.list)

orderRouter.get("/:id", authenticateToken, orderController.getById)

orderRouter.put("/:id", authenticateToken, orderController.update)

orderRouter.delete("/:id", authenticateToken, orderController.remove)

export default orderRouter