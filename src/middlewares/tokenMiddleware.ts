import { verifyToken } from '../utils/token';
import { Response, NextFunction } from 'express';
import { CustomRequest } from '../types/CustomRequest';

export const tokenMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({
            error: true,
            message: 'Ops! Acho algo aconteceu com seu login.',
        });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).send({
        error: true,
        message: 'Ops! Acho algo aconteceu com seu login.',
        });
    } 

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({
            error: true,
            message: 'Ops! Acho algo aconteceu com sua autenticação.',
        });
    }

    verifyToken(token, (err, decoded) => {
        if (err || !decoded) {
            return res
                .status(401)
                .send({ error: true, message: 'Ops! Acho algo aconteceu com sua autenticação.' });
        }

        req.userId = decoded.id;
        return next();
    });
}