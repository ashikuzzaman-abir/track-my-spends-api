import { Request, Response } from 'express';

// Assuming you have a Role model or data source
import Role from '../../models/role.model';

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    // Fetch all roles from the data source
    const roles = await Role.find();

    // Return the roles as a response
    res.status(200).json(roles);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ message: 'Internal server error' });
  }
};
