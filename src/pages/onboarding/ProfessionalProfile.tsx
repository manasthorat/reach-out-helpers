
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import { Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const professionalProfileSchema = z.object({
  jobTitle: z.string().min(2, { message: "Job title is required" }),
  experience: z.string().min(1, { message: "Experience is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
  location: z.string().min(2, { message: "Location is required" }),
  salaryMin: z.string().min(1, { message: "Minimum salary is required" }),
  salaryMax: z.string().min(1, { message: "Maximum salary is required" }),
  noticePeriod: z.string().min(1, { message: "Notice period is required" }),
});

type ProfessionalProfileData = z.infer<typeof professionalProfileSchema>;

const ProfessionalProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<ProfessionalProfileData>>({
    jobTitle: '',
    experience: '',
    industry: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    noticePeriod: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUserId(data.session.user.id);
      } else {
        navigate('/login');
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user makes a selection
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = professionalProfileSchema.parse(formData);
      
      if (!userId) {
        throw new Error("User not authenticated");
      }
      
      // Save professional profile data to localStorage for now
      // In a real app, you would save this to a database
      localStorage.setItem('professionalProfile', JSON.stringify(validatedData));
      localStorage.setItem('onboardingStep', '2');
      
      // Show success toast
      toast({
        title: "Profile saved!",
        description: "Let's continue with your resume upload.",
        duration: 5000,
      });
      
      // Navigate to the resume upload page (Step 3)
      navigate('/profile-settings');
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const errors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        setFormErrors(errors);
      } else {
        // Handle other errors
        toast({
          title: "Error saving profile",
          description: "Please try again later.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Account', completed: true },
    { number: 2, title: 'Profile', completed: false },
    { number: 3, title: 'Resume', completed: false },
    { number: 4, title: 'Campaign', completed: false }
  ];

  return (
    <Layout>
      <div className="container-custom py-12 md:py-20 max-w-xl">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-reachout-darkgray">Professional Profile</h1>
            <p className="text-reachout-darkgray/70 mt-2">Step 2 of 4: Tell us about your professional background</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-4">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-reachout-blue text-white' : 
                    step.number === 2 ? 'bg-reachout-blue text-white' : 
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {step.completed ? <Check size={16} /> : step.number}
                  </div>
                  <div className={`text-xs mt-1 ${
                    step.number === 2 ? 'text-reachout-blue font-medium' : 
                    step.number < 2 ? 'text-reachout-darkgray' : 
                    'text-gray-400'
                  }`}>
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Current/Most Recent Job Title</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                placeholder="e.g. Senior Software Engineer"
                value={formData.jobTitle || ''}
                onChange={handleChange}
                className={formErrors.jobTitle ? "border-red-500" : ""}
              />
              {formErrors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">{formErrors.jobTitle}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Select
                onValueChange={(value) => handleSelectChange('experience', value)}
                defaultValue={formData.experience}
              >
                <SelectTrigger className={formErrors.experience ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select years of experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">Less than 1 year</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5-10">5-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.experience && (
                <p className="text-red-500 text-sm mt-1">{formErrors.experience}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => handleSelectChange('industry', value)}
                defaultValue={formData.industry}
              >
                <SelectTrigger className={formErrors.industry ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="it-services">IT Services</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.industry && (
                <p className="text-red-500 text-sm mt-1">{formErrors.industry}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. New York, NY (or Remote)"
                value={formData.location || ''}
                onChange={handleChange}
                className={formErrors.location ? "border-red-500" : ""}
              />
              {formErrors.location && (
                <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salaryMin">Minimum Salary ($)</Label>
                <Input
                  id="salaryMin"
                  name="salaryMin"
                  type="text"
                  placeholder="e.g. 80000"
                  value={formData.salaryMin || ''}
                  onChange={handleChange}
                  className={formErrors.salaryMin ? "border-red-500" : ""}
                />
                {formErrors.salaryMin && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.salaryMin}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryMax">Maximum Salary ($)</Label>
                <Input
                  id="salaryMax"
                  name="salaryMax"
                  type="text"
                  placeholder="e.g. 120000"
                  value={formData.salaryMax || ''}
                  onChange={handleChange}
                  className={formErrors.salaryMax ? "border-red-500" : ""}
                />
                {formErrors.salaryMax && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.salaryMax}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="noticePeriod">Notice Period</Label>
              <Select
                onValueChange={(value) => handleSelectChange('noticePeriod', value)}
                defaultValue={formData.noticePeriod}
              >
                <SelectTrigger className={formErrors.noticePeriod ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select notice period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="1-week">1 Week</SelectItem>
                  <SelectItem value="2-weeks">2 Weeks</SelectItem>
                  <SelectItem value="1-month">1 Month</SelectItem>
                  <SelectItem value="more-than-1-month">More than 1 Month</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.noticePeriod && (
                <p className="text-red-500 text-sm mt-1">{formErrors.noticePeriod}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/signup')}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-reachout-blue hover:bg-reachout-darkblue" 
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Continue"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalProfile;
