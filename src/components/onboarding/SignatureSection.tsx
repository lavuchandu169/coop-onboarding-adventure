
import React from 'react';
import { Input } from "@/components/ui/input";

interface SignatureSectionProps {
  dateName: string;
  sigName: string;
  dateValue?: string;
  signatureValue?: string;
  onDateChange?: (value: string) => void;
  onSignatureChange?: (value: string) => void;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({ 
  dateName, 
  sigName,
  dateValue = '',
  signatureValue = '',
  onDateChange,
  onSignatureChange
}) => (
  <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col md:flex-row md:items-center gap-4">
    <div className="flex-1">
      <label htmlFor={dateName} className="block text-sm font-medium text-gray-600 mb-1">
        Completion Date:
      </label>
      <Input 
        type="date" 
        id={dateName} 
        name={dateName} 
        value={dateValue}
        onChange={(e) => onDateChange?.(e.target.value)}
        className="focus:ring-red-600 focus:border-red-600"
      />
    </div>
    <div className="flex-1">
      <label htmlFor={sigName} className="block text-sm font-medium text-gray-600 mb-1">
        Signature of ARGM/RGM:
      </label>
      <Input 
        type="text" 
        id={sigName} 
        name={sigName} 
        value={signatureValue}
        onChange={(e) => onSignatureChange?.(e.target.value)}
        placeholder="Sign here"
        className="focus:ring-red-600 focus:border-red-600"
      />
    </div>
  </div>
);
