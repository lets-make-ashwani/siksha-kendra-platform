import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './auth.routes';
import referralRoutes from './referral.routes';
import adminRoutes from './admin.routes';
import studentLeadsRoutes from './student-leads.routes';
import coursesRoutes from './courses.routes';
import vendorRoutes from './vendor.routes';

dotenv.config();

const app = express();
export const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Security and Utility Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    process.env.FRONTEND_URL as string // Production Vercel URL
  ].filter(Boolean),
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Siksha Kendra API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/referrals', referralRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student-leads', studentLeadsRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/vendor', vendorRoutes);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});