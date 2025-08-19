import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DataSheetData } from "../../types/datasheet";
import { FileText, Image } from "lucide-react";

interface LayoutSelectorProps {
  data: DataSheetData;
  onUpdateData: (updates: Partial<DataSheetData>) => void;
}

export const LayoutSelector = ({ data, onUpdateData }: LayoutSelectorProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">Choose Layout</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Select the layout that best fits your data sheet requirements.
        </p>
      </div>

      <RadioGroup
        value={data.layoutType}
        onValueChange={(value: 'with-photo' | 'without-photo') => 
          onUpdateData({ layoutType: value })
        }
        className="space-y-4"
      >
        {/* Layout 1: Without Photo */}
        <Card className="p-4">
          <div className="flex items-start space-x-3">
            <RadioGroupItem 
              value="without-photo" 
              id="layout-without-photo"
              className="mt-1"
            />
            <div className="flex-1">
              <Label 
                htmlFor="layout-without-photo" 
                className="cursor-pointer block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-medium">Layout 1: Information + Technical Drawing</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Clean layout with product specifications and technical drawing only.
                  Perfect for technical documentation.
                </p>
              </Label>
              
              {/* Layout Preview */}
              <div className="mt-3 p-3 border rounded-lg bg-muted/20">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="space-y-1">
                    <div className="h-2 bg-primary/20 rounded w-3/4"></div>
                    <div className="h-1 bg-muted rounded w-full"></div>
                    <div className="h-1 bg-muted rounded w-2/3"></div>
                  </div>
                  <div className="border rounded aspect-square bg-muted/50 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Layout 2: With Photo */}
        <Card className="p-4">
          <div className="flex items-start space-x-3">
            <RadioGroupItem 
              value="with-photo" 
              id="layout-with-photo"
              className="mt-1"
            />
            <div className="flex-1">
              <Label 
                htmlFor="layout-with-photo" 
                className="cursor-pointer block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Image className="h-5 w-5 text-primary" />
                  <span className="font-medium">Layout 2: Information + Technical Drawing + Product Photo</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete layout with product specifications, technical drawing, and product photo.
                  Great for marketing and comprehensive documentation.
                </p>
              </Label>
              
              {/* Layout Preview */}
              <div className="mt-3 p-3 border rounded-lg bg-muted/20">
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="space-y-1">
                    <div className="h-2 bg-primary/20 rounded w-3/4"></div>
                    <div className="h-1 bg-muted rounded w-full"></div>
                    <div className="h-1 bg-muted rounded w-2/3"></div>
                  </div>
                  <div className="border rounded aspect-square bg-muted/50 flex items-center justify-center">
                    <FileText className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="border rounded aspect-square bg-muted/50 flex items-center justify-center">
                    <Image className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              {!data.productPhoto && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Note: Product photo is required for this layout. Upload one in the Images tab.
                </div>
              )}
            </div>
          </div>
        </Card>
      </RadioGroup>
    </div>
  );
};