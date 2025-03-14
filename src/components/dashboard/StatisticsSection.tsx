
import React from 'react';
import StatisticsCard from '@/components/dashboard/StatisticsCard';
import { Mail, BarChart3 } from 'lucide-react';
import EmailsChart from '@/components/dashboard/EmailsChart';

interface StatisticsSectionProps {
  totalEmails: number;
  totalEmailsToday: number;
  dailyEmailData: Array<{ name: string; emails: number }>;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  totalEmails,
  totalEmailsToday,
  dailyEmailData
}) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatisticsCard
          title="Total Emails Sent"
          value={totalEmails}
          icon={<Mail size={20} />}
          trend={{ value: "12% increase this week", isPositive: true }}
        />

        <StatisticsCard
          title="Emails Sent Today"
          value={totalEmailsToday}
          icon={<BarChart3 size={20} className="text-reachout-green" />}
          secondaryValue={{ 
            value: `${totalEmailsToday > 0 ? Math.round((totalEmailsToday / totalEmails) * 100) : 0}% of total emails`, 
            color: "text-reachout-green" 
          }}
        />
      </div>
      
      {/* Daily Emails Chart */}
      <div className="bg-white rounded-lg border shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">Daily Emails Sent</h3>
        <EmailsChart data={dailyEmailData} />
      </div>
    </div>
  );
};

export default StatisticsSection;
