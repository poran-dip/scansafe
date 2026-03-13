import type { TrustResult, InputMode } from "~/types/trust";

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
