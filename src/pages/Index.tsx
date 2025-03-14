
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { ArrowRight, Mail, Target, TrendingUp, CheckCircle, PieChart, ShieldCheck } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-blue-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-reachout-darkgray leading-tight mb-6">
                Automate your outreach to recruiters
              </h1>
              <p className="text-xl text-reachout-darkgray/80 mb-8">
                Land more interviews by sending personalized cold emails to recruiters in finance, tech, and IT services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button className="w-full sm:w-auto bg-reachout-blue hover:bg-reachout-darkblue text-lg px-8 py-6">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" className="w-full sm:w-auto border-reachout-blue text-reachout-blue hover:bg-reachout-blue/10 text-lg px-8 py-6">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white rounded-lg shadow-xl p-6 border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="ReachOut Dashboard Preview" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-48 h-48 bg-reachout-purple/10 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-reachout-blue/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-reachout-darkgray mb-4">How It Works</h2>
            <p className="text-xl text-reachout-darkgray/70 max-w-3xl mx-auto">
              ReachOut streamlines your job search by automating the most time-consuming step: cold emailing recruiters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 relative">
              <div className="w-12 h-12 flex items-center justify-center bg-reachout-blue/10 text-reachout-blue rounded-full mb-6">
                <Target className="h-6 w-6" />
              </div>
              <div className="absolute top-8 right-8 text-4xl font-bold text-reachout-blue/10">1</div>
              <h3 className="text-xl font-semibold mb-4">Set Up Your Profile</h3>
              <p className="text-reachout-darkgray/70">
                Create your professional profile with your job preferences, experience, and technical skills.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 relative">
              <div className="w-12 h-12 flex items-center justify-center bg-reachout-green/10 text-reachout-green rounded-full mb-6">
                <Mail className="h-6 w-6" />
              </div>
              <div className="absolute top-8 right-8 text-4xl font-bold text-reachout-green/10">2</div>
              <h3 className="text-xl font-semibold mb-4">Personalize Templates</h3>
              <p className="text-reachout-darkgray/70">
                Choose from proven email templates or create your own personalized messages to stand out.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 relative">
              <div className="w-12 h-12 flex items-center justify-center bg-reachout-purple/10 text-reachout-purple rounded-full mb-6">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="absolute top-8 right-8 text-4xl font-bold text-reachout-purple/10">3</div>
              <h3 className="text-xl font-semibold mb-4">Start Campaigns</h3>
              <p className="text-reachout-darkgray/70">
                Launch targeted campaigns to recruiters in your industry and track your results in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-reachout-lightgray">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-reachout-darkgray mb-4">Key Features</h2>
            <p className="text-xl text-reachout-darkgray/70 max-w-3xl mx-auto">
              Everything you need to streamline your job search and connect with recruiters effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4">
              <div className="text-reachout-blue">
                <CheckCircle className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Personalized Email Templates</h3>
                <p className="text-reachout-darkgray/70">
                  Choose from a gallery of proven templates or create your own. Personalize with dynamic fields for each recipient.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4">
              <div className="text-reachout-green">
                <Mail className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Email Integration</h3>
                <p className="text-reachout-darkgray/70">
                  Connect with Gmail or Outlook to send emails directly from your account, maintaining your professional identity.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4">
              <div className="text-reachout-purple">
                <Target className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Industry-Specific Targeting</h3>
                <p className="text-reachout-darkgray/70">
                  Specialized templates and targeting for Finance, Tech, and IT Services industries to maximize response rates.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4">
              <div className="text-reachout-blue">
                <PieChart className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-reachout-darkgray/70">
                  Track open rates, responses, and campaign performance with detailed analytics to optimize your approach.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4">
              <div className="text-reachout-green">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Privacy & Security</h3>
                <p className="text-reachout-darkgray/70">
                  Your data and communications are encrypted and secure. We never share your information with third parties.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex gap-4">
              <div className="text-reachout-purple">
                <TrendingUp className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p className="text-reachout-darkgray/70">
                  Monitor your job search progress with visual dashboards showing your outreach efforts and results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-reachout-darkgray mb-4">Success Stories</h2>
            <p className="text-xl text-reachout-darkgray/70 max-w-3xl mx-auto">
              See how job seekers like you have accelerated their careers with ReachOut.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-yellow-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              </div>
              <p className="italic text-reachout-darkgray/80 mb-6">
                "ReachOut helped me land interviews at 3 top fintech companies in just 2 weeks. The personalized templates made all the difference!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Sarah J." />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah J.</h4>
                  <p className="text-sm text-reachout-darkgray/60">Financial Analyst</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-yellow-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              </div>
              <p className="italic text-reachout-darkgray/80 mb-6">
                "As a software developer, I was struggling to stand out. ReachOut's tech-focused templates got me responses from 40% of the recruiters I reached out to!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael T." />
                </div>
                <div>
                  <h4 className="font-semibold">Michael T.</h4>
                  <p className="text-sm text-reachout-darkgray/60">Full Stack Developer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-yellow-400">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              </div>
              <p className="italic text-reachout-darkgray/80 mb-6">
                "ReachOut saved me countless hours of manually emailing recruiters. I secured a new IT management position with a 30% salary increase!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Jennifer R." />
                </div>
                <div>
                  <h4 className="font-semibold">Jennifer R.</h4>
                  <p className="text-sm text-reachout-darkgray/60">IT Project Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-reachout-lightgray">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-reachout-darkgray mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-reachout-darkgray/70 max-w-3xl mx-auto">
              Get answers to common questions about ReachOut.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">How does ReachOut send emails?</h3>
              <p className="text-reachout-darkgray/70">
                ReachOut connects to your existing email account (Gmail or Outlook) through secure OAuth. 
                Emails are sent directly from your account, maintaining your professional identity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Is my data secure?</h3>
              <p className="text-reachout-darkgray/70">
                Yes, we take security seriously. Your data is encrypted and securely stored. 
                We never share your information with third parties or send emails without your permission.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Can I customize email templates?</h3>
              <p className="text-reachout-darkgray/70">
                Absolutely! We provide professionally crafted templates as starting points, 
                but you can customize them or create your own from scratch to match your personal style.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">How many emails can I send?</h3>
              <p className="text-reachout-darkgray/70">
                Your email provider's daily sending limits apply. We help you optimize your sending strategy 
                to maintain high deliverability while respecting these limits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Do you provide recruiter contacts?</h3>
              <p className="text-reachout-darkgray/70">
                We provide guidance on finding relevant recruiters, but you'll need to input the contacts. 
                This ensures your outreach is targeted and compliant with privacy regulations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-xl font-semibold mb-3">Which industries do you support?</h3>
              <p className="text-reachout-darkgray/70">
                ReachOut is specialized for job seekers in Finance, Technology, and IT Services, 
                with industry-specific templates and targeting strategies for each sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-reachout-blue to-reachout-darkblue text-white">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to supercharge your job search?</h2>
            <p className="text-xl mb-8 text-white/80">
              Join thousands of professionals who are landing more interviews with personalized outreach.
            </p>
            <Link to="/signup">
              <Button className="bg-white text-reachout-blue hover:bg-white/90 hover:text-reachout-darkblue text-lg px-8 py-6">
                Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="mt-4 text-white/70">No credit card required. 14-day free trial.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
