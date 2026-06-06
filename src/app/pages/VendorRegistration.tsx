import { useState } from 'react';
import { CheckCircle, Clock, GraduationCap } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

export default function VendorRegistration() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-warning rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-12 h-12 text-warning-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Application Submitted!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your interest in becoming a Siksha Kendra vendor. Your application is currently under review.
          </p>
          <div className="bg-primary-light p-6 rounded-[12px] mb-6">
            <h3 className="font-semibold text-foreground mb-3">What's Next?</h3>
            <ul className="text-left space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Our team will review your application within 2-3 business days</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>You will receive an email notification about your approval status</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Once approved, you can access your vendor dashboard and start referring students</span>
              </li>
            </ul>
          </div>
          <Button onClick={() => window.location.href = '/'}>Back to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-accent py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-[12px] flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">Siksha Kendra</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-3">Become a Siksha Kendra Vendor</h1>
          <p className="text-lg text-muted-foreground">Join our network of trusted educational partners</p>
        </div>

        <Card className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Vendor Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Unlimited Referrals</p>
                <p className="text-sm text-muted-foreground">Generate unlimited student referral codes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Track Enrollments</p>
                <p className="text-sm text-muted-foreground">Monitor all student enrollments in real-time</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Dashboard Access</p>
                <p className="text-sm text-muted-foreground">Complete vendor dashboard with analytics</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">QR Code System</p>
                <p className="text-sm text-muted-foreground">Generate QR codes for easy student registration</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Vendor Information</h3>
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Address Details</h3>
              <div className="space-y-4">
                <Input
                  label="Complete Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="House/Building, Street, Area"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="City"
                  />
                  <Input
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="State"
                  />
                  <Input
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    placeholder="123456"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button type="submit" size="lg" className="flex-1">
                Submit Application
              </Button>
              <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => window.history.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          By submitting this application, you agree to our Vendor Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
