
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Calendar } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface EmailFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dateFrom: Date | undefined;
  setDateFrom: (date: Date | undefined) => void;
  dateTo: Date | undefined;
  setDateTo: (date: Date | undefined) => void;
  statusFilter: string | null;
  setStatusFilter: (status: string | null) => void;
  clearFilters: () => void;
}

const EmailFilters: React.FC<EmailFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  statusFilter,
  setStatusFilter,
  clearFilters,
}) => {
  return (
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
  );
};

export default EmailFilters;
