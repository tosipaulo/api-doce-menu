import bcrypt from "bcrypt";
import { verify } from "crypto";
import jwt, { Secret, JwtPayload, SignOptions, VerifyErrors } from 'jsonwebtoken';

interface AuthPayload {
  email: string;
}

type Expiry = `${number}${"ms" | "s" | "m" | "h" | "d" | "w" | "y"}`;

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
};

export const generateTokenJWT = ( payload: AuthPayload, expiresIn: Expiry = "5m"): string => {
    const secret = process.env.AUTH_SECRET;
    if (!secret) {
        throw new Error("AUTH_SECRET não está definido nas variáveis de ambiente.");
    }

    const options: SignOptions = { expiresIn };

    return jwt.sign(payload, secret as Secret, options);
};

export const verifyToken = ( token: string, callback: (err: VerifyErrors | null, decoded: JwtPayload | undefined) => void): void => {
    const secret = process.env.AUTH_SECRET;
    if (!secret) {
        throw new Error("AUTH_SECRET não está definido nas variáveis de ambiente.");
    }

    jwt.verify(token, secret, (err, decoded) => {
        callback(err, decoded as JwtPayload);
    });
};