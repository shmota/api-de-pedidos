import express from "express"
import { auth } from "../controllers/authController.js"

const loginRouter = express.Router()

/**
 * @file ordersRouter.js
 * Atribuição de função o endpoint de autenticação
 * Consultar {@link ../controllers/authController.js|auth} para mais detalhes.
 * 
 * Rotas disponíveis:
 * POST / → Login 
 */

loginRouter.post("/", auth)

export default loginRouter