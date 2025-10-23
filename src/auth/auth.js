import jwt from 'jsonwebtoken'
import { secretKey, refreshSecretKey } from './config.js';

// Function to generate access token
export function generateAccessToken(User) {
  return jwt.sign({ email: User.email, _id: User._id }, secretKey, { expiresIn: '15m' });
}

// Function to generate refresh token
export function generateRefreshToken(User) {
  return jwt.sign({ email: User.email, _id: User._id }, refreshSecretKey, { expiresIn: '7d' });
}