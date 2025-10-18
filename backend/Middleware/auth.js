import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME || 'icr_token';

export const authRequired = (req, res, next) => {
  const token = req.cookies?.[COOKIE_NAME] || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) return res.status(401).json({ message: 'unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'invalid token' });
  }
};

export const permit = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'unauthorized' });
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'forbidden' });
  next();
};
