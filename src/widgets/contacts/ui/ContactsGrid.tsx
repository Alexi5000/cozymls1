import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { MobileOptimizedCard } from '@/shared/ui/mobile-optimized-card';
import { mockContacts } from '@/entities/contact';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { Phone, Mail, Building } from 'lucide-react';

export function ContactsGrid() {
  const isMobile = useIsMobile();
  
  const statusColors = {
    lead: 'bg-white/20 text-white border-white/30',
    prospect: 'bg-white/20 text-white border-white/30',
    client: 'bg-white/20 text-white border-white/30',
  };

  return (
    <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
      {mockContacts.map((contact) => {
        const ContactCard = isMobile ? MobileOptimizedCard : Card;
        return (
          <ContactCard
            key={contact.id}
            className={isMobile ? "mobile-card" : "luxury-card hover:shadow-lg transition-shadow stats-card"}
            {...(isMobile && { enableHaptic: true })}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg font-display text-white">{contact.name}</CardTitle>
                  {contact.company && (
                    <p className="text-sm text-white/80 flex items-center gap-1 mt-1 font-body">
                      <Building className="h-3 w-3" />
                      {contact.company}
                    </p>
                  )}
                </div>
                <Badge className={statusColors[contact.status]}>
                  {contact.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/80 font-body">
                  <Mail className="h-4 w-4" />
                  <span>{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80 font-body">
                  <Phone className="h-4 w-4" />
                  <span>{contact.phone}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {contact.tags.map((tag) => (
                    <Badge key={tag} className="bg-white/10 text-white/90 border-white/20 text-xs" variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {contact.notes && (
                  <p className="text-sm text-white/80 mt-3 p-2 bg-white/10 rounded font-body">
                    {contact.notes}
                  </p>
                )}
                
                <p className="text-xs text-white/60 mt-3 font-body">
                  Last contact: {contact.lastContact.toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </ContactCard>
        );
      })}
    </div>
  );
}
