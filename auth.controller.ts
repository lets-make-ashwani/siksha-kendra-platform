import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from './index'; // or correct path to prisma instance

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const applicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(4),
});

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    // 1. Super Admin Environment Variable Login (Bypasses Database)
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;
    
    if (superAdminEmail && email === superAdminEmail && password === superAdminPassword) {
      const token = jwt.sign(
        { id: 'super_admin_env', role: 'SUPER_ADMIN' },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
      );
      return res.json({ token, user: { id: 'super_admin_env', name: 'Super Admin', email: superAdminEmail, role: 'SUPER_ADMIN' } });
    }

    // 2. Standard Vendor Database Login
    const user = await prisma.user.findUnique({ where: { email }, include: { vendor: true } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.role === 'VENDOR' && user.vendor?.status !== 'ACTIVE') {
      return res.status(403).json({ message: 'Vendor account is not active' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, vendorId: user.vendor?.id },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (error: any) {
    res.status(400).json({ message: error.errors || error.message });
  }
};

export const applyForVendor = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = applicationSchema.parse(req.body);
    
    const existing = await prisma.vendorApplication.findUnique({ where: { email: data.email } });
    if (existing) {
      return res.status(400).json({ message: 'An application with this email already exists.' });
    }

    await prisma.vendorApplication.create({ data });
    
    res.status(201).json({ message: 'Application submitted successfully. Awaiting admin approval.' });
  } catch (error: any) {
    res.status(400).json({ message: error.errors || error.message });
  }
};