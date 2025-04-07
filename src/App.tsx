
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initializeStorage } from "@/data/articles";
import { initializeSupabaseTables, syncLocalStorageToSupabase } from "@/lib/supabase";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import SubmitArticle from "./pages/SubmitArticle";
import ArticleDetail from "./pages/ArticleDetail";
import ChatBot from "./components/ChatBot";
import CookieConsent from "./components/CookieConsent";
import { useToast } from "./components/ui/use-toast";

const queryClient = new QueryClient();

const App = () => {
  const { toast } = useToast();
  
  // Initialize local storage with mock data when the app loads
  useEffect(() => {
    // Initialize local storage
    initializeStorage();
    
    // Check for Supabase environment variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      // Show a toast notification if Supabase is not configured
      toast({
        title: "Supabase Not Configured",
        description: "Using local storage for data. Your changes won't persist between sessions.",
        duration: 5000,
      });
      console.log("Supabase URL and key are missing. Using local storage only.");
      return;
    }
    
    // Try to initialize Supabase and sync local data
    const setupSupabase = async () => {
      try {
        const success = await initializeSupabaseTables();
        if (success) {
          // Sync local storage data to Supabase
          await syncLocalStorageToSupabase();
          toast({
            title: "Connected to Supabase",
            description: "Your data will be stored in the database.",
            duration: 3000,
          });
        } else {
          toast({
            title: "Supabase Connection Issue",
            description: "Using local storage as fallback. Some features may be limited.",
            variant: "destructive",
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Error setting up Supabase:', error);
        toast({
          title: "Supabase Error",
          description: "Could not connect to the database. Using local storage instead.",
          variant: "destructive",
          duration: 5000,
        });
      }
    };
    
    setupSupabase();
  }, [toast]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<ArticleDetail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/submit-article" element={<SubmitArticle />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Global components that appear on all pages */}
          <ChatBot />
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
