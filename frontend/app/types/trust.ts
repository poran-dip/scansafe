export type TrustLevel = "safe" | "warning" | "unsafe";
export type InputMode = "url" | "qr";

export interface RegistrationStatus {
  body: "BIS" | "FSSAI" | "MCA";
  registered: boolean;
  registrationNumber?: string;
  expiresAt?: string;
}

export interface ProductDetails {
  name: string;
  manufacturer: string;
  batchNumber: string;
  manufacturedDate: string;
  expiryDate: string;
  category: string;
}

export interface TrustAlert {
  id: string;
  severity: "info" | "warning" | "danger";
  message: string;
}

export interface TrustResult {
  inputValue: string;
  mode: InputMode;
  trustScore: number;
  trustLevel: TrustLevel;
  registrations: RegistrationStatus[];
  alerts: TrustAlert[];
  product?: ProductDetails;
}

export interface FIR {
  id: string;
  complainantName: string;
  complainantPhone: string;
  incidentDescription: string;
  incidentType: string;
  incidentDate: string;
  involvedWebsite?: string;
  relevantDocuments?: string[];
  severity: "low" | "medium" | "high" | "critical";
  status: "draft" | "submitted" | "under-review" | "resolved";
  createdAt: string;
  updatedAt: string;
}
