import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductInfoForm } from "./forms/ProductInfoForm";
import { ImageUploadSection } from "./forms/ImageUploadSection";
import { LayoutSelector } from "./forms/LayoutSelector";
import { DataSheetPreview } from "./preview/DataSheetPreview";
import { ExportControls } from "./export/ExportControls";
import { DataSheetData, CompanyInfo } from "../types/datasheet";
import { useToast } from "@/hooks/use-toast";

const defaultCompanyInfo: CompanyInfo = {
  pageTitle: "QTZ Concrete Technical Data Sheet",
  salesPhone: "021 703 1414",
  salesEmail: "sales@qtzconcrete.co.za",
  accountsPhone: "021 703 1414",
  accountsEmail: "accounts@qtzconcrete.co.za",
  whatsapp: "067 9481453",
  facebook: "",
  location: "We are in the same building as Essentials",
  aboutText: "Q.T.Z. Concrete has more than 20 years experience in the manufacturing and installation of prestressed concrete products. We offer a wide range of products for the Construction Industry and the DIY market. Visit our Showcase page to view some of the developments that have used our products."
};

export const DataSheetGenerator = () => {
  const [dataSheetData, setDataSheetData] = useState<DataSheetData>({
    title: "Bollard 1.025 x 0200 x 0.245",
    productFields: [
      { id: "1", label: "Weight", value: "128kg" },
      { id: "2", label: "Strength", value: "25mpa" }
    ],
    layoutType: 'without-photo'
  });

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(defaultCompanyInfo);
  const { toast } = useToast();

  const updateDataSheet = (updates: Partial<DataSheetData>) => {
    setDataSheetData(prev => ({ ...prev, ...updates }));
  };

  const updateCompanyInfo = (updates: Partial<CompanyInfo>) => {
    setCompanyInfo(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            QTZ Concrete Technical Data Sheet Generator
          </h1>
          <p className="text-muted-foreground">
            Create professional technical data sheets with custom specifications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="p-6">
            <Tabs defaultValue="product" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="product">Product</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="export">Export</TabsTrigger>
              </TabsList>

              <TabsContent value="product" className="mt-6">
                <ProductInfoForm
                  data={dataSheetData}
                  companyInfo={companyInfo}
                  onUpdateData={updateDataSheet}
                  onUpdateCompany={updateCompanyInfo}
                />
              </TabsContent>

              <TabsContent value="images" className="mt-6">
                <ImageUploadSection
                  data={dataSheetData}
                  onUpdateData={updateDataSheet}
                />
              </TabsContent>

              <TabsContent value="layout" className="mt-6">
                <LayoutSelector
                  data={dataSheetData}
                  onUpdateData={updateDataSheet}
                />
              </TabsContent>

              <TabsContent value="export" className="mt-6">
                <ExportControls
                  data={dataSheetData}
                  companyInfo={companyInfo}
                />
              </TabsContent>
            </Tabs>
          </Card>

          {/* Preview Section */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
            <div className="border rounded-lg overflow-hidden bg-sheet-background">
              <DataSheetPreview
                data={dataSheetData}
                companyInfo={companyInfo}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};