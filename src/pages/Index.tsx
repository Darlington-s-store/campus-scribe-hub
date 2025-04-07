
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';
import Announcements from '@/components/Announcements';
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
        {/* Hero section with animated gradient */}
        <section className="bg-gradient-to-r from-campus-light via-blue-50 to-indigo-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-campus-dark mb-6 animate-fade-in">
                Campus Scribe Hub
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                A dedicated platform for students to share knowledge, express ideas, and engage with the academic community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto hover:shadow-lg transition-all">
                    Join as a Student
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto hover:shadow-lg transition-all">
                    Browse Articles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Announcements */}
        <div className="container mx-auto px-4">
          <Announcements />
        </div>

        {/* Features section with improved cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Why Campus Scribe Hub?</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Our platform is designed with academic excellence and community engagement in mind.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow border-t-4 border-t-campus-primary">
                <div className="h-12 w-12 bg-campus-light rounded-full flex items-center justify-center mb-4 text-campus-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-campus-primary">Express Your Ideas</h3>
                <p className="text-gray-700">
                  Share your academic insights, research findings, and creative thoughts with the campus community. Get feedback from peers and faculty.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow border-t-4 border-t-campus-secondary">
                <div className="h-12 w-12 bg-campus-light rounded-full flex items-center justify-center mb-4 text-campus-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder-archive"><path d="M22 20V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"/><path d="M12 10v4"/><path d="M9 13h6"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-campus-secondary">Build Your Portfolio</h3>
                <p className="text-gray-700">
                  Develop a collection of published work that showcases your writing skills, academic interests, and evolving thoughts on important topics.
                </p>
              </Card>
              
              <Card className="p-6 hover:shadow-lg transition-shadow border-t-4 border-t-campus-accent">
                <div className="h-12 w-12 bg-campus-light rounded-full flex items-center justify-center mb-4 text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-accent">Connect & Learn</h3>
                <p className="text-gray-700">
                  Engage with peers across diverse disciplines, receive feedback from faculty, and expand your knowledge beyond the classroom.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Growing Community</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-6">
                <div className="text-4xl font-bold text-campus-primary mb-2">500+</div>
                <p className="text-gray-600">Active Students</p>
              </div>
              
              <div className="p-6">
                <div className="text-4xl font-bold text-campus-secondary mb-2">1,200+</div>
                <p className="text-gray-600">Published Articles</p>
              </div>
              
              <div className="p-6">
                <div className="text-4xl font-bold text-campus-accent mb-2">50+</div>
                <p className="text-gray-600">Academic Disciplines</p>
              </div>
              
              <div className="p-6">
                <div className="text-4xl font-bold text-campus-dark mb-2">20+</div>
                <p className="text-gray-600">Partner Universities</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Getting started with Campus Scribe Hub is easy and straightforward.
            </p>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 bg-campus-light rounded-full flex items-center justify-center mx-auto mb-4 text-campus-primary relative">
                  <span className="text-2xl font-bold">1</span>
                  <div className="absolute h-1 bg-gray-200 w-full right-0 top-1/2 -z-10 hidden md:block"></div>
                </div>
                <h3 className="text-lg font-bold mb-2">Register</h3>
                <p className="text-gray-600">Create your account with your student credentials.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-campus-light rounded-full flex items-center justify-center mx-auto mb-4 text-campus-primary relative">
                  <span className="text-2xl font-bold">2</span>
                  <div className="absolute h-1 bg-gray-200 w-full right-0 top-1/2 -z-10 hidden md:block"></div>
                </div>
                <h3 className="text-lg font-bold mb-2">Write</h3>
                <p className="text-gray-600">Compose your article using our user-friendly editor.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-campus-light rounded-full flex items-center justify-center mx-auto mb-4 text-campus-primary relative">
                  <span className="text-2xl font-bold">3</span>
                  <div className="absolute h-1 bg-gray-200 w-full right-0 top-1/2 -z-10 hidden md:block"></div>
                </div>
                <h3 className="text-lg font-bold mb-2">Submit</h3>
                <p className="text-gray-600">Submit your article for review by our editorial team.</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-campus-light rounded-full flex items-center justify-center mx-auto mb-4 text-campus-primary">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h3 className="text-lg font-bold mb-2">Publish</h3>
                <p className="text-gray-600">Once approved, your article will be published on the platform.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action with gradient background */}
        <section className="bg-gradient-to-r from-campus-primary to-campus-secondary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Writing?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join Campus Scribe Hub today and become part of our growing academic community.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="bg-white text-campus-primary hover:bg-gray-100 hover:shadow-lg transition-all">
                Register Now
              </Button>
            </Link>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-16 bg-campus-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Students Say</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="flex flex-col h-full">
                  <div className="text-yellow-500 flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  </div>
                  <p className="text-gray-600 italic mb-4 flex-grow">
                    "Campus Scribe Hub has been an incredible platform for me to share my research. The feedback I've received has significantly improved my writing skills."
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Biology Major</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex flex-col h-full">
                  <div className="text-yellow-500 flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  </div>
                  <p className="text-gray-600 italic mb-4 flex-grow">
                    "As a computer science student, I've found this platform invaluable for sharing my projects and getting constructive feedback from peers and professors."
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p className="font-semibold">Michael Chen</p>
                      <p className="text-sm text-gray-500">Computer Science Major</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex flex-col h-full">
                  <div className="text-yellow-500 flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-1"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  </div>
                  <p className="text-gray-600 italic mb-4 flex-grow">
                    "The platform's review process has helped me refine my ideas and improve my writing. It's a fantastic resource for any student looking to publish their work."
                  </p>
                  <div className="flex items-center mt-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <p className="font-semibold">Jessica Adams</p>
                      <p className="text-sm text-gray-500">Literature Major</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Add ChatBot component */}
      <ChatBot />
    </div>
  );
};

export default Index;
