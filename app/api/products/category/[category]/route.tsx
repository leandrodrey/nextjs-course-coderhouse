import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import ProductModel from '@/models/Products';
import CategoryModel from '@/models/Category';
import {IProductWithCategory} from "@/interfaces/IProduct";
import { db } from "@/database";

export async function GET(request: NextRequest, { params }: { params: { category: string } }): Promise<NextResponse> {
    const { category } = params;

    await db.connect();
    try {
        let products;
        if (category === 'all') {
            products = await ProductModel.find();
        } else {
            if (mongoose.isValidObjectId(category)) {
                products = await ProductModel.find({ categoryId: category });
            } else {
                const categoryData = await CategoryModel.findOne({ title: category });
                if (!categoryData) {
                    return new NextResponse(JSON.stringify({ error: 'Category not found' }), {
                        status: 404,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
                products = await ProductModel.find({ categoryId: categoryData._id });
            }
        }

        const productsWithCategory: IProductWithCategory[] = await Promise.all(products.map(async (product) => {
            const categoryData = await CategoryModel.findById(product.categoryId);
            return {
                ...product.toObject(),
                categoryName: categoryData ? categoryData.title : 'Unknown'
            } as IProductWithCategory;
        }));

        return new NextResponse(JSON.stringify(productsWithCategory), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        let errorMessage = 'An unknown error occurred';
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
