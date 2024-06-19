import mongoose, { Schema, Model } from 'mongoose';
import { ICategory } from '@/interfaces/ICategory';
import {IProduct} from "@/interfaces/IProduct";

const categorySchema = new Schema<ICategory>({
    title: { type: String, required: true, unique: true },
}, { timestamps: true });

let CategoryModel: Model<ICategory>;
try {
    CategoryModel = mongoose.model<ICategory>('Category');
} catch (error) {
    CategoryModel = mongoose.model<ICategory>('Category', categorySchema);
}

export default CategoryModel;
