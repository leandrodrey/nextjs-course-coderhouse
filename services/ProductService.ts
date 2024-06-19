import mongoose from 'mongoose';
import CategoryModel from '@/models/Category';
import ProductModel from '@/models/Products';
import {IProductWithCategory} from '@/interfaces/IProduct';
import {db} from '@/database';

class ProductService {

    async getProductById(productId: string): Promise<IProductWithCategory | null> {
        if (!mongoose.isValidObjectId(productId)) {
            return null;
        }

        await db.connect();
        try {
            const product = await ProductModel.findById(productId);
            if (!product) return null;
            const category = await CategoryModel.findById(product.categoryId);
            return {
                ...product.toObject(),
                categoryName: category?.title || 'Unknown',
            };
        } finally {
            await db.disconnect();
        }
    }

    async getProductsByCategory(category: number | string): Promise<IProductWithCategory[] | null> {
        await db.connect();

        try {
            let products;

            if (category === 'all') {
                products = await ProductModel.find();
            } else {
                if (mongoose.isValidObjectId(category)) {
                    products = await ProductModel.find({categoryId: category});
                } else {
                    const categoryData = await CategoryModel.findOne({title: category});
                    if (!categoryData) {
                        return null;
                    }
                    products = await ProductModel.find({categoryId: categoryData._id});
                }
            }

            if (!products.length) {
                return null;
            }

            const productsWithCategory: IProductWithCategory[] = await Promise.all(
                products.map(async (product) => {
                    const categoryData = await CategoryModel.findById(product.categoryId);
                    return {
                        ...product.toObject(),
                        categoryName: categoryData?.title || 'Unknown',
                    } as IProductWithCategory;
                })
            );

            return productsWithCategory;
        } finally {
            await db.disconnect();
        }
    }

    async updateProduct(productId: string, productData: any): Promise<IProductWithCategory | null> {
        if (!mongoose.isValidObjectId(productId)) {
            return null;
        }

        await db.connect();
        try {
            const updatedProduct = await ProductModel.findByIdAndUpdate(productId, productData, {new: true});
            return updatedProduct ? updatedProduct.toObject() : null;
        } finally {
            await db.disconnect();
        }
    }

    async deleteProductById(productId: string): Promise<boolean> {
        if (!mongoose.isValidObjectId(productId)) {
            return false;
        }

        await db.connect();
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(productId);
            return !!deletedProduct;
        } finally {
            await db.disconnect();
        }
    }
}

export const productService = new ProductService();
