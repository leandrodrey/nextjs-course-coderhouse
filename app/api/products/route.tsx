import { NextRequest, NextResponse } from 'next/server';
import { promises as fsPromises, createWriteStream } from 'fs';
import path from 'path';
import ProductModel from '@/models/Products';
import { db } from '@/database';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { Readable } from 'stream';

const pipelineAsync = promisify(pipeline);

export async function POST(request: NextRequest): Promise<NextResponse> {
    await db.connect();

    try {
        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const price = formData.get('price');
        const stock = formData.get('stock');
        const imageFile = formData.get('image');
        const categoryId = formData.get('categoryId');

        if (
            typeof title !== 'string' ||
            typeof description !== 'string' ||
            typeof price !== 'string' ||
            typeof stock !== 'string' ||
            typeof categoryId !== 'string' ||
            !(imageFile instanceof Blob) // Cambia File a Blob si no estás en un entorno de navegador
        ) {
            throw new Error('Invalid form data');
        }

        // Crea el directorio si no existe
        const uploadDir = path.join(process.cwd(), 'public/gamebazar');
        await fsPromises.mkdir(uploadDir, { recursive: true });

        const imageFilePath = path.join(uploadDir, imageFile.name);

        // Guarda la imagen en el sistema de archivos
        const imageFileStream = imageFile.stream();
        const reader = imageFileStream.getReader();

        const nodeStream = new Readable({
            async read() {
                const result = await reader.read();
                if (result.done) {
                    this.push(null);
                } else {
                    this.push(new Uint8Array(result.value));
                }
            }
        });

        const fileStream = createWriteStream(imageFilePath);
        await pipelineAsync(nodeStream, fileStream);

        const newProduct = new ProductModel({
            title,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            image: `/gamebazar/${imageFile.name}`,
            categoryId: parseInt(categoryId)
        });

        const savedProduct = await newProduct.save();

        return new NextResponse(JSON.stringify(savedProduct), {
            status: 201,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        let errorMessage = 'An error occurred while creating the product.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return new NextResponse(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } finally {
        await db.disconnect();
    }
}
