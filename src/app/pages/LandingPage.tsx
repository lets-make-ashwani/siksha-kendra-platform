import { Link } from 'react-router';
import { GraduationCap, BookOpen, Users, Award, TrendingUp, CheckCircle, Star, MessageCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Card from '../components/Card';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Empowering Students Through Smart Learning
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Join thousands of students learning through trusted educational partners.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/courses">
                  <Button size="lg">Enroll Now</Button>
                </Link>
                <Link to="/become-vendor">
                  <Button size="lg" variant="outline">Become a Vendor</Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-card rounded-[24px] p-8 shadow-[0_8px_32px_var(--shadow)]">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-primary-light rounded-[12px]">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">1,000+ Courses</p>
                      <p className="text-sm text-muted-foreground">Available</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-accent rounded-[12px]">
                    <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-success-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">50,000+ Students</p>
                      <p className="text-sm text-muted-foreground">Learning</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-primary-light rounded-[12px]">
                    <div className="w-12 h-12 bg-warning rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-warning-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">500+ Vendors</p>
                      <p className="text-sm text-muted-foreground">Trusted Partners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2">TRUSTED BY THOUSANDS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Students Across India Trust Us
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary">50K+</p>
              <p className="text-muted-foreground mt-2">Active Students</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary">1000+</p>
              <p className="text-muted-foreground mt-2">Courses</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary">500+</p>
              <p className="text-muted-foreground mt-2">Vendors</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary">95%</p>
              <p className="text-muted-foreground mt-2">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2">FEATURED COURSES</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Popular Courses
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'JEE Advanced Preparation', class: 'Class 11-12', price: '₹15,999', rating: 4.8 },
              { title: 'NEET Complete Course', class: 'Class 11-12', price: '₹14,999', rating: 4.9 },
              { title: 'CBSE Mathematics', class: 'Class 10', price: '₹8,999', rating: 4.7 }
            ].map((course, idx) => (
              <Card key={idx} hover>
                <div className="aspect-video bg-gradient-to-br from-primary-light to-accent rounded-[12px] mb-4 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{course.title}</h3>
                <p className="text-muted-foreground mb-4">{course.class}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-warning text-warning" />
                    <span className="font-semibold">{course.rating}</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{course.price}</span>
                </div>
                <Link to={`/courses/${idx + 1}`}>
                  <Button className="w-full">View Details</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2">WHY CHOOSE US</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose Siksha Kendra
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="w-8 h-8" />,
                title: 'Expert Teachers',
                desc: 'Learn from experienced educators and subject matter experts'
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: 'Comprehensive Curriculum',
                desc: 'Complete syllabus coverage with regular assessments'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: 'Proven Results',
                desc: '95% success rate with thousands of successful students'
              }
            ].map((item, idx) => (
              <Card key={idx}>
                <div className="w-16 h-16 bg-primary-light rounded-[12px] flex items-center justify-center text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2">BENEFITS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Learning Benefits
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Live Interactive Classes',
              'Recorded Video Lectures',
              'Study Material & Notes',
              'Mock Tests & Assessments',
              'Doubt Clearing Sessions',
              'Progress Tracking',
              'Mobile App Access',
              'Certificate on Completion'
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 bg-card rounded-[12px] border border-border">
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                <span className="text-foreground font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Become a Siksha Kendra Vendor
              </h2>
              <p className="text-lg mb-6 text-primary-foreground/90">
                Join our network of trusted educational partners and grow your student base with our referral system.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Generate unlimited referrals</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Track your student enrollments</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Access vendor dashboard</span>
                </li>
              </ul>
              <Link to="/become-vendor">
                <Button variant="outline" size="lg" className="bg-white text-primary border-white hover:bg-white/90">
                  Apply Now
                </Button>
              </Link>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-[24px] p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">500+</p>
                    <p className="text-primary-foreground/80">Active Vendors</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">10,000+</p>
                    <p className="text-primary-foreground/80">Referrals Generated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2">TESTIMONIALS</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What Our Students Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Rahul Sharma', role: 'JEE Student', text: 'The courses are excellent and the teachers are very supportive. I cleared JEE Advanced with a great rank!' },
              { name: 'Priya Patel', role: 'NEET Student', text: 'Siksha Kendra helped me achieve my dream of becoming a doctor. The study material and tests were top-notch.' },
              { name: 'Amit Kumar', role: 'CBSE Student', text: 'I improved my grades significantly with the help of amazing teachers and comprehensive content.' }
            ].map((testimonial, idx) => (
              <Card key={idx}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-foreground mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'How do I enroll in a course?', a: 'You can enroll through our website or use a referral link from a vendor partner.' },
              { q: 'What is the refund policy?', a: 'We offer a 7-day money-back guarantee if you are not satisfied with the course.' },
              { q: 'Are the classes live or recorded?', a: 'We offer both live interactive classes and recorded video lectures for flexibility.' },
              { q: 'How can I become a vendor?', a: 'Click on "Become a Vendor" button and fill out the application form. Our team will review and approve it.' }
            ].map((faq, idx) => (
              <Card key={idx}>
                <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-light to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of students who are achieving their academic goals with Siksha Kendra.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/courses">
              <Button size="lg">Browse Courses</Button>
            </Link>
            <Link to="/become-vendor">
              <Button size="lg" variant="outline">Become a Partner</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
