import { Request, Response } from 'express';
import Role from '../../models/role.model';
import Joi from 'joi';
// Joi validation schema

const createARole = async (req: Request, res: Response) => {
  try {
    // const { name, permissions } = req.body;

    // Validate request body
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Create a new role
    const role = new Role(req.body);
    await role.save();

    return res.status(201).json({ message: 'Role created successfully', role });
  } catch (error) {
    console.error('Error creating role:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const validate = (data): Joi.ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'any.required': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
    }),
    permission: Joi.array().items(Joi.string()).messages({}),
  });
  return schema.validate(data);
};
export default createARole;
