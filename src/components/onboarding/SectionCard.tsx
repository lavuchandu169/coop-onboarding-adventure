
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SectionCardProps {
  title: string;
  titleColor?: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<SectionCardProps> = ({ 
  title, 
  titleColor = 'text-red-600', 
  children 
}) => (
  <Card className="mb-4 sm:mb-6 border-l-4 sm:border-l-8 border-red-600 shadow-lg hover-lift transition-smooth glass-card animate-scale-in">
    <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
      <CardTitle className={`text-lg sm:text-2xl font-bold ${titleColor} animate-slide-up`}>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 sm:p-6 pt-0">
      {children}
    </CardContent>
  </Card>
);
