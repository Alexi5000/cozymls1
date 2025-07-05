import { Layout } from '@/widgets/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { mockContacts } from '@/entities/contact';
import { Plus, Phone, Mail, Building } from 'lucide-react';

export function ContactsPage() {
  const statusColors = {
    lead: 'bg-yellow-100 text-yellow-800',
    prospect: 'bg-blue-100 text-blue-800',
    client: 'bg-green-100 text-green-800',
  };

  return (
    <Layout title="Contacts">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">All Contacts</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    {contact.company && (
                      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
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
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{contact.phone}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {contact.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {contact.notes && (
                    <p className="text-sm text-gray-600 mt-3 p-2 bg-gray-50 rounded">
                      {contact.notes}
                    </p>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-3">
                    Last contact: {contact.lastContact.toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}