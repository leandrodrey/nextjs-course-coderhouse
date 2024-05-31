import { Types } from 'mongoose';

export type ICategory = {
    _id: Types.ObjectId;
    title: string;
} | null;
