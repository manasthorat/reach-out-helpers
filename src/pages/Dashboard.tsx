
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Users, Target, TrendingUp, ChevronRight, Plus, Edit, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-reachout-darkgray">Dashboard</h1>
            <p className="text-reachout-darkgray/70">Welcome back, John Doe</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button className="bg-reachout-blue hover:bg-reachout-darkblue flex items-center gap-2">
              <Plus size={16} /> New Campaign
            </Button>
            <Button variant="outline" className="border-reachout-blue text-reachout-blue hover:bg-reachout-blue/10 flex items-center gap-2">
              <Edit size={16} /> Create Template
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-reachout-darkgray/80 font-medium">Total Emails Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-reachout-darkgray">124</div>
                <div className="p-2 bg-reachout-blue/10 text-reachout-blue rounded-full">
                  <Mail size={20} />
                </div>
              </div>
              <div className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp size={16} className="mr-1" /> 12% increase this week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-reachout-darkgray/80 font-medium">Response Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-reachout-darkgray">32%</div>
                <div className="p-2 bg-reachout-green/10 text-reachout-green rounded-full">
                  <BarChart size={20} />
                </div>
              </div>
              <div className="text-sm text-green-600 mt-2 flex items-center">
                <TrendingUp size={16} className="mr-1" /> 5% higher than average
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-reachout-darkgray/80 font-medium">Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-reachout-darkgray">3</div>
                <div className="p-2 bg-reachout-purple/10 text-reachout-purple rounded-full">
                  <Target size={20} />
                </div>
              </div>
              <div className="text-sm text-reachout-purple mt-2">
                2 scheduled for this week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-reachout-darkgray/80 font-medium">Recruiter Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-reachout-darkgray">78</div>
                <div className="p-2 bg-reachout-blue/10 text-reachout-blue rounded-full">
                  <Users size={20} />
                </div>
              </div>
              <div className="text-sm text-reachout-blue mt-2">
                In your network
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity and Tips */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest outreach activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { 
                      date: "Today, 10:45 AM", 
                      title: "Email sent to Sarah Johnson", 
                      description: "Using 'Senior Developer Introduction' template", 
                      icon: <Mail size={16} className="text-reachout-blue" /> 
                    },
                    { 
                      date: "Yesterday, 3:22 PM", 
                      title: "Email sent to Michael Chen", 
                      description: "Using 'Finance Professional Introduction' template", 
                      icon: <Mail size={16} className="text-reachout-blue" /> 
                    },
                    { 
                      date: "Yesterday, 2:15 PM", 
                      title: "New campaign created", 
                      description: "Tech Recruiter Outreach - 15 recipients", 
                      icon: <Target size={16} className="text-reachout-purple" /> 
                    },
                    { 
                      date: "Mar 15, 5:30 PM", 
                      title: "Template updated", 
                      description: "Edited 'IT Project Manager Introduction'", 
                      icon: <Edit size={16} className="text-reachout-green" /> 
                    },
                    { 
                      date: "Mar 15, 1:45 PM", 
                      title: "Email sent to Jessica Roberts", 
                      description: "Using 'IT Services Introduction' template", 
                      icon: <Mail size={16} className="text-reachout-blue" /> 
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start p-3 rounded-md hover:bg-gray-50">
                      <div className="mr-4 mt-1">
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-reachout-darkgray">{activity.title}</h4>
                          <span className="text-xs text-reachout-darkgray/60">{activity.date}</span>
                        </div>
                        <p className="text-sm text-reachout-darkgray/70">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="ghost" className="text-reachout-blue hover:text-reachout-blue hover:bg-reachout-blue/10">
                    View All Activity <ChevronRight size={16} className="ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Tips & Guidance</CardTitle>
                <CardDescription>Improve your outreach effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-reachout-blue mb-2">Personalize Your Subject Line</h4>
                    <p className="text-sm text-reachout-darkgray/80">
                      Emails with personalized subject lines have 26% higher open rates. Include the company name or a specific role reference.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <h4 className="font-medium text-green-700 mb-2">Follow Up After 3-5 Days</h4>
                    <p className="text-sm text-reachout-darkgray/80">
                      70% of responses come from follow-up emails. Schedule a polite follow-up if you don't hear back.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <h4 className="font-medium text-reachout-purple mb-2">Keep Emails Concise</h4>
                    <p className="text-sm text-reachout-darkgray/80">
                      Recruiters spend just 6 seconds scanning an email. Keep your message under 150 words for best results.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Link to="/resources">
                    <Button variant="ghost" className="w-full text-reachout-blue hover:text-reachout-blue hover:bg-reachout-blue/10">
                      View All Tips <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
