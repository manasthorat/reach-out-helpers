
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { FileUp, X, File } from 'lucide-react';

const ProfileSettings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    jobTitle: 'Senior Software Engineer',
    yearsOfExperience: '5',
    industry: 'Tech',
    location: 'New York, NY',
    remotePreference: 'Remote',
    salaryExpectation: '100,000 - 130,000',
    noticePeriod: '2 weeks',
    about: 'Experienced software engineer with expertise in React, Node.js, and cloud technologies.',
    skills: 'JavaScript, TypeScript, React, Node.js, AWS, Docker'
  });
  
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated profile data:', formData);
    console.log('Resume file:', resumeFile);
    
    // In a real app, you would send this data to your backend
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-reachout-darkgray mb-8">Profile Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal and professional details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Current/Most Recent Job Title</Label>
                      <Input 
                        id="jobTitle" 
                        name="jobTitle" 
                        value={formData.jobTitle} 
                        onChange={handleChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                      <Input 
                        id="yearsOfExperience" 
                        name="yearsOfExperience" 
                        value={formData.yearsOfExperience} 
                        onChange={handleChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select 
                        value={formData.industry} 
                        onValueChange={(value) => handleSelectChange('industry', value)}
                      >
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select Industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tech">Tech</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="IT Services">IT Services</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="remotePreference">Remote Preference</Label>
                      <Select 
                        value={formData.remotePreference} 
                        onValueChange={(value) => handleSelectChange('remotePreference', value)}
                      >
                        <SelectTrigger id="remotePreference">
                          <SelectValue placeholder="Select Preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Remote">Remote Only</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                          <SelectItem value="On-site">On-site</SelectItem>
                          <SelectItem value="Flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="salaryExpectation">Salary Expectation</Label>
                      <Input 
                        id="salaryExpectation" 
                        name="salaryExpectation" 
                        value={formData.salaryExpectation} 
                        onChange={handleChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="noticePeriod">Notice Period</Label>
                      <Select 
                        value={formData.noticePeriod} 
                        onValueChange={(value) => handleSelectChange('noticePeriod', value)}
                      >
                        <SelectTrigger id="noticePeriod">
                          <SelectValue placeholder="Select Notice Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Immediate">Immediate</SelectItem>
                          <SelectItem value="1 week">1 week</SelectItem>
                          <SelectItem value="2 weeks">2 weeks</SelectItem>
                          <SelectItem value="1 month">1 month</SelectItem>
                          <SelectItem value="3 months">3 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {/* Resume Upload Section */}
                  <div className="space-y-2">
                    <Label htmlFor="resume">Resume/CV</Label>
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
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="about">About Me</Label>
                    <Textarea 
                      id="about" 
                      name="about" 
                      value={formData.about} 
                      onChange={handleChange} 
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills (comma separated)</Label>
                    <Textarea 
                      id="skills" 
                      name="skills" 
                      value={formData.skills} 
                      onChange={handleChange} 
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-reachout-blue hover:bg-reachout-darkblue">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Password</h3>
                  <Button variant="outline" className="w-full">Change Password</Button>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Email Notifications</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-reachout-blue focus:ring-reachout-blue" defaultChecked />
                      <span>Recruiter responses</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-reachout-blue focus:ring-reachout-blue" defaultChecked />
                      <span>Weekly activity summary</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-reachout-blue focus:ring-reachout-blue" defaultChecked />
                      <span>Tips and recommendations</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Account Management</h3>
                  <Button variant="destructive" className="w-full">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfileSettings;
