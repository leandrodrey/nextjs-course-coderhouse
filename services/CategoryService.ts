import CategoryModel from '@/models/Category';
import { db } from '@/database';

class CategoryService {
    async getCategories(): Promise<any[] | null> {
        await db.connect();

        try {
            const categories = await CategoryModel.find().lean(); // Use .lean() for plain objects
            return categories.map(category => ({ ...category, _id: category._id.toString() }));
        } catch (error) {
            console.error('Error fetching categories:', error);
            return null;
        } finally {
            await db.disconnect();
        }
    }
}

export const categoryService = new CategoryService();
