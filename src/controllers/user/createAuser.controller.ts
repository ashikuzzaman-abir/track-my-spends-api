import { Request, Response } from 'express';
import Joi from 'joi';

import User from '../../models/user.model';
import bcrypt from 'bcrypt';

type BodyType = {
  name: string;
  email: string;
  phone: string;
  password: string;
  isActive: boolean;
  role: string;
  dateOfBirth: Date;
  profileImage: string;
};

const createAUser = async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const { password, email } = req.body;

    //check if user exist
    const existedUser = await User.findOne({ email });
    if (existedUser)
      return res.status(400).json({ message: 'User already exists' });

    // create a user
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    req.body.password = hashedPass;

    req.body.role = req.body.role || '65be6691caff8d8cbc1d3d91';
    const user = new User(req.body);
    const savedUser: any = await user.save();
    const { password: pass, ...userWithoutPassword } = savedUser._doc;
    if (!savedUser)
      return res.status(400).json({ message: 'User could not be created' });

    return res.status(201).json({
      message: 'user has been created',
      doc: { ...userWithoutPassword },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const validate = (data: BodyType): Joi.ValidationResult => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required().messages({
      'any.required': 'Name is required',
      'string.min': 'Name must be at least 2 characters long',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email',
    }),
    phone: Joi.string().messages({}),
    password: Joi.string().min(8).max(1024).required().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.max': 'Password cannot be more than 1024 characters',
    }),
    isActive: Joi.boolean().messages({
      'any.boolean': 'Active must be a boolean',
    }),
    role: Joi.string().messages({
      'any.required': 'Role is required',
    }),
    dateOfBirth: Joi.date().messages({
      'any.date': 'Date of Birth must be a valid date',
    }),
    profileImage: Joi.string().messages({}),
  });
  return schema.validate(data);
};

export default createAUser;
