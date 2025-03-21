import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Edit, Plus, ChevronRight, Trash2, Play, Pause, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatisticsSection from '@/components/dashboard/StatisticsSection';
import EmailFilters from '@/components/dashboard/EmailFilters';
import EmailTable from '@/components/dashboard/EmailTable';
import { mockEmails, getStatusClass } from '@/data/mockEmailData';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface Campaign {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  status: 'active' | 'paused' | 'draft';
  emailsSent: number;
  totalEmails: number;
  subject?: string;
  body?: string;
  dailyLimit?: number;
  startDate?: Date;
  endDate?: Date;
}

const onboardingSteps = [
  {
    id: 1,
    title: "Create your profile",
    description: "Complete your professional profile to help us personalize your outreach",
    completed: true,
    link: "/profile-settings"
  },
  {
    id: 2,
    title: "Upload your resume",
    description: "Upload your resume to help us understand your experience",
    completed: false,
    link: "/profile-settings"
  },
  {
    id: 3,
    title: "Create a campaign",
    description: "Set up your first outreach campaign",
    completed: false,
    link: "#new-campaign"
  },
  {
    id: 4,
    title: "Start sending emails",
    description: "Begin reaching out to potential employers",
    completed: false,
    link: "#"
  }
];

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    name: "Tech Startups in NYC",
    description: "Targeting early-stage startups in New York city for senior developer roles",
    createdAt: new Date(2023, 6, 15),
    status: 'active',
    emailsSent: 24,
    totalEmails: 50,
    subject: "Senior Developer Position - Experienced Full Stack Engineer",
    body: "Dear Hiring Manager,\n\nI'm writing to express my interest in the Senior Developer position at your company...",
    dailyLimit: 5,
    startDate: new Date(2023, 6, 15),
    endDate: new Date(2023, 8, 15)
  },
  {
    id: 2,
    name: "Remote Opportunities",
    description: "Focusing on fully-remote opportunities in software development",
    createdAt: new Date(2023, 7, 3),
    status: 'paused',
    emailsSent: 12,
    totalEmails: 40,
    subject: "Remote Senior Developer - 8+ Years of Experience",
    body: "Hello,\n\nI'm an experienced developer looking for remote opportunities...",
    dailyLimit: 4,
    startDate: new Date(2023, 7, 3),
    endDate: new Date(2023, 9, 3)
  }
];

const Dashboard = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [isNewCampaignOpen, setIsNewCampaignOpen] = useState(false);
  const [campaignBeingEdited, setCampaignBeingEdited] = useState<Campaign | null>(null);
  const [steps, setSteps] = useState(onboardingSteps);
  const [hideOnboarding, setHideOnboarding] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    totalEmails: 0,
    subject: '',
    body: '',
    dailyLimit: 5,
    startDate: format(new Date(), 'yyyy-MM-dd'),
    endDate: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), 'yyyy-MM-dd')
  });

  useEffect(() => {
    const shouldOpenWithTemplate = localStorage.getItem('openCampaignWithTemplate');
    if (shouldOpenWithTemplate === 'true') {
      const templateData = localStorage.getItem('campaignTemplate');
      if (templateData) {
        try {
          const template = JSON.parse(templateData);
          setNewCampaign({
            ...newCampaign,
            name: `Campaign based on ${template.name}`,
            description: template.description,
            subject: template.subject,
            body: template.body
          });
          setIsNewCampaignOpen(true);
          localStorage.removeItem('openCampaignWithTemplate');
          localStorage.removeItem('campaignTemplate');
        } catch (e) {
          console.error("Error parsing template data", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    const allCompleted = steps.every(step => step.completed);
    if (allCompleted) {
      setHideOnboarding(true);
    }
  }, [steps]);

  const filteredEmails = mockEmails.filter((email) => {
    const matchesSearch = email.recipient.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         email.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const emailDate = new Date(email.date);
    const matchesDateFrom = !dateFrom || emailDate >= dateFrom;
    const matchesDateTo = !dateTo || emailDate <= dateTo;
    const matchesStatus = !statusFilter || email.status === statusFilter;
    
    return matchesSearch && matchesDateFrom && matchesDateTo && matchesStatus;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setDateFrom(undefined);
    setDateTo(undefined);
    setStatusFilter(null);
  };

  const totalEmails = mockEmails.length;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const totalEmailsToday = mockEmails.filter(e => {
    const emailDate = new Date(e.date);
    return emailDate >= today;
  }).length;

  const getDailyEmailData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const count = mockEmails.filter(e => {
        const emailDate = new Date(e.date);
        return emailDate >= date && emailDate < nextDay;
      }).length;
      
      data.push({
        name: format(date, 'MMM d'),
        emails: count
      });
    }
    
    return data;
  };

  const dailyEmailData = getDailyEmailData();

  const handleAddCampaign = () => {
    if (!newCampaign.name.trim() || !newCampaign.subject.trim() || !newCampaign.body.trim()) {
      toast({
        title: "Error",
        description: "Campaign name, subject, and body are required",
        variant: "destructive"
      });
      return;
    }

    if (campaignBeingEdited) {
      setCampaigns(campaigns.map(c => 
        c.id === campaignBeingEdited.id 
          ? {
              ...c, 
              name: newCampaign.name, 
              description: newCampaign.description,
              subject: newCampaign.subject,
              body: newCampaign.body,
              dailyLimit: parseInt(newCampaign.dailyLimit.toString()),
              startDate: new Date(newCampaign.startDate),
              endDate: new Date(newCampaign.endDate)
            } 
          : c
      ));
      toast({
        title: "Success",
        description: "Campaign updated successfully"
      });
    } else {
      const newId = Math.max(0, ...campaigns.map(c => c.id)) + 1;
      setCampaigns([...campaigns, {
        id: newId,
        name: newCampaign.name,
        description: newCampaign.description,
        createdAt: new Date(),
        status: 'draft',
        emailsSent: 0,
        totalEmails: newCampaign.totalEmails || 30,
        subject: newCampaign.subject,
        body: newCampaign.body,
        dailyLimit: parseInt(newCampaign.dailyLimit.toString()),
        startDate: new Date(newCampaign.startDate),
        endDate: new Date(newCampaign.endDate)
      }]);

      setSteps(steps.map(step => 
        step.id === 3 ? {...step, completed: true} : step
      ));

      toast({
        title: "Success",
        description: "New campaign created"
      });
    }

    setNewCampaign({
      name: '',
      description: '',
      totalEmails: 0,
      subject: '',
      body: '',
      dailyLimit: 5,
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), 'yyyy-MM-dd')
    });
    setCampaignBeingEdited(null);
    setIsNewCampaignOpen(false);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setCampaignBeingEdited(campaign);
    setNewCampaign({
      name: campaign.name,
      description: campaign.description,
      totalEmails: campaign.totalEmails,
      subject: campaign.subject || '',
      body: campaign.body || '',
      dailyLimit: campaign.dailyLimit || 5,
      startDate: format(campaign.startDate || new Date(), 'yyyy-MM-dd'),
      endDate: format(campaign.endDate || new Date(new Date().setMonth(new Date().getMonth() + 1)), 'yyyy-MM-dd')
    });
    setIsNewCampaignOpen(true);
  };

  const handleDeleteCampaign = (id: number) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    toast({
      title: "Success",
      description: "Campaign deleted"
    });
  };

  const handleToggleCampaignStatus = (id: number) => {
    setCampaigns(campaigns.map(c => {
      if (c.id === id) {
        const newStatus = c.status === 'active' ? 'paused' : 'active';
        
        if (newStatus === 'active') {
          setSteps(steps.map(step => 
            step.id === 4 ? {...step, completed: true} : step
          ));
        }
        
        return {...c, status: newStatus};
      }
      return c;
    }));

    const campaign = campaigns.find(c => c.id === id);
    if (campaign) {
      toast({
        title: "Success",
        description: `Campaign ${campaign.status === 'active' ? 'paused' : 'activated'}`
      });
    }
  };

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const markResumeUploaded = () => {
    const resumeUploaded = localStorage.getItem('resumeUploaded');
    if (resumeUploaded === 'true') {
      setSteps(steps.map(step => 
        step.id === 2 ? {...step, completed: true} : step
      ));
    }
  };

  useEffect(() => {
    markResumeUploaded();
  }, []);

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-reachout-darkgray">Dashboard</h1>
            <p className="text-reachout-darkgray/70">Welcome back, John Doe</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link to="/profile-settings">
              <Button variant="outline" className="border-reachout-blue text-reachout-blue hover:bg-reachout-blue/10 flex items-center gap-2">
                <Edit size={16} /> Update Profile
              </Button>
            </Link>
            <Dialog open={isNewCampaignOpen} onOpenChange={setIsNewCampaignOpen}>
              <DialogTrigger asChild>
                <Button className="bg-reachout-blue hover:bg-reachout-darkblue flex items-center gap-2">
                  <Plus size={16} /> New Campaign
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{campaignBeingEdited ? 'Edit Campaign' : 'Create New Campaign'}</DialogTitle>
                  <DialogDescription>
                    {campaignBeingEdited 
                      ? 'Update your campaign details below' 
                      : 'Fill in the details to create a new outreach campaign'}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4 max-h-[80vh] overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="campaign-name">Campaign Name</Label>
                      <Input 
                        id="campaign-name" 
                        value={newCampaign.name} 
                        onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                        placeholder="e.g., Tech Startups in NYC" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="total-emails">Total Emails to Send</Label>
                      <Input 
                        id="total-emails" 
                        type="number" 
                        value={newCampaign.totalEmails || ''} 
                        onChange={(e) => setNewCampaign({...newCampaign, totalEmails: parseInt(e.target.value) || 0})}
                        placeholder="e.g., 50" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="daily-limit">Daily Email Limit</Label>
                      <Input 
                        id="daily-limit" 
                        type="number" 
                        value={newCampaign.dailyLimit || ''} 
                        onChange={(e) => setNewCampaign({...newCampaign, dailyLimit: parseInt(e.target.value) || 0})}
                        placeholder="e.g., 5" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input 
                        id="start-date" 
                        type="date" 
                        value={newCampaign.startDate} 
                        onChange={(e) => setNewCampaign({...newCampaign, startDate: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input 
                        id="end-date" 
                        type="date" 
                        value={newCampaign.endDate} 
                        onChange={(e) => setNewCampaign({...newCampaign, endDate: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="campaign-description">Campaign Description</Label>
                    <Textarea 
                      id="campaign-description" 
                      value={newCampaign.description} 
                      onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
                      placeholder="Describe your campaign target and goals" 
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-subject">Email Subject</Label>
                    <Input 
                      id="email-subject" 
                      value={newCampaign.subject} 
                      onChange={(e) => setNewCampaign({...newCampaign, subject: e.target.value})}
                      placeholder="e.g., Senior Developer Position - Experienced Full Stack Engineer" 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-body">Email Body</Label>
                    <Textarea 
                      id="email-body" 
                      value={newCampaign.body} 
                      onChange={(e) => setNewCampaign({...newCampaign, body: e.target.value})}
                      placeholder="Write your email content here..." 
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="text-sm text-gray-500">
                    <p>Use placeholders like [Position], [Company Name], etc. to personalize your emails.</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {
                    setIsNewCampaignOpen(false);
                    setCampaignBeingEdited(null);
                    setNewCampaign({
                      name: '',
                      description: '',
                      totalEmails: 0,
                      subject: '',
                      body: '',
                      dailyLimit: 5,
                      startDate: format(new Date(), 'yyyy-MM-dd'),
                      endDate: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), 'yyyy-MM-dd')
                    });
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCampaign}>
                    {campaignBeingEdited ? 'Save Changes' : 'Create Campaign'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {!hideOnboarding && (
          <Card className="mb-8 border-reachout-blue/20">
            <CardHeader className="pb-4">
              <CardTitle>Get Started with ReachOut</CardTitle>
              <CardDescription>Complete these 4 steps to start reaching out to potential employers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div 
                  className="h-full bg-reachout-blue transition-all" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {steps.map((step) => (
                  <Card key={step.id} className={`border ${step.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                    <CardHeader className="pb-2 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-reachout-blue/10 text-reachout-blue">
                          {step.completed ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : step.id}
                        </div>
                        <span className="text-xs font-medium text-gray-500">Step {step.id}/4</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-sm text-gray-500">{step.description}</p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Link 
                        to={step.link}
                        className={`text-sm font-medium ${step.completed ? 'text-green-600' : 'text-reachout-blue'} hover:underline`}
                        onClick={(e) => {
                          if (step.link === '#new-campaign') {
                            e.preventDefault();
                            setIsNewCampaignOpen(true);
                          }
                        }}
                      >
                        {step.completed ? 'Completed' : 'Get Started'} <ChevronRight className="ml-1 inline-block h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <StatisticsSection
          totalEmails={totalEmails}
          totalEmailsToday={totalEmailsToday}
          dailyEmailData={dailyEmailData}
        />

        <Card className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Campaigns</CardTitle>
              <CardDescription>Manage your outreach campaigns</CardDescription>
            </div>
            <div className="flex gap-2">
              <Link to="/templates">
                <Button 
                  variant="outline"
                  className="border-reachout-blue text-reachout-blue hover:bg-reachout-blue/10"
                >
                  Browse Templates
                </Button>
              </Link>
              <Button 
                onClick={() => {
                  setIsNewCampaignOpen(true);
                  setCampaignBeingEdited(null);
                  setNewCampaign({
                    name: '',
                    description: '',
                    totalEmails: 0,
                    subject: '',
                    body: '',
                    dailyLimit: 5,
                    startDate: format(new Date(), 'yyyy-MM-dd'),
                    endDate: format(new Date(new Date().setMonth(new Date().getMonth() + 1)), 'yyyy-MM-dd')
                  });
                }}
                className="bg-reachout-blue hover:bg-reachout-darkblue"
              >
                <Plus size={16} className="mr-2" /> New Campaign
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {campaigns.length > 0 ? (
              <div className="grid gap-4">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="p-4 sm:p-6 flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{campaign.name}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            campaign.status === 'active' ? 'bg-green-100 text-green-800' : 
                            campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{campaign.description}</p>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                          <span>Created: {format(campaign.createdAt, 'MMM d, yyyy')}</span>
                          <span>Progress: {campaign.emailsSent}/{campaign.totalEmails} emails sent</span>
                          {campaign.dailyLimit && <span>Daily limit: {campaign.dailyLimit} emails</span>}
                          {campaign.startDate && campaign.endDate && (
                            <span>Schedule: {format(campaign.startDate, 'MMM d')} - {format(campaign.endDate, 'MMM d, yyyy')}</span>
                          )}
                        </div>
                        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                          <div 
                            className="h-full bg-reachout-blue transition-all" 
                            style={{ width: `${(campaign.emailsSent / campaign.totalEmails) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex sm:flex-col justify-between items-center p-4 sm:p-0 sm:border-l border-t sm:border-t-0">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          onClick={() => handleEditCampaign(campaign)}
                        >
                          <Edit size={16} className="mr-1" /> Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={campaign.status === 'active' 
                            ? "text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50" 
                            : "text-green-600 hover:text-green-800 hover:bg-green-50"}
                          onClick={() => handleToggleCampaignStatus(campaign.id)}
                        >
                          {campaign.status === 'active' 
                            ? <><Pause size={16} className="mr-1" /> Pause</> 
                            : <><Play size={16} className="mr-1" /> Start</>}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          onClick={() => handleDeleteCampaign(campaign.id)}
                        >
                          <Trash2 size={16} className="mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No campaigns yet. Create your first campaign to start reaching out.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Email History</CardTitle>
            <CardDescription>View and filter all your sent emails</CardDescription>
          </CardHeader>
          <CardContent>
            <EmailFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              dateFrom={dateFrom}
              setDateFrom={setDateFrom}
              dateTo={dateTo}
              setDateTo={setDateTo}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              clearFilters={clearFilters}
            />
            <EmailTable
              filteredEmails={filteredEmails}
              totalEmails={totalEmails}
              getStatusClass={getStatusClass}
            />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
