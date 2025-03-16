
export interface Email {
  id: number;
  recipient: string;
  email: string;
  company: string;
  subject: string;
  date: string;
  status: string;
  location: string;
  jobTitle: string;
}

// Helper function to get a date string for a specific number of days ago
const getDateDaysAgo = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Mock data for sent emails
export const mockEmails: Email[] = [
  {
    id: 1,
    recipient: 'Sarah Johnson',
    email: 'sarah.johnson@techrecruit.com',
    company: 'Tech Recruiters Inc.',
    subject: 'Experienced React Developer Seeking New Opportunities',
    date: getDateDaysAgo(0), // today
    status: 'opened',
    location: 'New York, NY',
    jobTitle: 'Senior Technical Recruiter'
  },
  {
    id: 2,
    recipient: 'Michael Chen',
    email: 'michael.c@devtalent.io',
    company: 'DevTalent',
    subject: 'Senior Frontend Developer with 5+ Years Experience',
    date: getDateDaysAgo(0), // today
    status: 'replied',
    location: 'San Francisco, CA',
    jobTitle: 'Talent Acquisition Manager'
  },
  {
    id: 3,
    recipient: 'Jessica Roberts',
    email: 'j.roberts@techhires.com',
    company: 'TechHires',
    subject: 'Full Stack Developer Looking for Remote Opportunities',
    date: getDateDaysAgo(1),
    status: 'sent',
    location: 'Remote',
    jobTitle: 'Technical Recruiter'
  },
  {
    id: 4,
    recipient: 'David Wilson',
    email: 'david@wilsonrecruiting.com',
    company: 'Wilson Recruiting',
    subject: 'Frontend Developer with React Expertise',
    date: getDateDaysAgo(2),
    status: 'opened',
    location: 'Boston, MA',
    jobTitle: 'Head of Engineering Recruitment'
  },
  {
    id: 5,
    recipient: 'Amanda Lee',
    email: 'amanda@talentsearch.com',
    company: 'Talent Search Partners',
    subject: 'React Developer Seeking New Challenges',
    date: getDateDaysAgo(3),
    status: 'replied',
    location: 'Austin, TX',
    jobTitle: 'IT Recruiter'
  },
  {
    id: 6,
    recipient: 'Robert Johnson',
    email: 'r.johnson@techstaffing.com',
    company: 'Tech Staffing Solutions',
    subject: 'Web Developer with 4+ Years Experience',
    date: getDateDaysAgo(4),
    status: 'sent',
    location: 'Chicago, IL',
    jobTitle: 'Recruiting Specialist'
  },
  {
    id: 7,
    recipient: 'Emily Davis',
    email: 'emily.davis@recruitpro.com',
    company: 'RecruitPro',
    subject: 'JavaScript Developer Seeking Senior Role',
    date: getDateDaysAgo(5),
    status: 'opened',
    location: 'Seattle, WA',
    jobTitle: 'Senior Technical Recruiter'
  },
  {
    id: 8,
    recipient: 'Steve Miller',
    email: 'steve@millertalent.com',
    company: 'Miller Talent Agency',
    subject: 'React Native Developer Available for Immediate Start',
    date: getDateDaysAgo(6),
    status: 'sent',
    location: 'Denver, CO',
    jobTitle: 'Tech Talent Specialist'
  },
];

export const getStatusClass = (status: string) => {
  switch (status) {
    case 'replied':
      return 'bg-green-100 text-green-800';
    case 'opened':
      return 'bg-blue-100 text-blue-800';
    case 'sent':
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
