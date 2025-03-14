
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-reachout-lightgray mt-auto py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
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
            <p className="text-reachout-darkgray/80 mb-4">
              Automate your outreach to recruiters and land more interviews.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-reachout-darkgray hover:text-reachout-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="text-reachout-darkgray hover:text-reachout-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16 6 17.26 7.89 17.29C6.43 18.45 4.58 19.13 2.56 19.13C2.22 19.13 1.88 19.11 1.54 19.07C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79C20.33 8.6 20.33 8.42 20.32 8.23C21.16 7.63 21.88 6.87 22.46 6Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" className="text-reachout-darkgray hover:text-reachout-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM8.5 18.5H6V10H8.5V18.5ZM7.25 8.5C6.45 8.5 5.8 7.85 5.8 7.05C5.8 6.25 6.45 5.6 7.25 5.6C8.05 5.6 8.7 6.25 8.7 7.05C8.7 7.85 8.05 8.5 7.25 8.5ZM18.5 18.5H16V13.55C16 11.65 13.8 11.85 13.8 13.55V18.5H11.3V10H13.8V11.3C15 9.55 18.5 9.4 18.5 13.15V18.5Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-reachout-darkgray/80 hover:text-reachout-blue">Features</Link></li>
              <li><Link to="/pricing" className="text-reachout-darkgray/80 hover:text-reachout-blue">Pricing</Link></li>
              <li><Link to="/faq" className="text-reachout-darkgray/80 hover:text-reachout-blue">FAQ</Link></li>
              <li><Link to="/" className="text-reachout-darkgray/80 hover:text-reachout-blue">Testimonials</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-reachout-darkgray/80 hover:text-reachout-blue">About</Link></li>
              <li><Link to="/blog" className="text-reachout-darkgray/80 hover:text-reachout-blue">Blog</Link></li>
              <li><Link to="/careers" className="text-reachout-darkgray/80 hover:text-reachout-blue">Careers</Link></li>
              <li><Link to="/contact" className="text-reachout-darkgray/80 hover:text-reachout-blue">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-reachout-darkgray/80 hover:text-reachout-blue">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-reachout-darkgray/80 hover:text-reachout-blue">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-reachout-darkgray/80 hover:text-reachout-blue">Cookies Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-reachout-darkgray/60">
            © {new Date().getFullYear()} ReachOut. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
