import Category from '../../models/category.model';
import { Request, Response } from 'express';

const getAllCategory = async (req: any, res: Response) => {
  try {
    const query = {};
    if (req.user) {
      query['$or'] = [{ createdBy: req.user._id }, { createdBy: null }];
    }
    const categories = await Category.find(query);
    const totalCategories = categories.length;
    res.json({ doc: { categories }, totalCategories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default getAllCategory;
