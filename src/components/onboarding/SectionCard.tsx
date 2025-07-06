
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
  <Card className="mb-6 border-l-8 border-red-600 shadow-lg">
    <CardHeader className="pb-4">
      <CardTitle className={`text-2xl font-bold ${titleColor}`}>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);
