
export interface Email {
  id: number;
  recipient: string;
  email: string;
  company: string;
  subject: string;
  date: string;
  status: string;
}

// Mock data for sent emails
export const mockEmails: Email[] = [
  {
    id: 1,
    recipient: 'Sarah Johnson',
    email: 'sarah.johnson@techrecruit.com',
    company: 'Tech Recruiters Inc.',
    subject: 'Experienced React Developer Seeking New Opportunities',
    date: '2023-06-15T10:45:00',
    status: 'opened',
  },
  {
    id: 2,
    recipient: 'Michael Chen',
    email: 'michael.c@devtalent.io',
    company: 'DevTalent',
    subject: 'Senior Frontend Developer with 5+ Years Experience',
    date: '2023-06-14T15:30:00',
    status: 'replied',
  },
  {
    id: 3,
    recipient: 'Jessica Roberts',
    email: 'j.roberts@techhires.com',
    company: 'TechHires',
    subject: 'Full Stack Developer Looking for Remote Opportunities',
    date: '2023-06-13T09:15:00',
    status: 'sent',
  },
  {
    id: 4,
    recipient: 'David Wilson',
    email: 'david@wilsonrecruiting.com',
    company: 'Wilson Recruiting',
    subject: 'Frontend Developer with React Expertise',
    date: '2023-06-12T11:20:00',
    status: 'opened',
  },
  {
    id: 5,
    recipient: 'Amanda Lee',
    email: 'amanda@talentsearch.com',
    company: 'Talent Search Partners',
    subject: 'React Developer Seeking New Challenges',
    date: '2023-06-11T14:10:00',
    status: 'replied',
  },
  {
    id: 6,
    recipient: 'Robert Johnson',
    email: 'r.johnson@techstaffing.com',
    company: 'Tech Staffing Solutions',
    subject: 'Web Developer with 4+ Years Experience',
    date: '2023-06-10T09:00:00',
    status: 'sent',
  },
  {
    id: 7,
    recipient: 'Emily Davis',
    email: 'emily.davis@recruitpro.com',
    company: 'RecruitPro',
    subject: 'JavaScript Developer Seeking Senior Role',
    date: '2023-06-09T16:45:00',
    status: 'opened',
  },
  {
    id: 8,
    recipient: 'Steve Miller',
    email: 'steve@millertalent.com',
    company: 'Miller Talent Agency',
    subject: 'React Native Developer Available for Immediate Start',
    date: '2023-06-08T13:30:00',
    status: 'sent',
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
