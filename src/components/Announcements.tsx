
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';

type Announcement = {
  id: string;
  title: string;
  content: string;
  date: string;
  important?: boolean;
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: 'Welcome to Campus Scribe Hub!',
      content: 'We are excited to launch our new platform for academic writing and sharing knowledge.',
      date: 'April 7, 2025',
      important: true,
    },
    {
      id: '2',
      title: 'Writing Workshop',
      content: 'Join our academic writing workshop this Friday at 3 PM in the Main Library.',
      date: 'April 10, 2025',
    },
    {
      id: '3',
      title: 'New Features Released',
      content: 'Check out our new chat assistant to help with your questions!',
      date: 'April 7, 2025',
    },
  ]);
  
  const [visibleAnnouncements, setVisibleAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    // Initially show only important announcements
    setVisibleAnnouncements(announcements.filter(a => a.important));
  }, [announcements]);

  const dismissAnnouncement = (id: string) => {
    setVisibleAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const showAllAnnouncements = () => {
    setVisibleAnnouncements(announcements);
  };

  if (visibleAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="my-4">
      {visibleAnnouncements.map((announcement) => (
        <Card key={announcement.id} className={`mb-2 p-4 border-l-4 ${announcement.important ? 'border-l-campus-accent' : 'border-l-campus-primary'} animate-fade-in`}>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center">
                <Bell size={16} className={`mr-2 ${announcement.important ? 'text-campus-accent' : 'text-campus-primary'}`} />
                <h3 className="font-bold text-lg">{announcement.title}</h3>
              </div>
              <p className="mt-1 text-gray-600">{announcement.content}</p>
              <p className="mt-2 text-xs text-gray-500">{announcement.date}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => dismissAnnouncement(announcement.id)} className="ml-2">
              <X size={16} />
            </Button>
          </div>
        </Card>
      ))}
      
      {visibleAnnouncements.length < announcements.length && (
        <Button variant="link" onClick={showAllAnnouncements} className="text-campus-primary">
          Show all announcements ({announcements.length})
        </Button>
      )}
    </div>
  );
};

export default Announcements;
