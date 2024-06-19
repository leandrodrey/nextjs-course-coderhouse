import mongoose, { Model, Schema } from 'mongoose';
import {IProduct} from '@/interfaces/IProduct';
import CategoryModel from "./Category";

const productsSchema = new Schema<IProduct>({
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
    },
    stock: {
        type: Number,
        required: true
    }
}, { timestamps: true });

productsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productsSchema.set('toJSON', {
    virtuals: true
});

productsSchema.set('toObject', {
    virtuals: true
});

let ProductModel: Model<IProduct>;
try {
    ProductModel = mongoose.model<IProduct>('Product');
} catch (error) {
    ProductModel = mongoose.model<IProduct>('Product', productsSchema);
}

export default ProductModel;
