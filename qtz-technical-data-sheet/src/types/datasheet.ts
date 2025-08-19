export interface ProductField {
  id: string;
  label: string;
  value: string;
}

export interface DataSheetData {
  title: string;
  productFields: ProductField[];
  technicalDrawing?: File | null;
  productPhoto?: File | null;
  layoutType: 'with-photo' | 'without-photo';
}

export interface CompanyInfo {
  logo?: File | null;
  pageTitle: string;
  salesPhone: string;
  salesEmail: string;
  accountsPhone: string;
  accountsEmail: string;
  whatsapp: string;
  facebook: string;
  location: string;
  aboutText: string;
}