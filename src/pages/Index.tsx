
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import { initializeStorage } from '@/data/articles';

const Index = () => {
  useEffect(() => {
    // Initialize local storage with mock data if empty
    initializeStorage();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-campus-light py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-campus-dark mb-6">
                Campus Scribe Hub
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                A dedicated platform for students to share knowledge, express ideas, and engage with the academic community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Join as a Student
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Browse Articles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Campus Scribe Hub?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-campus-primary">Express Your Ideas</h3>
                <p className="text-gray-700">
                  Share your academic insights, research findings, and creative thoughts with the campus community.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-campus-primary">Build Your Portfolio</h3>
                <p className="text-gray-700">
                  Develop a collection of published work that showcases your writing skills and academic interests.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-campus-primary">Connect & Learn</h3>
                <p className="text-gray-700">
                  Engage with peers across diverse disciplines and expand your knowledge beyond the classroom.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="bg-campus-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Writing?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join Campus Scribe Hub today and become part of our growing academic community.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-white text-campus-primary hover:bg-gray-100">
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
