
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Plus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatisticsSection from '@/components/dashboard/StatisticsSection';
import EmailFilters from '@/components/dashboard/EmailFilters';
import EmailTable from '@/components/dashboard/EmailTable';
import { mockEmails, getStatusClass } from '@/data/mockEmailData';

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
        <StatisticsSection
          totalEmails={totalEmails}
          totalOpened={totalOpened}
          totalReplied={totalReplied}
          responseRate={responseRate}
        />

        {/* Email History Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Email History</CardTitle>
            <CardDescription>View and filter all your sent emails</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
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

            {/* Email Table */}
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
