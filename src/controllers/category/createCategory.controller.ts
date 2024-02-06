import { Request, Response } from 'express';
import Category, { CategoryType } from '../../models/category.model';

import Joi from 'joi';
import uploader, { compressUploader } from '../../services/gcp/uploader.gcp';

const createCategory = async (req: any, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const category: any = new Category(req.body as CategoryType);
    if (req.file) {
      const returned = await compressUploader(req.file);
      category.icon = returned?.imageLocation;
    }
    if (req.user) {
      category.createdBy = req.user._id;
    }

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const validate = (body: CategoryType): Joi.ValidationResult => {
  const Schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    createdBy: Joi.string(),
    icon: Joi.string(),
  });
  return Schema.validate(body);
};

export default createCategory;
