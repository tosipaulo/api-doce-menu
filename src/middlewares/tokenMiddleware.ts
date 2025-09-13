import { verifyToken } from '../utils/token';
import { Response, NextFunction } from 'express';
import { CustomRequest } from '../types/CustomRequest';

export const tokenMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    let tokenCookie = req.cookies?.token as string | undefined;

    if (!tokenCookie) {
        return res.status(401).send({
            error: true,
            message: 'Ops! Acho algo aconteceu com seu login.',
        });
    }

    verifyToken(tokenCookie, (err, decoded) => {
        if (err || !decoded) {
            return res
                .status(401)
                .send({ error: true, message: 'Ops! Acho algo aconteceu com sua autenticação.' });
        }

        req.userId = decoded.id;
        return next();
    });
}