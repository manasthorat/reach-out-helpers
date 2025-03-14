import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { toast } = useToast();
  const location = useLocation();
  
  // Temporarily set isAuthenticated to true to bypass authentication
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(true);

  useEffect(() => {
    // This is temporarily disabled, but we'll keep the code for when you want to re-enable it
    /* 
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page",
        variant: "destructive",
      });
    }
    */
    
    // Show a toast notification that auth is bypassed
    toast({
      title: "Authentication bypassed",
      description: "Authentication is temporarily disabled for development",
    });
  }, [toast]);

  // Authentication is temporarily bypassed, so we always render children
  return <>{children}</>;
};

export default AuthGuard;
