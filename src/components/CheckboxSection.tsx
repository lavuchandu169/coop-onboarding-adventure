
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ComprehensiveFormData } from '@/types/ComprehensiveFormData';

interface CheckboxItem {
  key: keyof ComprehensiveFormData;
  label: string;
}

interface CheckboxSectionProps {
  title: string;
  emoji: string;
  items: CheckboxItem[];
  formData: ComprehensiveFormData;
  onInputChange: (field: keyof ComprehensiveFormData, value: string | boolean) => void;
  completionDateField: keyof ComprehensiveFormData;
  signatureField: keyof ComprehensiveFormData;
}

const CheckboxSection = ({
  title,
  emoji,
  items,
  formData,
  onInputChange,
  completionDateField,
  signatureField
}: CheckboxSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-red-600">{emoji} {title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map(({ key, label }) => (
          <div key={key} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={key}
              checked={formData[key] as boolean}
              onChange={(e) => onInputChange(key, e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor={key} className="font-medium">{label}</label>
          </div>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <label className="block text-sm font-medium mb-1">Completion Date:</label>
            <Input
              type="date"
              value={formData[completionDateField] as string}
              onChange={(e) => onInputChange(completionDateField, e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Signature:</label>
            <Input
              value={formData[signatureField] as string}
              onChange={(e) => onInputChange(signatureField, e.target.value)}
              placeholder="Sign here"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckboxSection;
