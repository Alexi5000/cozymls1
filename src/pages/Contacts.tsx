
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockContacts } from '@/lib/mock-data';
import { Plus, Mail, Phone, Building, MessageSquare, Calendar, User } from 'lucide-react';

export default function Contacts() {
  const statusColors = {
    active: 'bg-green-100 text-green-700',
    inactive: 'bg-gray-100 text-gray-700',
    prospect: 'bg-blue-100 text-blue-700',
  };

  return (
    <Layout title="Contacts">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">CRM Contacts</h2>
            <p className="text-gray-600 mt-1">Manage your client relationships and leads</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-sm font-medium text-gray-600">Total Contacts</div>
            <div className="text-2xl font-bold text-gray-900">{mockContacts.length}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-gray-600">Active Clients</div>
            <div className="text-2xl font-bold text-green-600">
              {mockContacts.filter(c => c.status === 'active').length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-gray-600">Prospects</div>
            <div className="text-2xl font-bold text-blue-600">
              {mockContacts.filter(c => c.status === 'prospect').length}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-sm font-medium text-gray-600">This Month</div>
            <div className="text-2xl font-bold text-gray-900">+12</div>
          </Card>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockContacts.map((contact) => (
            <Card key={contact.id} className="cozy-card p-6 hover:shadow-lg transition-all duration-200">
              <CardHeader className="p-0 pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-bold text-gray-900">{contact.name}</CardTitle>
                      <p className="text-sm font-medium text-gray-600 mt-1">{contact.position}</p>
                      {contact.company && (
                        <div className="flex items-center gap-1 mt-1">
                          <Building className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-500">{contact.company}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge className={`${statusColors[contact.status]} font-medium`}>
                    {contact.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-3">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      Schedule
                    </Button>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-4">
                    {contact.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs bg-orange-50 text-orange-700">
                        {tag}
                      </Badge>
                    ))}
                    {contact.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        +{contact.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
