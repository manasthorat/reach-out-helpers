
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Mail, Database, Search, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  return (
    <Layout>
      <div className="py-16 bg-gradient-to-b from-white to-reachout-lightgray">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-reachout-darkgray mb-4">How ReachOut Works</h1>
            <p className="text-xl text-reachout-darkgray/70 max-w-3xl mx-auto">
              We help you connect with the right recruiters who are actively looking for talent like you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
              <div className="rounded-full bg-reachout-blue/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-reachout-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. We Find Recruiters</h3>
              <p className="text-reachout-darkgray/70">
                We gather email addresses of recruiters and agencies from the internet who are actively looking for talent in your field.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
              <div className="rounded-full bg-reachout-green/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Database className="h-8 w-8 text-reachout-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. You Complete Profile</h3>
              <p className="text-reachout-darkgray/70">
                Tell us about your experience, skills, and the type of role you're looking for so we can match you with the right recruiters.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
              <div className="rounded-full bg-reachout-purple/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-reachout-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. We Send Emails</h3>
              <p className="text-reachout-darkgray/70">
                Using personalized templates, we send professional outreach emails to recruiters who specialize in your industry and role.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
              <div className="rounded-full bg-reachout-blue/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-reachout-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">4. You Get Interviews</h3>
              <p className="text-reachout-darkgray/70">
                Recruiters respond directly to you. We track everything in your dashboard so you can manage all your opportunities.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">Why Our Approach Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-reachout-green">✓</span> Targeted Outreach
                </h3>
                <p className="text-reachout-darkgray/70 mb-4">
                  Instead of applying to hundreds of job postings, we connect you directly with recruiters who are actively seeking candidates with your specific skills and experience.
                </p>

                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-reachout-green">✓</span> Verified Contacts
                </h3>
                <p className="text-reachout-darkgray/70">
                  We verify each recruiter's email and ensure they are currently active in your industry, saving you from sending emails that never get read.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-reachout-green">✓</span> Professional Templates
                </h3>
                <p className="text-reachout-darkgray/70 mb-4">
                  Our email templates are crafted by industry experts who understand what catches a recruiter's attention and gets responses.
                </p>

                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <span className="text-reachout-green">✓</span> Tracking & Analytics
                </h3>
                <p className="text-reachout-darkgray/70">
                  See which emails are getting responses and optimize your approach based on real data, not guesswork.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to Start Getting Interviews?</h2>
            <Link to="/signup">
              <Button size="lg" className="bg-reachout-blue hover:bg-reachout-darkblue">
                Create Your Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
