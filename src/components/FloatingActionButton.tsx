import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus, MessageSquare, Phone, Mail, HelpCircle } from 'lucide-react';

export const FloatingActionButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: MessageSquare, label: 'Live Chat', color: 'bg-blue-500 hover:bg-blue-600' },
    { icon: Phone, label: 'Call Support', color: 'bg-green-500 hover:bg-green-600' },
    { icon: Mail, label: 'Email Help', color: 'bg-purple-500 hover:bg-purple-600' },
    { icon: HelpCircle, label: 'FAQ', color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div className={`flex flex-col gap-3 mb-4 transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        {actions.map((action, index) => (
          <div
            key={action.label}
            className="flex items-center gap-3 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="bg-white text-gray-800 px-3 py-1 rounded-lg shadow-medium text-sm font-medium whitespace-nowrap glass-card">
              {action.label}
            </span>
            <Button
              size="sm"
              className={`${action.color} rounded-full w-12 h-12 shadow-large hover-lift hover-glow`}
            >
              <action.icon className="h-5 w-5 text-white" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full w-14 h-14 bg-gradient-primary shadow-glow hover-lift animate-glow transition-transform duration-300 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
      >
        <Plus className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};