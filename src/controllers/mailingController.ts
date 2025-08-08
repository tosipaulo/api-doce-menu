import { Request, Response } from "express";
import { prisma } from '../lib/prisma';

export const createMailing = async (req: Request, res: Response) => {
  try {
    const { name, email, phoneNumber, doceriaName } = req.body;

    // Validação dos campos obrigatórios
    if (!name || !email || !phoneNumber || !doceriaName) {
      return res.status(400).json({
        error: true,
        message: "Todos os campos são obrigatórios"
      });
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: true,
        message: "Email inválido"
      });
    }

    const existingMailing = await prisma.mailing.findFirst({ where: { email }});

    if (existingMailing) {
      return res.status(409).json({ error: true, message: "Ops! Esse e-mail já foi cadastrado." });
    }

    // Criar o mailing no banco de dados
    const mailing = await prisma.mailing.create({
      data: {
        name,
        email,
        phoneNumber,
        doceriaName
      }
    });

    return res.status(201).json({
      error: false,
      message: "Legal! Seu cadastro foi salvo com sucesso!",
    });

  } catch (error) {
    console.error("Erro ao criar mailing:", error);
    return res.status(500).json({
      error: true,
      message: "Erro interno do servidor"
    });
  }
};

export const getAllMailings = async (req: Request, res: Response) => {
  try {
    const mailings = await prisma.mailing.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json({
      error: false,
      message: "Legal! Seu cadastro foi salvo com sucesso!",
      mailings
    });

  } catch (error) {
    console.error("Erro ao buscar mailings:", error);
    return res.status(500).json({
      error: true,
      message: "Erro interno do servidor"
    });
  }
}; 