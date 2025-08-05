import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, generateTokenJWT, comparePassword } from "../utils/token";
import crypto from "crypto";
import { getEmailTemplate } from "../utils/email";
import { configSMTP, configEmail } from "../config/nodemailer"

const prisma = new PrismaClient();

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