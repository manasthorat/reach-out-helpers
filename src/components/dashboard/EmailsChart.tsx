
import React from 'react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface EmailsChartProps {
  data: Array<{ name: string; emails: number }>;
}

const EmailsChart: React.FC<EmailsChartProps> = ({ data }) => {
  return (
    <div className="h-80 w-full">
      <ChartContainer 
        className="h-full w-full" 
        config={{
          emails: {
            label: 'Emails Sent',
            color: '#4361ee',
          },
        }}
      >
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            tickMargin={10}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
          />
          <ChartTooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltipContent 
                    className="bg-white p-2 border rounded-md shadow-md"
                    active={active} 
                    payload={payload}
                  />
                );
              }
              return null;
            }}
          />
          <Bar dataKey="emails" fill="var(--color-emails)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default EmailsChart;
