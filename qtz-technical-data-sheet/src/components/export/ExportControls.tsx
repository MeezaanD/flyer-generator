import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText, Image } from "lucide-react";
import { DataSheetData, CompanyInfo } from "../../types/datasheet";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportControlsProps {
  data: DataSheetData;
  companyInfo: CompanyInfo;
}

export const ExportControls = ({ data, companyInfo }: ExportControlsProps) => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const exportAsPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('datasheet-preview');
      if (!element) {
        throw new Error('Preview element not found');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate dimensions to fit exactly on one A4 page
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = Math.min(pageHeight, (canvas.height * imgWidth) / canvas.width);

      // Add image to fit exactly on one page
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      const filename = `${data.title || 'QTZ-Technical-Data-Sheet'}.pdf`;
      pdf.save(filename);

      toast({
        title: "PDF exported successfully",
        description: `Data sheet saved as ${filename}`
      });
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast({
        title: "Export failed",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsImage = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('datasheet-preview');
      if (!element) {
        throw new Error('Preview element not found');
      }

      const canvas = await html2canvas(element, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const link = document.createElement('a');
      link.download = `${data.title || 'QTZ-Technical-Data-Sheet'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Image exported successfully",
        description: `Data sheet saved as ${link.download}`
      });
    } catch (error) {
      console.error('Error exporting image:', error);
      toast({
        title: "Export failed",
        description: "Failed to export image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const canExport = data.title && data.technicalDrawing && 
    (data.layoutType === 'without-photo' || data.productPhoto);

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">Export Data Sheet</h4>
        <p className="text-sm text-muted-foreground mb-4">
          Generate your technical data sheet in professional formats ready for printing or digital distribution.
        </p>
      </div>

      {!canExport && (
        <Card className="p-4 border-destructive/20 bg-destructive/5">
          <h5 className="font-medium text-destructive mb-2">Missing Required Information</h5>
          <ul className="text-sm text-destructive/80 space-y-1">
            {!data.title && <li>• Product title is required</li>}
            {!data.technicalDrawing && <li>• Technical drawing is required</li>}
            {data.layoutType === 'with-photo' && !data.productPhoto && (
              <li>• Product photo is required for Layout 2</li>
            )}
          </ul>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PDF Export */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <FileText className="h-8 w-8 text-primary mt-1" />
            <div className="flex-1">
              <h5 className="font-medium mb-1">Export as PDF</h5>
              <p className="text-sm text-muted-foreground mb-3">
                A4 format, print-ready PDF document perfect for professional documentation.
              </p>
              <Button 
                onClick={exportAsPDF}
                disabled={!canExport || isExporting}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Download PDF'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Image Export */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <Image className="h-8 w-8 text-primary mt-1" />
            <div className="flex-1">
              <h5 className="font-medium mb-1">Export as Image</h5>
              <p className="text-sm text-muted-foreground mb-3">
                High-quality PNG image suitable for digital sharing and web use.
              </p>
              <Button 
                onClick={exportAsImage}
                disabled={!canExport || isExporting}
                variant="outline"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Exporting...' : 'Download Image'}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground space-y-1">
        <p>• PDF exports are optimized for A4 printing</p>
        <p>• Image exports are high-resolution PNG files</p>
        <p>• Both formats maintain the exact layout and proportions</p>
      </div>
    </div>
  );
};