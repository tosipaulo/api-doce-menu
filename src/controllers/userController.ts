import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, generateTokenJWT, comparePassword } from "../utils/token";
import crypto from "crypto";
import { getEmailTemplate } from "../utils/email";
import { configSMTP, configEmail } from "../config/nodemailer"

const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - phoneNumber
 *       properties:
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 *           example: "João Silva"
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "joao@example.com"
 *         password:
 *           type: string
 *           description: Senha do usuário
 *           example: "senha123"
 *         phoneNumber:
 *           type: string
 *           description: Número de telefone do usuário
 *           example: "(11) 99999-9999"
 *     UserResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Olá! João Silva, seu usuário foi criado com sucesso!"
 *         user:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "João Silva"
 *             email:
 *               type: string
 *               example: "joao@example.com"
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2024-01-01T00:00:00.000Z"
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "joao@example.com"
 *         password:
 *           type: string
 *           description: Senha do usuário
 *           example: "senha123"
 *     ForgotPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "joao@example.com"
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *         - token
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *           example: "joao@example.com"
 *         token:
 *           type: string
 *           description: Token de redefinição de senha
 *           example: "abc123def456"
 *         password:
 *           type: string
 *           description: Nova senha
 *           example: "novaSenha123"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Ops! Nome, e-mail, senha e telefone são obrigatórios."
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Criar novo usuário
 *     description: Cria um novo usuário no sistema
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Dados obrigatórios não fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email já existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, phoneNumber } = req.body;

    if ([name, email, password, phoneNumber].some(field => !field)) {
        return res.status(400).json({
            error: true,
            message: "Ops! Nome, e-mail, senha e telefone são obrigatórios.",
        });
    }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: true, message: "Ops! Esse e-mail já existe." });
    }

    const hashedPassword = await hashPassword(password);
    const token = generateTokenJWT({ email });

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber
      },
      select: {
        id: false,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
        error: false,
        message: `Olá! ${user.name}, seu usuário foi criado com sucesso!`,
        user,
        token
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: true, message: "Ops! Erro interno ao criar usuário" });
  }
};

/**
 * @swagger
 * /user/auth:
 *   post:
 *     summary: Autenticar usuário
 *     description: Autentica um usuário existente no sistema
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Email ou senha não fornecidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Credenciais inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const autenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Ops! E-mail e senha são obrigatórios.",
    });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: true, message: "Ops! Usuário não encontrado." });
    }

    if (!(await comparePassword(password, user.password))) {
      return res.status(401).json({ error: true, message: "Ops! E-mail ou senha incorreto." });
    }

    const token = generateTokenJWT({ email });

    return res.status(200).json({
      error: false,
      message: `Olá! ${user.name}, você está autenticado com sucesso!`,
      user: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      token
    });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    return res.status(500).json({ error: true, message: "Ops! Erro interno ao autenticar usuário" });
  }
}

/**
 * @swagger
 * /user/forgot-password:
 *   post:
 *     summary: Solicitar redefinição de senha
 *     description: Envia um email com instruções para redefinir a senha
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordRequest'
 *     responses:
 *       200:
 *         description: Email de redefinição enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Instruções para redefinir sua senha foram enviadas para o seu e-mail."
 *       400:
 *         description: Email não fornecido ou erro no envio
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Ops! E-mail é obrigatório.",
    });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    const token = crypto.randomBytes(20).toString('hex');
    const expireToken = new Date();
    expireToken.setHours(expireToken.getHours() + 1);

    if (!user) {
      return res.status(404).json({ error: true, message: "Ops! algo de errado! Tente novamente, por favor!" });
    }

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetExpires: expireToken,
      },
    });

    const htmlToSend = getEmailTemplate({
      base_url: `${process.env.BASE_URL}/nova-senha/${token}?email=${email}`
    }, 'newPassword');

    const smtp = configSMTP();

    try {
      await smtp.sendMail(configEmail(email, htmlToSend))
    } catch (error) {
      return res.status(400).send({ 
            error: true, 
            message: 'Ops! Não foi possível enviar recuperação por e-mail.' 
        });
    }

    return res.status(200).json({
      error: false,
      message: "Instruções para redefinir sua senha foram enviadas para o seu e-mail.",
    });
  } catch (error) {
    console.error("Erro ao solicitar redefinição de senha:", error);
    return res.status(500).json({ error: true, message: "Ops! Erro interno ao solicitar redefinição de senha" });
  }
};

/**
 * @swagger
 * /user/reset-password:
 *   post:
 *     summary: Redefinir senha
 *     description: Redefine a senha do usuário usando token de redefinição
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Legal, nova senha alterada com sucesso!"
 *       400:
 *         description: Dados obrigatórios não fornecidos ou token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export const resetPassword = async (req: Request, res: Response) => {
  const { email, token, password } = req.body;

  if (!email || !token || !password) {
    return res.status(400).json({
      error: true,
      message: "Ops! E-mail, token e nova senha são obrigatórios.",
    });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (
      !user ||
      user.resetToken !== token ||
      !user.resetExpires ||
      user.resetExpires < new Date()
    ) {
      return res.status(400).json({ error: true, message: "Ops! Token inválido ou expirado." });
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetExpires: null,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Legal, nova senha alterada com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    return res.status(500).json({ error: true, message: "Ops! Erro interno ao redefinir senha" });
  }
};