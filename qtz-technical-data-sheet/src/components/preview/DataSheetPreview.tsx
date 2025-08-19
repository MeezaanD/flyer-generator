import { useState, useEffect } from "react";
import { DataSheetData, CompanyInfo } from "../../types/datasheet";
import qtzLogoDefault from "@/assets/qtz-logo.png";

interface DataSheetPreviewProps {
  data: DataSheetData;
  companyInfo: CompanyInfo;
}

export const DataSheetPreview = ({
  data,
  companyInfo,
}: DataSheetPreviewProps) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [technicalDrawingUrl, setTechnicalDrawingUrl] = useState<string | null>(
    null
  );
  const [productPhotoUrl, setProductPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (companyInfo.logo) {
      const url = URL.createObjectURL(companyInfo.logo);
      setLogoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setLogoUrl(null);
    }
  }, [companyInfo.logo]);

  useEffect(() => {
    if (data.technicalDrawing) {
      const url = URL.createObjectURL(data.technicalDrawing);
      setTechnicalDrawingUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setTechnicalDrawingUrl(null);
    }
  }, [data.technicalDrawing]);

  useEffect(() => {
    if (data.productPhoto) {
      const url = URL.createObjectURL(data.productPhoto);
      setProductPhotoUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setProductPhotoUrl(null);
    }
  }, [data.productPhoto]);

  return (
    <div
      id="datasheet-preview"
      className="w-full max-w-[210mm] mx-auto bg-sheet-background text-sheet-text text-sm flex flex-col min-h-[297mm] relative"
      style={{ aspectRatio: "210/297" }} // A4 aspect ratio
    >
      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10"
        style={{
          zIndex: 0,
          transform: "rotate(-45deg) scale(1.5)", // Rotate and scale the watermark
        }}
      >
        <img
          src={qtzLogoDefault}
          alt="Watermark"
          className="max-w-none"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Header */}
      <div className="border-b-2 border-sheet-border p-4 relative z-10">
        <div className="flex justify-between items-start">
          {/* Logo */}
          <div className="w-24 h-16 flex items-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Company Logo"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <img
                src={qtzLogoDefault}
                alt="QTZ Concrete Logo"
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>

          {/* Contact Info */}
          <div className="text-right space-y-1 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <strong>Telephone</strong><br />
                <strong>WhatsApp</strong><br />
                <strong>Vat Reg</strong><br />
                <strong>E-mail</strong><br />
                <strong>Web URL</strong>
              </div>
              <div className="text-right">
                {companyInfo.salesPhone}<br />
                {companyInfo.whatsapp}<br />
                401 0295972<br />
                {companyInfo.salesEmail}<br />
                qtzconcrete.co.za
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="p-4 text-center relative z-10">
        <h1 className="text-lg font-bold mb-2">{companyInfo.pageTitle}</h1>
      </div>

      {/* Content Area */}
      <div className="flex-1 px-4 pb-4 relative z-10 text-base">
        {data.layoutType === "without-photo" ? (
          // Layout 1: Without Photo
          <div className="grid grid-cols-2 gap-8 h-full">
            {/* Left Column: Product Information */}
            <div className="flex flex-col justify-center">
              <div className="space-y-4 text-lg">
                {" "}
                {/* Increased font size */}
                <div>
                  <strong>Title:</strong> {data.title || "Product Title"}
                </div>
                {data.productFields.map((field) => (
                  <div key={field.id}>
                    <strong>{field.label || "Label"}:</strong>{" "}
                    {field.value || "Value"}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Technical Drawing */}
            <div className="flex flex-col items-center justify-center">
              {technicalDrawingUrl ? (
                <img
                  src={technicalDrawingUrl}
                  alt="Technical Drawing"
                  className="max-w-full max-h-[80%] object-contain border border-gray-300 rounded" // Increased size
                />
              ) : (
                <div className="w-full h-[80%] border-2 border-dashed border-muted-foreground/25 rounded flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">
                    Technical Drawing
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Layout 2: With Photo
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column: Product Information */}
            <div>
              <div className="space-y-4 text-lg">
                {" "}
                {/* Increased font size */}
                <div>
                  <strong>Title:</strong> {data.title || "Product Title"}
                </div>
                {data.productFields.map((field) => (
                  <div key={field.id}>
                    <strong>{field.label || "Label"}:</strong>{" "}
                    {field.value || "Value"}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Technical Drawing */}
            <div className="flex flex-col items-center justify-center">
              {technicalDrawingUrl ? (
                <img
                  src={technicalDrawingUrl}
                  alt="Technical Drawing"
                  className="max-w-full max-h-72 object-contain border border-gray-300 rounded"
                />
              ) : (
                <div className="w-full h-72 border-2 border-dashed border-muted-foreground/25 rounded flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">
                    Technical Drawing
                  </span>
                </div>
              )}
            </div>

            {/* Product Photo (below the two-column layout) */}
            {productPhotoUrl && (
              <div className="col-span-2 mt-4">
                <img
                  src={productPhotoUrl}
                  alt="Product Photo"
                  className="w-full max-h-80 object-contain border border-gray-300 rounded"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-sheet-border bg-sheet-header relative z-10 text-base">
        {" "}
        {/* Increased font size */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-2">Sales/Orders</h3>
            <div className="space-y-1">
              <div>Tel: {companyInfo.salesPhone}</div>
              <div>Email: {companyInfo.salesEmail}</div>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-2">Accounts</h3>
            <div className="space-y-1">
              <div>Tel: {companyInfo.accountsPhone}</div>
              <div>Email: {companyInfo.accountsEmail}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
