import { Types } from 'mongoose';

export interface IProduct {
    _id: Types.ObjectId;
    title: string;
    description: string;
    image: string;
    price: number;
    categoryId: Types.ObjectId;
    categoryName: string;
}

export interface IProductWithCategory extends IProduct {
    categoryName: string;
}
