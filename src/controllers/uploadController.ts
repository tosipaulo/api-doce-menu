import { Response } from 'express';
import { CustomRequest } from "../types/CustomRequest";
import { prisma } from '../lib/prisma'
import cloudinary from '../utils/cloudinary';

const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result?.secure_url) return reject(new Error('No URL returned'));
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
};

export const uploadImage = async (req: CustomRequest, res: Response) => {
  try {
    const { type } = req.body;
    const userId = req.userId;

    if (!req.file) return res.status(400).json({ error: true, message: 'Ops! Parece que nenhum arquivo foi enviado.' });
    if (!type) return res.status(400).json({ error: true, message: 'Ops! Parece que estão faltando informações.' });

    let folder = '';
    if (type === 'restaurant') folder = 'restaurant_images';
    else if (type === 'product') folder = 'product_images';
    else if (type === 'logo') folder = 'logo_images';
    else return res.status(400).json({ error: true, message: 'Tipo inválido.' });

    const imageUrl = await uploadToCloudinary(req.file.buffer, folder);

    let updatedRecord;

    if (type === 'restaurant' || type === 'logo') {
        const restaurant = await prisma.restaurantSettings.findFirst({
            where: {
                menu: {
                    userId: userId,
                },
            },
            include: {
                menu: true,
            },
        });

        if (!restaurant) {
            return res.status(403).json({ error: true, message: 'Ops! Restaurante não encontrado.' });
        }
        const updateData: any = {};
        if (type === 'restaurant') {
            updateData.imagemHighlight = imageUrl;
        } else if (type === 'logo') {
            updateData.logoUrl = imageUrl;
        }

        updatedRecord = await prisma.restaurantSettings.update({
            where: { id: restaurant.id },
            data: updateData,
        });

    } else if (type === 'product') {
        const product = await prisma.product.findFirst({
            where: {
                menu: {
                    userId: userId,
                },
            },
        });

        if (!product) {
            return res.status(403).json({ error: true, message: 'Ops! Produto não encontrado.' });
        }
        updatedRecord = await prisma.product.update({
            where: { id: product.id },
            data: { imageUrl },
        });
    }

    res.json({erro: false, message: 'Perfeito! Sua imagem foi enviada com sucesso.', imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
