import {NextRequest, NextResponse} from 'next/server';
import mongoose from 'mongoose';
import CategoryModel from "@/models/Category";
import ProductModel from '@/models/Products';
import {IProductWithCategory} from "@/interfaces/IProduct";
import {db} from "@/database";

export async function GET(request: NextRequest, {params}: { params: { productId: string } }): Promise<NextResponse> {
    const {productId} = params;

    if (!mongoose.isValidObjectId(productId)) {
        return new NextResponse(JSON.stringify({error: 'Provided product ID is invalid or malformed.'}), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    await db.connect();
    try {
        const product = await ProductModel.findById(productId);
        if (!product) {
            return new NextResponse(JSON.stringify({error: 'Product with the specified ID was not found.'}), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        const category = await CategoryModel.findById(product.categoryId);
        const responseProduct: IProductWithCategory = {
            ...product.toObject(),
            categoryName: category ? category.title : 'Unknown'
        };

        return new NextResponse(JSON.stringify(responseProduct), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        let errorMessage = 'An error occurred while retrieving product data.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return new NextResponse(JSON.stringify({error: errorMessage}), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } finally {
        await db.disconnect();
    }
}

export async function PUT(request: NextRequest, {params}: { params: { productId: string } }): Promise<NextResponse> {
    const {productId} = params;

    if (!mongoose.isValidObjectId(productId)) {
        return new NextResponse(JSON.stringify({error: 'Invalid productId'}), {
            status: 400,
            headers: {'Content-Type': 'application/json'}
        });
    }

    const productData = await request.json();
    await db.connect();

    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            productId,
            productData,
            {new: true}
        );

        if (!updatedProduct) {
            return new NextResponse(JSON.stringify({error: 'Product not found'}), {
                status: 404,
                headers: {'Content-Type': 'application/json'}
            });
        }

        return new NextResponse(JSON.stringify(updatedProduct), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (error) {
        let errorMessage = 'An error occurred while updating the product.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return new NextResponse(JSON.stringify({error: errorMessage}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        });
    } finally {
        await db.disconnect();
    }
}

export async function DELETE(request: NextRequest, {params}: { params: { productId: string } }): Promise<NextResponse> {
    const {productId} = params;

    if (!mongoose.isValidObjectId(productId)) {
        return new NextResponse(JSON.stringify({error: 'Invalid productId'}), {
            status: 400,
            headers: {'Content-Type': 'application/json'}
        });
    }

    await db.connect();
    try {
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return new NextResponse(JSON.stringify({error: 'Product not found'}), {
                status: 404,
                headers: {'Content-Type': 'application/json'}
            });
        }

        return new NextResponse(JSON.stringify({message: 'Product deleted successfully'}), {
            status: 200,
            headers: {'Content-Type': 'application/json'}
        });
    } catch (error) {
        let errorMessage = 'An error occurred while deleting the product.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return new NextResponse(JSON.stringify({error: errorMessage}), {
            status: 500,
            headers: {'Content-Type': 'application/json'}
        });
    } finally {
        await db.disconnect();
    }
}
