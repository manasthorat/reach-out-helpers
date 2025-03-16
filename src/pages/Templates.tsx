
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'job-application' | 'networking' | 'follow-up';
  subject: string;
  body: string;
}

const templates: Template[] = [
  {
    id: 'template-1',
    name: 'Job Application Follow-up',
    description: 'A polite follow-up after submitting a job application',
    category: 'job-application',
    subject: 'Following up on my application for [Position]',
    body: `Dear [Hiring Manager],

I hope this email finds you well. I recently applied for the [Position] role at [Company Name] on [Application Date] and wanted to follow up on my application status.

I'm very excited about the opportunity to join your team and contribute my skills in [Key Skill]. My experience in [Relevant Experience] aligns well with what you're looking for, and I'm particularly interested in [Something Specific About the Company].

If you need any additional information from me or have questions about my application, please don't hesitate to reach out. I've attached my resume again for your convenience.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to your team.

Best regards,
[Your Name]`
  },
  {
    id: 'template-2',
    name: 'Networking Introduction',
    description: 'Introduce yourself to a new professional contact',
    category: 'networking',
    subject: 'Connecting after [Event/Mutual Connection]',
    body: `Hi [Name],

I hope this email finds you well. My name is [Your Name], and I [how you know them or found them - e.g., "we met at the Tech Conference last week" or "we're both connected with Jane Doe"].

I was impressed by [something specific about them - e.g., "your presentation on AI ethics" or "your work at Company X"]. I'm currently [brief description of your role and company], and I'm particularly interested in [relevant area of interest].

I'd love to connect and perhaps schedule a brief 15-minute call to learn more about your experience with [topic of interest]. I'm sure your insights would be valuable, and I'd be happy to share my thoughts on [something you can offer] as well.

Would you be available for a quick virtual coffee sometime next week?

Looking forward to potentially connecting,
[Your Name]`
  },
  {
    id: 'template-3',
    name: 'Interview Follow-up',
    description: 'Thank you email after a job interview',
    category: 'follow-up',
    subject: 'Thank you for the interview opportunity',
    body: `Dear [Interviewer's Name],

Thank you for taking the time to interview me yesterday for the [Position] role. I enjoyed our conversation about [specific topic discussed] and learning more about the team's current projects.

After our discussion, I'm even more excited about the possibility of joining [Company Name]. The work you're doing in [area/project mentioned] aligns perfectly with my experience in [relevant experience], and I'm confident I could make valuable contributions quickly.

I was particularly interested in what you said about [something specific mentioned in the interview], and it reminded me of a project I worked on where [brief relevant example that adds value].

If you need any additional information from me, please don't hesitate to reach out. I'm looking forward to hearing about the next steps in the process.

Thank you again for your time and consideration.

Best regards,
[Your Name]`
  },
  {
    id: 'template-4',
    name: 'Recruiter Outreach',
    description: 'Proactive message to a recruiter about job opportunities',
    category: 'job-application',
    subject: 'Experienced [Your Role] interested in opportunities at [Company]',
    body: `Hello [Recruiter's Name],

I hope this email finds you well. My name is [Your Name], and I'm an experienced [Your Current Role] with [X years] of experience in [Your Industry/Field].

I've been following [Company Name] for some time and have been impressed by [something specific and genuine about the company - recent project, company culture, innovation, etc.]. I'm particularly drawn to your company's [value/mission/product] and believe my background in [relevant skills/experience] would make me a valuable addition to your team.

I'm currently exploring new opportunities where I can [brief career goal], and I'd love to discuss any suitable roles at [Company Name] that might align with my experience in:
- [Skill/Experience 1]
- [Skill/Experience 2]
- [Skill/Experience 3]

I've attached my resume for your review. If you think there might be a fit, I'd welcome the opportunity to discuss how my background could benefit your team.

Thank you for your time and consideration.

Best regards,
[Your Name]`
  }
];

const Templates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    toast({
      title: "Template selected",
      description: `"${template.name}" has been selected. Click "Use Template" to create a campaign.`
    });
  };

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      // Store the selected template in localStorage to pass to the campaign creation
      localStorage.setItem('campaignTemplate', JSON.stringify(selectedTemplate));
      // Navigate to dashboard and open new campaign dialog
      navigate('/dashboard');
      // Add a flag to indicate we should open the dialog with template
      localStorage.setItem('openCampaignWithTemplate', 'true');
      
      toast({
        title: "Template ready",
        description: "Creating new campaign with the selected template"
      });
    }
  };

  const filterTemplatesByCategory = (category: Template['category']) => {
    return templates.filter(template => template.category === category);
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-reachout-darkgray">Email Templates</h1>
            <p className="text-reachout-darkgray/70">Select a template to start your campaign</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button 
              onClick={handleUseTemplate}
              disabled={!selectedTemplate}
              className="bg-reachout-blue hover:bg-reachout-darkblue"
            >
              Use Template
            </Button>
          </div>
        </div>

        <Tabs defaultValue="job-application" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="job-application">Job Applications</TabsTrigger>
            <TabsTrigger value="networking">Networking</TabsTrigger>
            <TabsTrigger value="follow-up">Follow-ups</TabsTrigger>
          </TabsList>
          <TabsContent value="job-application">
            <div className="grid md:grid-cols-2 gap-4">
              {filterTemplatesByCategory('job-application').map(template => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={() => handleSelectTemplate(template)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="networking">
            <div className="grid md:grid-cols-2 gap-4">
              {filterTemplatesByCategory('networking').map(template => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={() => handleSelectTemplate(template)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="follow-up">
            <div className="grid md:grid-cols-2 gap-4">
              {filterTemplatesByCategory('follow-up').map(template => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={() => handleSelectTemplate(template)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {selectedTemplate && (
          <Card className="bg-gray-50 border-reachout-blue/20 mb-8">
            <CardHeader>
              <CardTitle>Template Preview</CardTitle>
              <CardDescription>This is how your email will look</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Subject:</h3>
                <p className="font-medium">{selectedTemplate.subject}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Body:</h3>
                <div className="bg-white p-4 border rounded-md whitespace-pre-line">
                  {selectedTemplate.body}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleUseTemplate} 
                className="bg-reachout-blue hover:bg-reachout-darkblue"
              >
                Use This Template
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  );
};

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, isSelected, onSelect }) => {
  return (
    <Card 
      className={`cursor-pointer transition-all ${
        isSelected 
          ? 'border-reachout-blue ring-2 ring-reachout-blue/20' 
          : 'hover:border-reachout-blue/50'
      }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm">
          <p className="font-medium">Subject preview:</p>
          <p className="text-gray-500 truncate">{template.subject}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant={isSelected ? "default" : "outline"} 
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={isSelected ? "bg-reachout-blue hover:bg-reachout-darkblue" : ""}
        >
          {isSelected ? 'Selected' : 'Select'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Templates;
