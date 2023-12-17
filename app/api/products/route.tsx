import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/database';
import mongoose from 'mongoose';
import ProductModel from '@/models/Products';

export async function POST(request: NextRequest): Promise<NextResponse> {
    await db.connect();

    try {
        // En lugar de `request.json()`, usa `request.formData()` para obtener los datos del formulario.
        const formData = await request.formData();
        const title = formData.get('title');
        const description = formData.get('description');
        const price = formData.get('price');
        const stock = formData.get('stock');
        const imageFile = formData.get('image');

        // Asegúrate de validar cada campo y convertirlos a los tipos esperados
        if (typeof title !== 'string' || typeof description !== 'string' ||
            typeof price !== 'string' || typeof stock !== 'string' || !imageFile) {
            return new NextResponse(JSON.stringify({
                error: 'Invalid form data'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Aquí deberías manejar la carga de archivos. Por ejemplo, guardar el archivo en el sistema de archivos o en un servicio de almacenamiento.
        // Por ejemplo, puedes usar `imageFile.stream()` para obtener un ReadableStream y luego escribirlo en el sistema de archivos.

        const newProduct = new ProductModel({
            title,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            // Aquí deberías guardar el nombre de archivo o URL después de cargar la imagen.
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
