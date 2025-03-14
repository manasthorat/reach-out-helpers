
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { format } from "date-fns";
import { Button } from '@/components/ui/button';

interface Email {
  id: number;
  recipient: string;
  email: string;
  company: string;
  subject: string;
  date: string;
  status: string;
}

interface EmailTableProps {
  filteredEmails: Email[];
  totalEmails: number;
  getStatusClass: (status: string) => string;
}

const EmailTable: React.FC<EmailTableProps> = ({ 
  filteredEmails, 
  totalEmails,
  getStatusClass 
}) => {
  return (
    <>
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
          Showing {filteredEmails.length} of {totalEmails} emails
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm" disabled>Next</Button>
        </div>
      </div>
    </>
  );
};

export default EmailTable;
