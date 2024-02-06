import { Response } from "express";import User from "../../models/user.model";



const getAllUsers = async (req: any, res: Response) => {
  try {
    
    const users = await User.find().select('-password').populate('role');
    res.status(200).json({ doc: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default getAllUsers;