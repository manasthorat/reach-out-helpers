
import React from 'react';
import StatisticsCard from '@/components/dashboard/StatisticsCard';
import { Mail, Users, Target, BarChart } from 'lucide-react';

interface StatisticsSectionProps {
  totalEmails: number;
  totalOpened: number;
  totalReplied: number;
  responseRate: number;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({
  totalEmails,
  totalOpened,
  totalReplied,
  responseRate
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatisticsCard
        title="Total Emails Sent"
        value={totalEmails}
        icon={<Mail size={20} />}
        trend={{ value: "12% increase this week", isPositive: true }}
      />

      <StatisticsCard
        title="Response Rate"
        value={`${responseRate}%`}
        icon={<BarChart size={20} className="text-reachout-green" />}
        trend={{ value: "5% higher than average", isPositive: true }}
      />

      <StatisticsCard
        title="Emails Opened"
        value={totalOpened}
        icon={<Target size={20} className="text-reachout-purple" />}
        secondaryValue={{ 
          value: `${Math.round((totalOpened / totalEmails) * 100)}% open rate`, 
          color: "text-reachout-purple" 
        }}
      />

      <StatisticsCard
        title="Replies Received"
        value={totalReplied}
        icon={<Users size={20} />}
        secondaryValue={{ 
          value: `${Math.round((totalReplied / totalEmails) * 100)}% reply rate`, 
          color: "text-reachout-blue" 
        }}
      />
    </div>
  );
};

export default StatisticsSection;
