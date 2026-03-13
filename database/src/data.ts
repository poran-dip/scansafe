// data.ts

export interface Product {
  product_id: string;
  name: string;
  category: string;
  bis_license_no: string;
  standard: string;
  status: 'Operative' | 'Expired' | 'Cancelled';
}

export interface Business {
  license_number: string;
  business_name: string;
  location: string;
  license_type: 'Central' | 'State' | 'Basic';
  status: 'Active' | 'Expired' | 'Suspended';
}

export interface Recall {
  recall_id: string;
  product_name: string;
  reason: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface Metric {
  name: string;
  avg_rating: number;
  compliance_score: number;
  total_reviews: number;
  verification_status: 'Verified' | 'Under Review' | 'Suspended';
}

// 1. BIS CERTIFIED PRODUCTS
export const bisProducts: Product[] = [
  { product_id: "P01", name: "AeroTab 10 Pro", category: "IT Gear", bis_license_no: "CM/L-8700123", standard: "IS 13252:2023", status: "Operative" },
  { product_id: "P02", name: "Z-Force VR Headset", category: "Wearables", bis_license_no: "CM/L-9100456", standard: "IS/IEC 62368-1:2023", status: "Operative" },
  { product_id: "P03", name: "NitroCharge Power Bank", category: "Power", bis_license_no: "CM/L-7600890", standard: "IS 16046:2018", status: "Operative" },
  { product_id: "P04", name: "AssamLite LED Bulb", category: "Lighting", bis_license_no: "CM/L-6200112", standard: "IS 16102:2012", status: "Operative" },
  { product_id: "P05", name: "VisionMax Smart TV", category: "Audio/Video", bis_license_no: "CM/L-4400567", standard: "IS 616:2025", status: "Operative" },
  { product_id: "P06", name: "EcoFridge 300L", category: "Home App.", bis_license_no: "CM/L-5500991", standard: "IS 17550:2024", status: "Operative" },
  { product_id: "P07", name: "VoltGuard UPS", category: "Electrical", bis_license_no: "CM/L-3300223", standard: "IS 16242:2025", status: "Operative" },
  { product_id: "P08", name: "SmartKettle v2", category: "Kitchen", bis_license_no: "CM/L-2100884", standard: "IS 302:2024", status: "Operative" },
  { product_id: "P09", name: "BlueSync Earbuds", category: "Personal", bis_license_no: "CM/L-1100776", standard: "IS 616:2025", status: "Operative" },
  { product_id: "P10", name: "Titan Router 6E", category: "IT Gear", bis_license_no: "CM/L-9900334", standard: "IS 13252:2023", status: "Expired" }
];

// 2. FSSAI LICENSES (Assam Focus)
export const fssaiLicenses: Business[] = [
  { license_number: "10023041000123", business_name: "Brahmaputra Organic Teas", location: "Dibrugarh", license_type: "Central", status: "Active" },
  { license_number: "11124056000888", business_name: "Kamakhya Dairy Coop", location: "Guwahati", license_type: "State", status: "Active" },
  { license_number: "12225067000444", business_name: "Assam Silk & Spice", location: "Jorhat", license_type: "State", status: "Active" },
  { license_number: "10022031000555", business_name: "NorthEast Mega Food Park", location: "Tihu", license_type: "Central", status: "Active" },
  { license_number: "20326001000222", business_name: "Ghy Street Bites", location: "Guwahati", license_type: "Basic", status: "Active" },
  { license_number: "11525044000333", business_name: "Rhino Fortified Rice", location: "Nagaon", license_type: "State", status: "Active" },
  { license_number: "20526009000111", business_name: "Urban Fresh Poultry", location: "Dispur", license_type: "Basic", status: "Active" },
  { license_number: "11224022000777", business_name: "Blue Hills Mineral Water", location: "Tezpur", license_type: "State", status: "Active" },
  { license_number: "11123011000666", business_name: "Saraighat Bakery", location: "Maligaon", license_type: "State", status: "Active" },
  { license_number: "20826004000999", business_name: "Misty Mountains Jam", location: "Haflong", license_type: "Basic", status: "Expired" }
];

// 3. PRODUCT RECALLS
export const recallLists: Recall[] = [
  { recall_id: "R01", product_name: "PowerMax Wall Adapter", reason: "Overheating/Fire Hazard", severity: "High" },
  { recall_id: "R02", product_name: "Nestlé Infant Formula", reason: "Bacterial Contamination", severity: "High" },
  { recall_id: "R03", product_name: "Halo Magic Sleep Suit", reason: "Choking Hazard", severity: "High" },
  { recall_id: "R04", product_name: "SunGlow LED Panel", reason: "Electric Shock Risk", severity: "High" },
  { recall_id: "R05", product_name: "NutriMix Baby Cereal", reason: "Undeclared Allergens", severity: "Medium" },
  { recall_id: "R06", product_name: "SwiftCharge E-Battery", reason: "Thermal Runaway", severity: "High" },
  { recall_id: "R07", product_name: "PureGrain Wheat Flour", reason: "Pesticide Residue", severity: "Medium" },
  { recall_id: "R08", product_name: "VisionPro Sunglasses", reason: "Lead Paint detected", severity: "Medium" },
  { recall_id: "R09", product_name: "DentaClean Brush", reason: "Battery Leakage", severity: "Low" },
  { recall_id: "R10", product_name: "SpiceRoot Turmeric", reason: "Metanil Yellow Color", severity: "High" }
];

// 4. PUBLIC RATINGS
export const publicRatings: Metric[] = [
  { name: "Apple India", avg_rating: 4.9, compliance_score: 100, total_reviews: 12500, verification_status: "Verified" },
  { name: "Samsung Electronics", avg_rating: 4.7, compliance_score: 98, total_reviews: 10200, verification_status: "Verified" },
  { name: "Noise Wearables", avg_rating: 4.5, compliance_score: 92, total_reviews: 4800, verification_status: "Verified" },
  { name: "Lava International", avg_rating: 4.2, compliance_score: 90, total_reviews: 3100, verification_status: "Verified" },
  { name: "Tata Consumer Prod", avg_rating: 4.6, compliance_score: 95, total_reviews: 8400, verification_status: "Verified" },
  { name: "Local Tech Hub Ghy", avg_rating: 3.4, compliance_score: 60, total_reviews: 150, verification_status: "Under Review" },
  { name: "Global Foods Co.", avg_rating: 2.8, compliance_score: 45, total_reviews: 2100, verification_status: "Suspended" },
  { name: "Assam Techtronics", avg_rating: 4.3, compliance_score: 88, total_reviews: 900, verification_status: "Verified" },
  { name: "Zepto", avg_rating: 4.4, compliance_score: 91, total_reviews: 15000, verification_status: "Verified" },
  { name: "Blinkit", avg_rating: 4.3, compliance_score: 89, total_reviews: 13200, verification_status: "Verified" }
];