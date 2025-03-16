
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import Layout from '@/components/layout/Layout';
import { Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const createAccountSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

const Signup = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<CreateAccountFormData>>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = createAccountSchema.parse(formData);
      
      // Create user account with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          data: {
            full_name: validatedData.name,
          }
        }
      });
      
      if (error) throw error;
      
      // Setup onboarding steps as incomplete in localStorage
      localStorage.setItem('onboardingStep', '1');
      localStorage.setItem('accountCreated', 'true');
      
      // Successfully created account, show toast and redirect to profile setup
      toast({
        title: "Account created!",
        description: "Let's set up your professional profile now.",
        duration: 5000,
      });
      
      // Redirect to professional profile setup (Step 2 of onboarding)
      navigate('/onboarding/profile');
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const errors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        setFormErrors(errors);
      } else if ((error as any).message) {
        // Handle Supabase authentication errors
        toast({
          title: "Error creating account",
          description: (error as any).message,
          variant: "destructive",
          duration: 5000,
        });
      } else {
        // Handle other errors
        toast({
          title: "Error creating account",
          description: "Please try again later.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Account' },
    { number: 2, title: 'Profile' },
    { number: 3, title: 'Resume' },
    { number: 4, title: 'Campaign' }
  ];

  return (
    <Layout>
      <div className="container-custom py-12 md:py-20 max-w-xl">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-reachout-darkgray">Create Your ReachOut Account</h1>
            <p className="text-reachout-darkgray/70 mt-2">Step 1 of 4: Account Creation</p>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-4">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.number === 1 ? 'bg-reachout-blue text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {step.number === 1 ? <Check size={16} /> : step.number}
                  </div>
                  <div className={`text-xs mt-1 ${step.number === 1 ? 'text-reachout-blue font-medium' : 'text-gray-400'}`}>
                    {step.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name || ''}
                onChange={handleChange}
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="johndoe@example.com"
                value={formData.email || ''}
                onChange={handleChange}
                className={formErrors.email ? "border-red-500" : ""}
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                value={formData.password || ''}
                onChange={handleChange}
                className={formErrors.password ? "border-red-500" : ""}
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}
              <p className="text-xs text-reachout-darkgray/60">
                Password must be at least 8 characters long.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="********"
                value={formData.confirmPassword || ''}
                onChange={handleChange}
                className={formErrors.confirmPassword ? "border-red-500" : ""}
              />
              {formErrors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-reachout-blue hover:bg-reachout-darkblue" 
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Continue"}
            </Button>

            <div className="text-center text-reachout-darkgray/70 text-sm">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-reachout-blue hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-reachout-blue hover:underline">
                Privacy Policy
              </Link>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-reachout-darkgray/70">
              Already have an account?{' '}
              <Link to="/login" className="text-reachout-blue hover:underline font-medium">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
