
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ComprehensiveFormData } from '@/types/ComprehensiveFormData';

interface PreFlightChecksProps {
  formData: ComprehensiveFormData;
  onInputChange: (field: keyof ComprehensiveFormData, value: string | boolean) => void;
}

const PreFlightChecks = ({ formData, onInputChange }: PreFlightChecksProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-red-600">✈️ Once the Ink is Dry: Pre-Flight Checks!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="trainingPlan"
            checked={formData.trainingPlanCreated}
            onChange={(e) => onInputChange('trainingPlanCreated', e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="trainingPlan" className="font-medium">
            Cook Up a Cracking Training Plan for their specific station!
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="rgmWelcome"
            checked={formData.rgmWelcomeScheduled}
            onChange={(e) => onInputChange('rgmWelcomeScheduled', e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="rgmWelcome" className="font-medium">
            The RGM or ARGM should be in store to welcome them on their first shift – it's a big deal!
          </label>
        </div>

        <div className="space-y-2">
          <label className="font-medium">Pair 'Em Up! Assign a friendly Station Buddy:</label>
          <Input
            value={formData.stationBuddyAssigned}
            onChange={(e) => onInputChange('stationBuddyAssigned', e.target.value)}
            placeholder="Station Buddy Name"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="feedbackScheduled"
            checked={formData.feedbackScheduled}
            onChange={(e) => onInputChange('feedbackScheduled', e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="feedbackScheduled" className="font-medium">
            Let's Talk Chicken! Schedule regular feedback chats and an 'End of Probation' review.
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <label className="block text-sm font-medium mb-1">Completion Date:</label>
            <Input
              type="date"
              value={formData.preFlightCompletionDate}
              onChange={(e) => onInputChange('preFlightCompletionDate', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Signature of ARGM/RGM:</label>
            <Input
              value={formData.preFlightSignature}
              onChange={(e) => onInputChange('preFlightSignature', e.target.value)}
              placeholder="Sign here"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreFlightChecks;
