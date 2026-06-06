import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from './index';

// Helper function to generate a secure random referral code
const generateReferralCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'SKR';
  for (let i = 0; i < 7; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const inviteVendor = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, phone, address, city, state, pincode } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists.' });
    }

    // Generate a temporary secure password for the new vendor
    const plainPassword = Math.random().toString(36).slice(-8) + 'A1!'; 
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Generate Vendor ID based on current count
    const vendorCount = await prisma.vendor.count();
    const vendor_id = `VND${String(vendorCount + 1).padStart(6, '0')}`;
    const referral_code = generateReferralCode();

    // Create User and Vendor records in the database simultaneously
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: 'VENDOR',
        is_verified: true,
        vendor: {
          create: {
            vendor_id,
            referral_code,
            address,
            city,
            state,
            pincode,
            status: 'ACTIVE',
          }
        }
      },
      include: { vendor: true }
    });

    const loginLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login`;

    // Return the generated credentials so the Admin can send them via email/WhatsApp
    res.status(201).json({
      message: 'Vendor created successfully.',
      credentials: {
        email: user.email,
        password: plainPassword,
        loginLink,
        messageToForward: `Hello ${user.name}, your Vendor account has been created. You can log in at ${loginLink} using Email: ${user.email} and Password: ${plainPassword}`
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const getAdminStats = async (req: Request, res: Response): Promise<any> => {
  try {
    const totalVendors = await prisma.vendor.count();
    const pendingVendors = await prisma.vendorApplication.count({ where: { status: 'PENDING' } });
    const totalStudents = await prisma.studentLead.count();
    
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const monthlyStudents = await prisma.studentLead.count({
      where: { created_at: { gte: startOfMonth } }
    });

    res.json({ totalVendors, pendingVendors, totalStudents, monthlyStudents });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const getPendingApplications = async (req: Request, res: Response): Promise<any> => {
  try {
    const applications = await prisma.vendorApplication.findMany({
      where: { status: 'PENDING' },
      orderBy: { created_at: 'desc' }
    });
    res.json(applications);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const approveApplication = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const application = await prisma.vendorApplication.findUnique({ where: { id } });
    
    if (!application || application.status !== 'PENDING') {
      return res.status(404).json({ message: 'Application not found or already processed.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email: application.email } });
    if (existingUser) return res.status(400).json({ message: 'User with this email already exists.' });

    const plainPassword = Math.random().toString(36).slice(-8) + 'A1!'; 
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const vendorCount = await prisma.vendor.count();
    const vendor_id = `VND${String(vendorCount + 1).padStart(6, '0')}`;
    const referral_code = generateReferralCode();

    const user = await prisma.user.create({
      data: {
        name: application.name, email: application.email, phone: application.phone,
        password: hashedPassword, role: 'VENDOR', is_verified: true,
        vendor: {
          create: {
            vendor_id, referral_code, address: application.address,
            city: application.city, state: application.state, pincode: application.pincode, status: 'ACTIVE'
          }
        }
      }
    });

    await prisma.vendorApplication.update({ where: { id }, data: { status: 'APPROVED' } });

    res.json({ message: 'Vendor approved successfully.', credentials: { email: user.email, password: plainPassword } });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const rejectApplication = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    await prisma.vendorApplication.update({ where: { id }, data: { status: 'REJECTED' } });
    res.json({ message: 'Application rejected successfully.' });
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllVendors = async (req: Request, res: Response): Promise<any> => {
  try {
    const vendors = await prisma.vendor.findMany({
      include: { user: true, _count: { select: { studentLeads: true } } },
      orderBy: { created_at: 'desc' }
    });
    res.json(vendors);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};