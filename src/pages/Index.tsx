
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Announcements from '@/components/Announcements';
import FeaturedArticles from '@/components/FeaturedArticles';
import CampusStats from '@/components/CampusStats';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-campus-primary to-campus-accent text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Campus Scribe Hub
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              A platform for students to share knowledge, publish articles, and engage with the academic community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/blog">
                <Button variant="secondary" size="lg">
                  Browse Articles
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20 border-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Announcements Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Campus Announcements</h2>
            <Announcements />
          </div>
        </section>
        
        {/* Featured Articles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Articles</h2>
            <FeaturedArticles />
          </div>
        </section>
        
        {/* Campus Stats */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-10 text-center">Campus at a Glance</h2>
            <CampusStats />
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 bg-campus-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Contribute?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our community of writers and share your knowledge with fellow students and faculty.
            </p>
            <Link to="/register">
              <Button size="lg">
                Register Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Campus Scribe Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
