
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Download } from 'lucide-react';

interface SavedForm {
  id: string;
  form_name: string;
  form_data: any;
  created_at: string;
  updated_at: string;
}

interface SavedFormsListProps {
  savedForms: SavedForm[];
  loading: boolean;
  onLoadForm: (formId: string) => void;
  onDeleteForm: (formId: string) => void;
}

const SavedFormsList = ({ savedForms, loading, onLoadForm, onDeleteForm }: SavedFormsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Saved Forms</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : savedForms.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No saved forms yet
          </div>
        ) : (
          <div className="space-y-2">
            {savedForms.map((form) => (
              <div
                key={form.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium">{form.form_name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(form.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onLoadForm(form.id)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDeleteForm(form.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SavedFormsList;
