import { Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import { BarChart3, Users, UserCheck, Clock, UserCircle, Settings, Copy, Share2, QrCode } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import Button from '../components/Button';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const sidebarItems = [
  { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Student List', path: '/students' },
  { icon: UserCircle, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: '/settings' }
];

const Dashboard = () => {
  const referralCode = 'SKR8Y4T2P9';
  const referralLink = `${window.location.origin}/enroll/${referralCode}`;
  const [showQR, setShowQR] = useState(false);

  const monthlyData = [
    { month: 'Jan', students: 12 },
    { month: 'Feb', students: 18 },
    { month: 'Mar', students: 25 },
    { month: 'Apr', students: 32 },
    { month: 'May', students: 45 },
    { month: 'Jun', students: 58 }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`Join Siksha Kendra through my referral link: ${referralLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const shareOnTelegram = () => {
    const message = encodeURIComponent(`Join Siksha Kendra through my referral link: ${referralLink}`);
    window.open(`https://t.me/share/url?url=${referralLink}&text=${message}`, '_blank');
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" richColors />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Vendor Dashboard</h1>
        <p className="text-muted-foreground">Track your referrals and student enrollments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Students" value="58" icon={Users} trend="+15 this month" color="primary" />
        <StatCard title="Pending Students" value="5" icon={Clock} color="warning" />
        <StatCard title="Approved Students" value="53" icon={UserCheck} color="success" />
        <StatCard title="This Month" value="13" icon={BarChart3} trend="+28%" color="secondary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="text-lg font-semibold text-foreground mb-6">Referral System</h3>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Your Referral Code</label>
              <div className="flex gap-2">
                <div className="flex-1 bg-primary-light border-2 border-primary rounded-[12px] px-4 py-3">
                  <p className="text-2xl font-bold text-primary text-center tracking-wider">{referralCode}</p>
                </div>
                <Button variant="outline" onClick={() => copyToClipboard(referralCode)}>
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Referral Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 bg-input-background border border-input rounded-[12px] px-4 py-3 text-foreground text-sm"
                />
                <Button variant="outline" onClick={() => copyToClipboard(referralLink)}>
                  <Copy className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-3 block">Share Via</label>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="flex-1" onClick={shareOnWhatsApp}>
                  <Share2 className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="flex-1" onClick={shareOnTelegram}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Telegram
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowQR(!showQR)}>
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </Button>
              </div>
            </div>

            {showQR && (
              <div className="bg-card border-2 border-border rounded-[12px] p-6 text-center">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary-light to-accent rounded-[12px] flex items-center justify-center mb-4">
                  <QrCode className="w-32 h-32 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">QR Code for {referralCode}</p>
                <p className="text-xs text-muted-foreground mt-1">Students can scan this to register</p>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Enrollments</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar dataKey="students" fill="#FF6B00" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Student Registrations</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Student Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Phone</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Class</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Course</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Rahul Kumar', phone: '+91 98765 43210', class: 'Class 12', course: 'JEE Advanced', status: 'Approved', date: '2026-06-05' },
                { name: 'Priya Sharma', phone: '+91 98765 43211', class: 'Class 11', course: 'NEET Complete', status: 'Approved', date: '2026-06-04' },
                { name: 'Amit Patel', phone: '+91 98765 43212', class: 'Class 10', course: 'CBSE Mathematics', status: 'Pending', date: '2026-06-03' },
                { name: 'Neha Singh', phone: '+91 98765 43213', class: 'Class 12', course: 'Physics Masterclass', status: 'Approved', date: '2026-06-02' },
                { name: 'Arjun Reddy', phone: '+91 98765 43214', class: 'Class 11', course: 'Chemistry Complete', status: 'Approved', date: '2026-06-01' }
              ].map((student, idx) => (
                <tr key={idx} className="border-b border-border">
                  <td className="py-3 px-4 text-foreground">{student.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{student.phone}</td>
                  <td className="py-3 px-4 text-muted-foreground">{student.class}</td>
                  <td className="py-3 px-4 text-muted-foreground">{student.course}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-[8px] text-sm font-semibold ${
                      student.status === 'Approved'
                        ? 'bg-success/20 text-success'
                        : 'bg-warning/20 text-warning'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{student.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const StudentList = () => (
  <div className="p-6">
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-foreground">All Students</h1>
    </div>

    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Student Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Email</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Phone</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Class</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Course</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Enrolled</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 15 }).map((_, idx) => (
              <tr key={idx} className="border-b border-border">
                <td className="py-3 px-4 text-foreground">Student {idx + 1}</td>
                <td className="py-3 px-4 text-muted-foreground">student{idx + 1}@example.com</td>
                <td className="py-3 px-4 text-muted-foreground">+91 9876543{String(idx).padStart(3, '0')}</td>
                <td className="py-3 px-4 text-muted-foreground">Class {10 + (idx % 3)}</td>
                <td className="py-3 px-4 text-muted-foreground">JEE Advanced</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-[8px] text-sm font-semibold ${
                    idx % 3 === 0
                      ? 'bg-warning/20 text-warning'
                      : 'bg-success/20 text-success'
                  }`}>
                    {idx % 3 === 0 ? 'Pending' : 'Approved'}
                  </span>
                </td>
                <td className="py-3 px-4 text-muted-foreground">2026-06-{String(idx + 1).padStart(2, '0')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

const Profile = () => (
  <div className="p-6">
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-foreground">Vendor Profile</h1>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Vendor ID</p>
            <p className="text-foreground font-semibold">VND0123</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Referral Code</p>
            <p className="text-foreground font-semibold">SKR8Y4T2P9</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="text-foreground font-semibold">Rajesh Kumar</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-foreground font-semibold">rajesh@example.com</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="text-foreground font-semibold">+91 98765 43210</p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-foreground mb-4">Address & Other Details</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="text-foreground font-semibold">123 Main Street, Sector 15</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">City</p>
            <p className="text-foreground font-semibold">New Delhi</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">State</p>
            <p className="text-foreground font-semibold">Delhi</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pincode</p>
            <p className="text-foreground font-semibold">110001</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Joining Date</p>
            <p className="text-foreground font-semibold">January 15, 2026</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

export default function VendorDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar items={sidebarItems} basePath="/vendor" />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/vendor/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<div className="p-6"><h1 className="text-3xl font-bold">Settings</h1></div>} />
        </Routes>
      </main>
    </div>
  );
}
