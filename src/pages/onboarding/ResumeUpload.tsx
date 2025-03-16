
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, X, File, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ResumeUpload = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
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
    if (onboardingStep !== '2') {
      navigate('/onboarding/profile');
    }
    
    checkSession();
  }, [navigate]);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      // Check if file is PDF or DOCX
      if (file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or DOCX file",
          variant: "destructive"
        });
      }
    }
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (resumeFile) {
        // In a real app, you would upload the file to Supabase storage here
        
        // Update localStorage to mark resume as uploaded
        localStorage.setItem('resumeUploaded', 'true');
        localStorage.setItem('onboardingStep', '3');
        
        // Show success toast
        toast({
          title: "Resume uploaded!",
          description: "Let's continue with creating your first campaign.",
          duration: 5000,
        });
        
        // Navigate to campaign creation (Step 4)
        navigate('/onboarding/campaign');
      } else {
        toast({
          title: "No resume selected",
          description: "Please upload your resume before continuing.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
    } catch (error) {
      toast({
        title: "Error uploading resume",
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
    { number: 3, title: 'Resume', completed: false },
    { number: 4, title: 'Campaign', completed: false }
  ];

  return (
    <Layout>
      <div className="container-custom py-12 md:py-20 max-w-xl">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-reachout-darkgray">Resume Upload</h1>
            <p className="text-reachout-darkgray/70 mt-2">Step 3 of 4: Upload your resume for better targeting</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-4">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-reachout-blue text-white' : 
                    step.number === 3 ? 'bg-reachout-blue text-white' : 
                    'bg-gray-200 text-gray-400'
                  }`}>
                    {step.completed ? <Check size={16} /> : step.number}
                  </div>
                  <div className={`text-xs mt-1 ${
                    step.number === 3 ? 'text-reachout-blue font-medium' : 
                    step.number < 3 ? 'text-reachout-darkgray' : 
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
                <CardTitle>Upload Your Resume</CardTitle>
                <CardDescription>Upload your resume to help us match you with the best opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
                  {resumeFile ? (
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <File className="h-8 w-8 text-reachout-blue mr-2" />
                        <div>
                          <p className="font-medium">{resumeFile.name}</p>
                          <p className="text-sm text-gray-500">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleRemoveResume}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <FileUp className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Drag and drop your resume here, or</p>
                      <div className="relative">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="border-reachout-blue text-reachout-blue hover:bg-reachout-blue/10"
                        >
                          Browse Files
                        </Button>
                        <input
                          id="resume"
                          type="file"
                          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={handleResumeUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">PDF or DOCX, up to 5MB</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/onboarding/profile')}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="bg-reachout-blue hover:bg-reachout-darkblue" 
                disabled={isLoading || !resumeFile}
              >
                {isLoading ? "Uploading..." : "Continue"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeUpload;
