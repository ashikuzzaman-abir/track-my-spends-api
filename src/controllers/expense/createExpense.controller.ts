import { Response } from 'express';
import Joi from 'joi';
import expense from '../../models/expense.model';

const createExpense = async (req: any, res: Response) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const newExpense = new expense({
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      user: req.user._id,
    });
    const exp = await newExpense.save();
    res.status(201).json({ message: 'Expense created successfully', doc: exp });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const validate = (body: any) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(50).required().messages({
      'any.required': 'Title is required',
      'string.min': 'Title must be at least 2 characters long',
    }),
    amount: Joi.number().required().messages({
      'any.required': 'Amount is required',
    }),
    category: Joi.string().messages({}),
  });
  return schema.validate(body);
};

export default createExpense;
