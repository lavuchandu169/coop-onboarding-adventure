
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Save } from 'lucide-react';

interface SaveFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formName: string;
  onFormNameChange: (name: string) => void;
  onSave: () => void;
}

const SaveFormDialog = ({ 
  open, 
  onOpenChange, 
  formName, 
  onFormNameChange, 
  onSave 
}: SaveFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Form</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Form Name
            </label>
            <Input
              value={formName}
              onChange={(e) => onFormNameChange(e.target.value)}
              placeholder="Enter form name"
            />
          </div>
          <Button onClick={onSave} className="w-full">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveFormDialog;
