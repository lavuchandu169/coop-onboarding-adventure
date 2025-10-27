
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Download } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface SavedForm {
  id: string;
  form_name: string;
  form_data: any;
  form_type?: string;
  created_at: string;
  updated_at: string;
}

interface SavedFormsListProps {
  savedForms: SavedForm[];
  loading: boolean;
  onLoadForm: (formId: string) => void;
  onDeleteForm: (formId: string) => void;
  formType?: string;
}

const SavedFormsList = ({ savedForms, loading, onLoadForm, onDeleteForm, formType }: SavedFormsListProps) => {
  // Filter forms by type if specified
  const filteredForms = formType 
    ? savedForms.filter(form => form.form_type === formType)
    : savedForms;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Saved Forms {formType && `(${formType})`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4 text-muted-foreground">Loading saved forms...</div>
        ) : filteredForms.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No saved forms yet
          </div>
        ) : (
          <div className="space-y-2">
            {filteredForms.map((form) => (
              <div
                key={form.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-all duration-200 group"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">{form.form_name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                    {form.form_type && (
                      <Badge variant="secondary" className="text-xs">
                        {form.form_type}
                      </Badge>
                    )}
                    <span>{new Date(form.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onLoadForm(form.id)}
                    title="Load Form"
                    className="transition-all duration-200"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDeleteForm(form.id)}
                    title="Delete Form"
                    className="transition-all duration-200 hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
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
