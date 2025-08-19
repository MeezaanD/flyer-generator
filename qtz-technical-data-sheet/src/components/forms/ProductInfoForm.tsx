import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, X, Upload } from "lucide-react";
import { DataSheetData, CompanyInfo, ProductField } from "../../types/datasheet";
import { useToast } from "@/hooks/use-toast";

interface ProductInfoFormProps {
  data: DataSheetData;
  companyInfo: CompanyInfo;
  onUpdateData: (updates: Partial<DataSheetData>) => void;
  onUpdateCompany: (updates: Partial<CompanyInfo>) => void;
}

export const ProductInfoForm = ({
  data,
  companyInfo,
  onUpdateData,
  onUpdateCompany
}: ProductInfoFormProps) => {
  const { toast } = useToast();

  const handleAddField = () => {
    if (data.productFields.length >= 10) {
      toast({
        title: "Maximum fields reached",
        description: "You can add up to 10 product specification fields.",
        variant: "destructive"
      });
      return;
    }

    const newField: ProductField = {
      id: Date.now().toString(),
      label: "",
      value: ""
    };

    onUpdateData({
      productFields: [...data.productFields, newField]
    });
  };

  const handleRemoveField = (fieldId: string) => {
    onUpdateData({
      productFields: data.productFields.filter(field => field.id !== fieldId)
    });
  };

  const handleUpdateField = (fieldId: string, updates: Partial<ProductField>) => {
    onUpdateData({
      productFields: data.productFields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    });
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdateCompany({ logo: file });
      toast({
        title: "Logo uploaded",
        description: "Company logo has been updated successfully."
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Company Logo */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3">Company Logo</h4>
        <div className="space-y-3">
          <Label htmlFor="logo-upload" className="cursor-pointer">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                {companyInfo.logo ? "Change Logo" : "Upload Company Logo"}
              </span>
            </div>
            <Input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </Label>
          {companyInfo.logo && (
            <p className="text-sm text-muted-foreground">
              Logo: {companyInfo.logo.name}
            </p>
          )}
        </div>
      </Card>

      {/* Page Title */}
      <div className="space-y-2">
        <Label htmlFor="page-title">Page Title</Label>
        <Input
          id="page-title"
          value={companyInfo.pageTitle}
          onChange={(e) => onUpdateCompany({ pageTitle: e.target.value })}
          placeholder="QTZ Concrete Technical Data Sheet"
        />
      </div>

      {/* Product Title */}
      <div className="space-y-2">
        <Label htmlFor="product-title">Product Title</Label>
        <Input
          id="product-title"
          value={data.title}
          onChange={(e) => onUpdateData({ title: e.target.value })}
          placeholder="e.g., Bollard 1.025 x 0200 x 0.245"
        />
      </div>

      {/* Product Specifications */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Product Specifications</h4>
          <Button
            onClick={handleAddField}
            size="sm"
            variant="outline"
            disabled={data.productFields.length >= 10}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Field
          </Button>
        </div>

        <div className="space-y-3">
          {data.productFields.map((field) => (
            <div key={field.id} className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Label (e.g., Weight)"
                  value={field.label}
                  onChange={(e) => handleUpdateField(field.id, { label: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <Input
                  placeholder="Value (e.g., 128kg)"
                  value={field.value}
                  onChange={(e) => handleUpdateField(field.id, { value: e.target.value })}
                />
              </div>
              <Button
                onClick={() => handleRemoveField(field.id)}
                size="sm"
                variant="outline"
                className="px-3"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {data.productFields.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No specifications added yet. Click "Add Field" to get started.
          </p>
        )}
      </Card>
    </div>
  );
};