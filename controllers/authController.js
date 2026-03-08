import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import 'dotenv/config';
import { getUser } from "../../database/actions/user/select.js";

/**
 * @description Autentica um usuário e retorna um token JWT
 * @param {Object} req - Objeto da requisição Express contendo username e password
 * @param {Object} res - Objeto de resposta Express
 * @returns {JSON} Token JWT se sucesso ou mensagem de erro com status 401
 */
export async function auth(req, res) {

  // Desestrutura username e password do corpo da requisição
  const { username, password } = req.body;
  
  // Busca o usuário no banco pelo username
  const user = await getUser(username);

  // Se o usuário não existir, retorna 401
  if (!user) {
    return res.status(401).json({ error: "Usuário inválido" });
  }

  // Compara a senha fornecida com o hash armazenado no banco
  const validPassword = await bcrypt.compare(password, user.password);

  // Se a senha for inválida, retorna 401
  if (!validPassword) {
    return res.status(401).json({ error: "Senha inválida" });
  }

  // Gera um token JWT contendo o ID do usuário, válido por 1 hora
  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Retorna o token JWT em JSON
  return res.json({ token });
}