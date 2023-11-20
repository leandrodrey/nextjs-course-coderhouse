import mongoose, { Model, Schema } from 'mongoose';
import {IProduct} from '@/interfaces/IProduct';

const productSchema = new Schema<IProduct>({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ProductModel: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema);

export default ProductModel;
