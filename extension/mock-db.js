// mock-db.js — shared between popup and background
// Hardcoded BIS/FSSAI registry for known Indian domains

const SITE_DB = {
  // ── SAFE ────────────────────────────────────────────────────────
  "flipkart.com": {
    trustScore: 94,
    trustLevel: "safe",
    bis: { registered: true, number: "BIS/MKT/2019/FL-9821", expires: "2026-12-31" },
    fssai: { registered: true, number: "FSSAI-11521000000891", expires: "2026-06-30" },
    mca: { registered: true, number: "U74999KA2012PTC066107" },
    companyName: "Flipkart Internet Pvt. Ltd.",
    category: "E-Commerce Marketplace",
    alerts: [],
  },
  "amazon.in": {
    trustScore: 96,
    trustLevel: "safe",
    bis: { registered: true, number: "BIS/MKT/2018/AZ-4401", expires: "2027-03-31" },
    fssai: { registered: true, number: "FSSAI-10016011002478", expires: "2026-09-30" },
    mca: { registered: true, number: "U74999MH2012FTC231341" },
    companyName: "Amazon Seller Services Pvt. Ltd.",
    category: "E-Commerce Marketplace",
    alerts: [],
  },
  "myntra.com": {
    trustScore: 89,
    trustLevel: "safe",
    bis: { registered: true, number: "BIS/MKT/2020/MY-3312", expires: "2026-08-31" },
    fssai: { registered: false, number: null, expires: null },
    mca: { registered: true, number: "U52100KA2007PTC041799" },
    companyName: "Myntra Designs Pvt. Ltd.",
    category: "Fashion & Apparel",
    alerts: [
      { severity: "info", message: "FSSAI not required — non-food category." },
    ],
  },
  "tatacliq.com": {
    trustScore: 91,
    trustLevel: "safe",
    bis: { registered: true, number: "BIS/MKT/2021/TC-7741", expires: "2027-01-31" },
    fssai: { registered: true, number: "FSSAI-10020022006652", expires: "2026-11-30" },
    mca: { registered: true, number: "U52100MH2015PTC265790" },
    companyName: "Tata UniStore Ltd.",
    category: "E-Commerce Marketplace",
    alerts: [],
  },
  "nykaa.com": {
    trustScore: 88,
    trustLevel: "safe",
    bis: { registered: true, number: "BIS/MKT/2020/NK-5509", expires: "2026-07-31" },
    fssai: { registered: true, number: "FSSAI-13320055000784", expires: "2026-04-30" },
    mca: { registered: true, number: "U52600MH2012PLC234198" },
    companyName: "FSN E-Commerce Ventures Ltd.",
    category: "Beauty & Personal Care",
    alerts: [],
  },
  "meesho.com": {
    trustScore: 82,
    trustLevel: "safe",
    bis: { registered: true, number: "BIS/MKT/2021/MS-2287", expires: "2026-06-30" },
    fssai: { registered: false, number: null, expires: null },
    mca: { registered: true, number: "U74900KA2015PTC082263" },
    companyName: "Fashnear Technologies Pvt. Ltd.",
    category: "Social Commerce",
    alerts: [
      { severity: "info", message: "FSSAI registration not applicable for this category." },
    ],
  },
  "snapdeal.com": {
    trustScore: 78,
    trustLevel: "warning",
    bis: { registered: true, number: "BIS/MKT/2017/SD-1190", expires: "2025-12-31" },
    fssai: { registered: false, number: null, expires: null },
    mca: { registered: true, number: "U74899DL2009PTC195534" },
    companyName: "Jasper Infotech Pvt. Ltd.",
    category: "E-Commerce Marketplace",
    alerts: [
      { severity: "warning", message: "BIS certification expires soon — renewal pending." },
      { severity: "warning", message: "FSSAI registration not found for food product listings." },
    ],
  },
  // ── WARNING ─────────────────────────────────────────────────────
  "shopclues.com": {
    trustScore: 51,
    trustLevel: "warning",
    bis: { registered: true, number: "BIS/MKT/2016/SC-0041", expires: "2024-03-31" },
    fssai: { registered: false, number: null, expires: null },
    mca: { registered: true, number: "U74999HR2011PTC044777" },
    companyName: "Clues Network Pvt. Ltd.",
    category: "E-Commerce Marketplace",
    alerts: [
      { severity: "danger", message: "BIS certification has expired (March 2024)." },
      { severity: "warning", message: "Multiple unresolved consumer complaints on record." },
      { severity: "info", message: "Company is operational but certification lapsed." },
    ],
  },
  // ── UNSAFE ──────────────────────────────────────────────────────
  "fake-flipkart.com": {
    trustScore: 4,
    trustLevel: "unsafe",
    bis: { registered: false, number: null, expires: null },
    fssai: { registered: false, number: null, expires: null },
    mca: { registered: false, number: null },
    companyName: "Unknown",
    category: "Unclassified",
    alerts: [
      { severity: "danger", message: "Domain flagged in National Cyber Crime database." },
      { severity: "danger", message: "Impersonating a registered brand (Flipkart)." },
      { severity: "danger", message: "No BIS, FSSAI, or MCA registration found." },
    ],
  },
  "cheapgadgets-india.net": {
    trustScore: 9,
    trustLevel: "unsafe",
    bis: { registered: false, number: null, expires: null },
    fssai: { registered: false, number: null, expires: null },
    mca: { registered: false, number: null },
    companyName: "Unknown",
    category: "Unclassified",
    alerts: [
      { severity: "danger", message: "No regulatory registration of any kind." },
      { severity: "danger", message: "Reported for selling counterfeit electronics." },
      { severity: "warning", message: "Domain registered less than 30 days ago." },
    ],
  },
};

// Resolve a full URL or bare hostname → DB entry or null
function lookupDomain(input) {
  try {
    const hostname = new URL(
      input.startsWith("http") ? input : `https://${input}`
    ).hostname.replace(/^www\./, "");
    return { hostname, data: SITE_DB[hostname] || null };
  } catch {
    return { hostname: input, data: null };
  }
}
