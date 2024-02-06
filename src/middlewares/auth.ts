import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

type IRequest = Request & {
  user?: any;
  permissions?: string[];
};

export function authfunction(req: IRequest, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token');
  // const token = req.cookies.token;
  if (!token) return res.status(401).send('Access denied. No token present');

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY || 'fallback_key_12345_924542'
    );
    req.user = decoded;
    next();
  } catch (ex: any) {
    res.status(400).send('Invalid token.');
  }
}

type IUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  organisation: string;
  sysUser: boolean;
};

const extractToken = (req: IRequest): string | null => {
  const bearerToken = req.headers.authorization;
  if (bearerToken && bearerToken.startsWith('Bearer')) {
    return bearerToken.split(' ')[1];
  }
  return null;
};

export const protect = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = extractToken(req);

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY!) as IUser;
    const user: any = await User.findById(decoded?._id)
      .select('-password')
      .populate('role');

    if (!user) {
      return res.status(401).json({ message: 'Not authorized, Invalid User' });
    }

    req.user = user;
    req.permissions = user.role?.permissions;
    next();
  } catch (error: any) {
    console.error(error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const user = (req: IRequest, res: Response, next: NextFunction) => {
  const token = extractToken(req);
  // console.log('token: ', token);
  if (req.user) return next();
  if (!token) {
    next();
  } else {
    jwt.verify(
      token,
      process.env.JWT_PRIVATE_KEY!,
      async (err: any, decoded: any) => {
        if (err) {
          req.user = null;
          console.log('error: ', err.message);
          next();
        } else {
          const _user = decoded;
          const user = await User.findById(_user._id)
            .select('-password')
            .populate('role');
          req.user = user;
          next();
        }
      }
    );
  }
};

export const admin = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role.name === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied.' });
  }
};
