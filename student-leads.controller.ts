import type { Response } from 'express';
import { z } from 'zod';
import { prisma } from './index';
import { AuthRequest } from './auth.middleware';

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  address: z.string().optional(),
  class: z.string().optional(),
  course_id: z.string().uuid(),
  referral_code: z.string().optional(),
});

export const submitLead = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const data = leadSchema.parse(req.body);
    let vendorId = null;

    if (data.referral_code) {
      const vendor = await prisma.vendor.findUnique({ where: { referral_code: data.referral_code } });
      if (vendor && vendor.status === 'ACTIVE') vendorId = vendor.id;
    }

    const lead = await prisma.studentLead.create({
      data: {
        name: data.name, phone: data.phone, email: data.email,
        address: data.address, class: data.class,
        course_id: data.course_id, vendor_id: vendorId,
      }
    });

    res.status(201).json({ message: 'Enrollment submitted successfully.', leadId: lead.id });
  } catch (error: any) {
    res.status(400).json({ message: error.errors || error.message });
  }
};

export const getLeads = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const filter = req.user.role === 'VENDOR' ? { vendor_id: req.user.vendorId } : {};

    const leads = await prisma.studentLead.findMany({
      where: filter,
      include: { course: true, vendor: { include: { user: true } } },
      orderBy: { created_at: 'desc' }
    });
    res.json(leads);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};