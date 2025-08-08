import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../types/CustomRequest";
import { Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const verifyUser = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.userId;

    if (!userId) {
        return res.status(401).send({
            error: true,
            message: 'Ops! Parece que não está autorizado!',
        });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(400).send({
                error: true,
                message: 'Ops! Parece que não está autorizado!',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Erro ao verificar usuário:', error);
        return res.status(500).send({
            error: true,
            message: 'Erro interno do servidor.',
        });
    }
};
