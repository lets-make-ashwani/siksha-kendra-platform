import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { GraduationCap, Mail, Lock } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'student'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.userType === 'admin') {
      navigate('/admin/dashboard');
    } else if (formData.userType === 'vendor') {
      navigate('/vendor/dashboard');
    } else {
      navigate('/student/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-accent flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-14 h-14 bg-primary rounded-[12px] flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-foreground">Siksha Kendra</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">Sign in to continue your learning journey</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-foreground">Login As</label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-input-background border border-input rounded-[12px] text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="student">Student</option>
                <option value="vendor">Vendor</option>
                <option value="admin">Super Admin</option>
              </select>
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-[50px] -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="pl-12"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-[50px] -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="pl-12"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                <span className="text-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">Forgot Password?</a>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Sign In
            </Button>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{' '}
          <Link to="/courses" className="text-primary hover:underline font-semibold">
            Browse Courses
          </Link>
        </p>
      </div>
    </div>
  );
}
