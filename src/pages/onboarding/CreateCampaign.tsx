
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

const CreateCampaign = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    campaignName: '',
    industry: '',
    targetCompanies: '',
    position: '',
    messageTemplate: ''
  });
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUserId(data.session.user.id);
      } else {
        navigate('/login');
      }
    };
    
    // Check onboarding step
    const onboardingStep = localStorage.getItem('onboardingStep');
    if (onboardingStep !== '3') {
      navigate('/onboarding/resume');
    }
    
    checkSession();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, you would save the campaign data to the database here
      
      // Mark onboarding as complete
      localStorage.setItem('onboardingStep', '4');
      localStorage.setItem('onboardingComplete', 'true');
      
      // Show success toast
      toast({
        title: "Campaign created!",
        description: "Your onboarding is complete. Welcome to ReachOut!",
        duration: 5000,
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error creating campaign",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Account', completed: true },
    { number: 2, title: 'Profile', completed: true },
    { number: 3, title: 'Resume', completed: true },
    { number: 4, title: 'Campaign', completed: false }
  ];

  return (
    <Layout>
      <div className="container-custom py-12 md:py-20 max-w-xl">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-reachout-darkgray">Create Your First Campaign</h1>
            <p className="text-reachout-darkgray/70 mt-2">Step 4 of 4: Set up your first outreach campaign</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-4">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-reachout-blue text-white' : 
                    step.number === 4 ? 'bg-reachout-blue text-white' : 
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {step.completed ? <Check size={16} /> : step.number}
                  </div>
                  <div className={`text-xs mt-1 ${
                    step.number === 4 ? 'text-reachout-blue font-medium' : 
                    step.number < 4 ? 'text-reachout-darkgray' : 
                    'text-gray-400'
                  }`}>
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
                <CardDescription>Tell us about your job search campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaignName">Campaign Name</Label>
                  <Input
                    id="campaignName"
                    name="campaignName"
                    placeholder="e.g. Senior Developer Search"
                    value={formData.campaignName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Target Industry</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange('industry', value)}
                    defaultValue={formData.industry}
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select target industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="targetCompanies">Target Companies (comma separated)</Label>
                  <Input
                    id="targetCompanies"
                    name="targetCompanies"
                    placeholder="e.g. Google, Microsoft, Amazon"
                    value={formData.targetCompanies}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Target Position</Label>
                  <Input
                    id="position"
                    name="position"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="messageTemplate">Initial Message Template</Label>
                  <Textarea
                    id="messageTemplate"
                    name="messageTemplate"
                    placeholder="Hello [Name], I noticed you're hiring for [Position] at [Company]. I'd love to learn more about this opportunity..."
                    value={formData.messageTemplate}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/onboarding/resume')}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="bg-reachout-blue hover:bg-reachout-darkblue" 
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Complete Setup"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCampaign;
