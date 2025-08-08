import { User } from '@prisma/client';
import { Request } from 'express';

export interface CustomRequest extends Request {
  userId?: string;
  user?: User;
}