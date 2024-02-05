import Category from '../../models/category.model';
import { Request, Response } from 'express';

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    const totalCategories = categories.length;
    res.json({ doc: { categories }, totalCategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllCategory;
