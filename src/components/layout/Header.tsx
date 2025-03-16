
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // This is a mockup for authentication - in a real app, you would use a proper auth system
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    // Check if user is logged in (this is a mockup)
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
  };

  // Determine if current page is dashboard
  const isDashboard = location.pathname === '/dashboard';
  const isTemplates = location.pathname === '/templates';

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-reachout-blue"
            >
              <path
                d="M16 2C8.268 2 2 8.268 2 16C2 23.732 8.268 30 16 30C23.732 30 30 23.732 30 16C30 8.268 23.732 2 16 2ZM16 4C22.617 4 28 9.383 28 16C28 22.617 22.617 28 16 28C9.383 28 4 22.617 4 16C4 9.383 9.383 4 16 4ZM10 12C8.895 12 8 12.895 8 14V22C8 23.105 8.895 24 10 24H16C17.105 24 18 23.105 18 22V20H22C23.105 20 24 19.105 24 18V14C24 12.895 23.105 12 22 12H10ZM10 14H22V18H18V14H16V22H10V14Z"
                fill="currentColor"
              />
            </svg>
            <span className="text-xl font-bold text-reachout-darkgray">ReachOut</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-reachout-darkgray hover:text-reachout-blue transition-colors font-medium">
              Home
            </Link>
            <Link to="/dashboard" className={`transition-colors font-medium ${isDashboard ? 'text-reachout-blue' : 'text-reachout-darkgray hover:text-reachout-blue'}`}>
              Dashboard
            </Link>
            <Link to="/templates" className={`transition-colors font-medium ${isTemplates ? 'text-reachout-blue' : 'text-reachout-darkgray hover:text-reachout-blue'}`}>
              Templates
            </Link>
            <Link to="/how-it-works" className="text-reachout-darkgray hover:text-reachout-blue transition-colors font-medium">
              How It Works
            </Link>
            <Link to="/faq" className="text-reachout-darkgray hover:text-reachout-blue transition-colors font-medium">
              FAQ
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" className="border-reachout-blue text-reachout-blue hover:text-reachout-blue hover:bg-reachout-blue/10">
                    Dashboard
                  </Button>
                </Link>
                <Button onClick={handleLogout} className="bg-reachout-darkgray hover:bg-reachout-darkgray/80">
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-reachout-blue text-reachout-blue hover:text-reachout-blue hover:bg-reachout-blue/10">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-reachout-blue hover:bg-reachout-darkblue">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-reachout-darkgray" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <nav className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-reachout-darkgray hover:text-reachout-blue transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`transition-colors font-medium px-2 py-1 ${isDashboard ? 'text-reachout-blue' : 'text-reachout-darkgray hover:text-reachout-blue'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/templates"
                className={`transition-colors font-medium px-2 py-1 ${isTemplates ? 'text-reachout-blue' : 'text-reachout-darkgray hover:text-reachout-blue'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Templates
              </Link>
              <Link
                to="/how-it-works"
                className="text-reachout-darkgray hover:text-reachout-blue transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/faq"
                className="text-reachout-darkgray hover:text-reachout-blue transition-colors font-medium px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="flex flex-col gap-2 mt-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-reachout-blue text-reachout-blue hover:text-reachout-blue hover:bg-reachout-blue/10">
                        Dashboard
                      </Button>
                    </Link>
                    <Button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full bg-reachout-darkgray hover:bg-reachout-darkgray/80">
                      Log Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-reachout-blue text-reachout-blue hover:text-reachout-blue hover:bg-reachout-blue/10">
                        Log In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-reachout-blue hover:bg-reachout-darkblue">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
