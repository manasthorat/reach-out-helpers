
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  secondaryValue?: {
    value: string;
    color: string;
  };
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  icon,
  trend,
  secondaryValue,
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-reachout-darkgray/80 font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-bold text-reachout-darkgray">{value}</div>
          <div className={`p-2 ${icon.props.className || 'bg-reachout-blue/10 text-reachout-blue'} rounded-full`}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'} mt-2 flex items-center`}>
            <TrendingUp size={16} className="mr-1" /> {trend.value}
          </div>
        )}
        {secondaryValue && (
          <div className={`text-sm ${secondaryValue.color} mt-2`}>
            {secondaryValue.value}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
