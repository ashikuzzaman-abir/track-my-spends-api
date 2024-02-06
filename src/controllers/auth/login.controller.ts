import { Response } from 'express';
import Joi from 'joi';
import User from '../../models/user.model';
import bcrypt from 'bcrypt';

const login = async (req: any, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: 'Invalid email or password' });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: 'Invalid email or password' });
    const token = user.generateAuthToken();
    res.status(200).json({ token });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const validate = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Email must be a valid email',
    }),
    password: Joi.string().min(8).max(255).required().messages({
      'any.required': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
    }),
  });
  return schema.validate(data);
};

export default login;
