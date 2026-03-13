import type { TrustResult, InputMode, FIR } from "~/types/trust";

// Simulates an API call — swap with real fetch() later
export async function verifyInput(
  value: string,
  mode: InputMode
): Promise<TrustResult> {
  await new Promise((res) => setTimeout(res, 1800)); // fake latency

  const lower = value.toLowerCase();

  // --- UNSAFE scenario ---
  if (lower.includes("scam") || lower.includes("fake") || lower.includes("QR-FAKE-001")) {
    return {
      inputValue: value,
      mode,
      trustScore: 12,
      trustLevel: "unsafe",
      registrations: [
        { body: "BIS", registered: false },
        { body: "FSSAI", registered: false },
        { body: "MCA", registered: false },
      ],
      alerts: [
        {
          id: "a1",
          severity: "danger",
          message: "This domain is flagged in the National Cyber Crime database.",
        },
        {
          id: "a2",
          severity: "danger",
          message: "No valid BIS or FSSAI registration found.",
        },
        {
          id: "a3",
          severity: "warning",
          message: "Multiple consumer complaints filed in the last 30 days.",
        },
      ],
      ...(mode === "qr"
        ? {
            product: {
              name: "Unknown Product",
              manufacturer: "Unverified Manufacturer",
              batchNumber: "BATCH-UNKNOWN",
              manufacturedDate: "N/A",
              expiryDate: "N/A",
              category: "Unknown",
            },
          }
        : {}),
    };
  }

  // --- WARNING scenario ---
  if (lower.includes("warn") || lower.includes("QR-WARN-002")) {
    return {
      inputValue: value,
      mode,
      trustScore: 54,
      trustLevel: "warning",
      registrations: [
        { body: "BIS", registered: true, registrationNumber: "BIS/2021/34521" },
        { body: "FSSAI", registered: false },
        { body: "MCA", registered: true, registrationNumber: "U74999MH2018PTC123456" },
      ],
      alerts: [
        {
          id: "b1",
          severity: "warning",
          message: "FSSAI registration is missing or expired.",
        },
        {
          id: "b2",
          severity: "info",
          message: "BIS certification is valid but product recall notice issued in 2023.",
        },
      ],
      ...(mode === "qr"
        ? {
            product: {
              name: "Packaged Snack Mix",
              manufacturer: "Alpha Foods Pvt. Ltd.",
              batchNumber: "AFB-2024-0872",
              manufacturedDate: "2024-01-15",
              expiryDate: "2025-01-14",
              category: "Food & Beverage",
            },
          }
        : {}),
    };
  }

  // --- SAFE scenario (default) ---
  return {
    inputValue: value,
    mode,
    trustScore: 91,
    trustLevel: "safe",
    registrations: [
      {
        body: "BIS",
        registered: true,
        registrationNumber: "BIS/2022/78901",
        expiresAt: "2026-12-31",
      },
      {
        body: "FSSAI",
        registered: true,
        registrationNumber: "FSSAI-10023456789012",
        expiresAt: "2026-06-30",
      },
      {
        body: "MCA",
        registered: true,
        registrationNumber: "U74999MH2020PTC987654",
      },
    ],
    alerts: [
      {
        id: "c1",
        severity: "info",
        message: "All registrations are valid and up to date.",
      },
    ],
    ...(mode === "qr"
      ? {
          product: {
            name: "Organic Whole Wheat Atta 5kg",
            manufacturer: "NatureFresh Mills Pvt. Ltd.",
            batchNumber: "NFM-2024-A4421",
            manufacturedDate: "2024-03-10",
            expiryDate: "2025-03-09",
            category: "Food & Grocery",
          },
        }
      : {}),
  };
}

const mockTrustData = [
  { website: "amazon.com", trustScore: 87, category: "marketplace", reviews: 2847 },
  { website: "shadydeals.net", trustScore: 23, category: "discount", reviews: 12 },
  { website: "ebay.com", trustScore: 82, category: "auction", reviews: 5621 },
  { website: "unknownshoppe.io", trustScore: 34, category: "retail", reviews: 28 },
  { website: "paypal.com", trustScore: 91, category: "payments", reviews: 8934 },
  { website: "cheapstuffnow.com", trustScore: 18, category: "discount", reviews: 4 },
  { website: "walmart.com", trustScore: 79, category: "retail", reviews: 3456 },
  { website: "cryptomining-offers.biz", trustScore: 12, category: "crypto", reviews: 2 },
  { website: "bestbuy.com", trustScore: 85, category: "electronics", reviews: 4123 },
  { website: "microsoftstore.com", trustScore: 93, category: "official", reviews: 6789 }
];

export async function generateFIRFromVoice(
  voiceTranscript: string,
  complainantName: string,
  complainantPhone: string
): Promise<FIR> {
  await new Promise((res) => setTimeout(res, 2000)); // simulate processing

  const transcript = voiceTranscript.toLowerCase();
  
  // Determine incident severity and type
  let severity: "low" | "medium" | "high" | "critical" = "medium";
  let incidentType = "general_complaint";
  
  if (transcript.includes("scam") || transcript.includes("fraud")) {
    severity = "high";
    incidentType = "fraud";
  } else if (transcript.includes("money") || transcript.includes("payment")) {
    severity = "high";
    incidentType = "financial_fraud";
  } else if (transcript.includes("fake") || transcript.includes("counterfeit")) {
    severity = "critical";
    incidentType = "counterfeit_product";
  } else if (transcript.includes("threat") || transcript.includes("harassment")) {
    severity = "critical";
    incidentType = "harassment";
  } else if (transcript.includes("quality") || transcript.includes("defective")) {
    severity = "low";
    incidentType = "product_quality";
  }

  const involvedWebsite = extractWebsite(voiceTranscript);

  return {
    id: `FIR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    complainantName,
    complainantPhone,
    incidentDescription: voiceTranscript,
    incidentType,
    incidentDate: new Date().toISOString().split('T')[0],
    involvedWebsite: involvedWebsite || undefined,
    severity,
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function extractWebsite(text: string): string | null {
  const urlPattern = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})/;
  const match = text.match(urlPattern);
  return match ? match[0] : null;
}
