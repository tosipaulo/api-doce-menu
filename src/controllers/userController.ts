import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashPassword, generateTokenJWT } from "../utils/token";

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