import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, X, FileImage } from "lucide-react";
import { DataSheetData } from "../../types/datasheet";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadSectionProps {
  data: DataSheetData;
  onUpdateData: (updates: Partial<DataSheetData>) => void;
}

export const ImageUploadSection = ({ data, onUpdateData }: ImageUploadSectionProps) => {
  const { toast } = useToast();

  const handleTechnicalDrawingUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdateData({ technicalDrawing: file });
      toast({
        title: "Technical drawing uploaded",
        description: "Technical drawing has been added successfully."
      });
    }
  };

  const handleProductPhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpdateData({ productPhoto: file });
      toast({
        title: "Product photo uploaded",
        description: "Product photo has been added successfully."
      });
    }
  };

  const removeTechnicalDrawing = () => {
    onUpdateData({ technicalDrawing: null });
    toast({
      title: "Technical drawing removed",
      description: "Technical drawing has been removed."
    });
  };

  const removeProductPhoto = () => {
    onUpdateData({ productPhoto: null });
    toast({
      title: "Product photo removed", 
      description: "Product photo has been removed."
    });
  };

  return (
    <div className="space-y-6">
      {/* Technical Drawing */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3">Technical Drawing (Required)</h4>
        <div className="space-y-3">
          <Label htmlFor="technical-drawing" className="cursor-pointer">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <FileImage className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                {data.technicalDrawing ? "Change Technical Drawing" : "Upload Technical Drawing"}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, or PDF up to 10MB
              </p>
            </div>
            <Input
              id="technical-drawing"
              type="file"
              accept="image/*,.pdf"
              onChange={handleTechnicalDrawingUpload}
              className="hidden"
            />
          </Label>
          
          {data.technicalDrawing && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <FileImage className="h-4 w-4" />
                <span className="text-sm">{data.technicalDrawing.name}</span>
              </div>
              <Button
                onClick={removeTechnicalDrawing}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Product Photo */}
      <Card className="p-4">
        <h4 className="font-semibold mb-3">Product Photo (Optional)</h4>
        <div className="space-y-3">
          <Label htmlFor="product-photo" className="cursor-pointer">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                {data.productPhoto ? "Change Product Photo" : "Upload Product Photo"}
              </span>
              <p className="text-xs text-muted-foreground mt-1">
                PNG or JPG up to 10MB
              </p>
            </div>
            <Input
              id="product-photo"
              type="file"
              accept="image/*"
              onChange={handleProductPhotoUpload}
              className="hidden"
            />
          </Label>
          
          {data.productPhoto && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span className="text-sm">{data.productPhoto.name}</span>
              </div>
              <Button
                onClick={removeProductPhoto}
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </Card>

      <div className="text-sm text-muted-foreground">
        <p>• Technical drawing will be displayed in a fixed space on the data sheet</p>
        <p>• Product photo is optional and will only be shown in Layout 2</p>
        <p>• Images will be automatically resized to fit the A4 format</p>
      </div>
    </div>
  );
};