// src/app/api/users/route.js
import connectToDatabase from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Move to .env

export async function POST(req) {
  const { action, email, username, password } = await req.json();
  await connectToDatabase();

  if (action === 'register') {
    const existing = await User.findOne({ email });
    if (existing) return Response.json({ error: 'User already exists' }, { status: 400 });

    const newUser = new User({ email, username, password });
    await newUser.save();

    return Response.json({ message: 'User registered successfully' });
  }

  if (action === 'login') {
    const user = await User.findOne({ email });
    if (!user) return Response.json({ error: 'User not found' }, { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return Response.json({ error: 'Invalid password' }, { status: 401 });

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return Response.json({ token, user: { email: user.email, isAdmin: user.isAdmin } });
  }

  return Response.json({ error: 'Invalid action' }, { status: 400 });
}
const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, {
    expiresIn: '7d',
  });
  
  // Set cookie securely
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  
  return Response.json({ user: { email: user.email, isAdmin: user.isAdmin } });