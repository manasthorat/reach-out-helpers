
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Users, Target, TrendingUp, ChevronRight, Plus, Edit, BarChart, Calendar, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

// Mock data for sent emails
const mockEmails = [
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

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter emails based on search query, date range, and status
  const filteredEmails = mockEmails.filter((email) => {
    const matchesSearch = email.recipient.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         email.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  const getStatusClass = (status: string) => {
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

  const totalEmails = mockEmails.length;
  const totalOpened = mockEmails.filter(e => e.status === 'opened').length;
  const totalReplied = mockEmails.filter(e => e.status === 'replied').length;
  const responseRate = totalEmails > 0 ? Math.round((totalReplied / totalEmails) * 100) : 0;

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
            <Button className="bg-reachout-blue hover:bg-reachout-darkblue flex items-center gap-2">
              <Plus size={16} /> New Campaign
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
                <div className="text-3xl font-bold text-reachout-darkgray">{totalEmails}</div>
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
                <div className="text-3xl font-bold text-reachout-darkgray">{responseRate}%</div>
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
              <CardTitle className="text-lg text-reachout-darkgray/80 font-medium">Emails Opened</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-reachout-darkgray">{totalOpened}</div>
                <div className="p-2 bg-reachout-purple/10 text-reachout-purple rounded-full">
                  <Target size={20} />
                </div>
              </div>
              <div className="text-sm text-reachout-purple mt-2">
                {Math.round((totalOpened / totalEmails) * 100)}% open rate
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-reachout-darkgray/80 font-medium">Replies Received</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-reachout-darkgray">{totalReplied}</div>
                <div className="p-2 bg-reachout-blue/10 text-reachout-blue rounded-full">
                  <Users size={20} />
                </div>
              </div>
              <div className="text-sm text-reachout-blue mt-2">
                {Math.round((totalReplied / totalEmails) * 100)}% reply rate
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Email History Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Email History</CardTitle>
            <CardDescription>View and filter all your sent emails</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by recipient, company or subject..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {/* Date From Selector */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[140px] justify-start text-left font-normal",
                        !dateFrom && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateFrom ? format(dateFrom, "MMM d, yyyy") : "From Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={dateFrom}
                      onSelect={setDateFrom}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* Date To Selector */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[140px] justify-start text-left font-normal",
                        !dateTo && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateTo ? format(dateTo, "MMM d, yyyy") : "To Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={dateTo}
                      onSelect={setDateTo}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {/* Status Filter */}
                <select
                  className="h-10 w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={statusFilter || ''}
                  onChange={(e) => setStatusFilter(e.target.value || null)}
                >
                  <option value="">All Statuses</option>
                  <option value="sent">Sent</option>
                  <option value="opened">Opened</option>
                  <option value="replied">Replied</option>
                </select>

                <Button variant="ghost" onClick={clearFilters} className="h-10">
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Email Table */}
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recipient</TableHead>
                    <TableHead className="hidden md:table-cell">Company</TableHead>
                    <TableHead className="hidden md:table-cell">Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmails.length > 0 ? (
                    filteredEmails.map((email) => (
                      <TableRow key={email.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{email.recipient}</div>
                            <div className="text-sm text-gray-500">{email.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{email.company}</TableCell>
                        <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                          {email.subject}
                        </TableCell>
                        <TableCell>{format(new Date(email.date), 'MMM d, yyyy')}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(email.status)}`}>
                            {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No emails found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Showing {filteredEmails.length} of {mockEmails.length} emails
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
