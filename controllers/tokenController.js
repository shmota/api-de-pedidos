import jwt from "jsonwebtoken";
import 'dotenv/config';

/**
 * @description Middleware que valida o token JWT enviado no header Authorization
 * @param {Function} next - Função para passar para o próximo middleware
 * @returns {void} Retorna 401 ou 403 em caso de erro, ou continua para o próximo middleware
 */
export function authenticateToken(req, res, next) {

  // Pega o header Authorization
  const authHeader = req.headers["authorization"];

  // Separa o token do prefixo "Bearer "
  const token = authHeader && authHeader.split(" ")[1];

  // Se não houver token, retorna 401 Unauthorized
  if (!token) 
    return res.sendStatus(401);

  // Verifica se o token é válido usando a chave secreta
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    // Se o token for inválido ou expirado, retorna 403 Forbidden
    if (err)
      return res.sendStatus(403);

    // Armazena os dados do usuário na requisição para uso posterior
    req.user = user;

    // Continua para o próximo middleware ou rota
    next();
  });
}