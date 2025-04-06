
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-r from-campus-light via-blue-50 to-indigo-50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-campus-primary mb-4">Campus Scribe Hub</h3>
            <p className="text-gray-600 mb-4">
              A platform where students can share knowledge, express ideas, and engage with the 
              academic community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-campus-primary hover:text-campus-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-campus-primary hover:text-campus-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-campus-primary hover:text-campus-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-campus-dark mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-campus-primary">Home</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-campus-primary">Blog</Link></li>
              <li><Link to="/register" className="text-gray-600 hover:text-campus-primary">Register</Link></li>
              <li><Link to="/login" className="text-gray-600 hover:text-campus-primary">Login</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-campus-dark mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-campus-primary">Writing Guidelines</a></li>
              <li><a href="#" className="text-gray-600 hover:text-campus-primary">Academic Resources</a></li>
              <li><a href="#" className="text-gray-600 hover:text-campus-primary">Publication Ethics</a></li>
              <li><a href="#" className="text-gray-600 hover:text-campus-primary">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-campus-dark mb-4">Contact Us</h3>
            <address className="not-italic text-gray-600">
              <p className="mb-2">University Campus</p>
              <p className="mb-2">123 Education Street</p>
              <p className="mb-2">Learning City, LC 12345</p>
              <p className="mb-2">Email: info@campusscribehub.edu</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-600">
            © {currentYear} Campus Scribe Hub. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-campus-primary">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-campus-primary">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-campus-primary">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
