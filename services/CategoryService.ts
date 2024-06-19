import CategoryModel from '@/models/Category';
import { connect, disconnect } from "@/database/db";

class CategoryService {
    async getCategories(): Promise<any[] | null> {
        await connect();

        try {
            const categories = await CategoryModel.find().lean(); // Use .lean() for plain objects
            return categories.map(category => ({ ...category, _id: category._id.toString() }));
        } catch (error) {
            console.error('Error fetching categories:', error);
            return null;
        } finally {
            await disconnect();
        }
    }
}

export const categoryService = new CategoryService();
