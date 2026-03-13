# **ScanSafe: Consumer Safety & Authenticity Validator**

## **Project Overview**

ScanSafe is a **consumer protection ecosystem** designed to enforce the **Right to Safety**, **Right to Be Informed**, and **Right to Seek Redressal** in India. The system empowers users to verify the **authenticity of businesses and products**, cross-check product safety, and file complaints or FIRs if scammed.

The solution consists of a **Chrome extension + PWA/dashboard** with optional TTS and AI-powered features for future scaling.

---

## **Problem Statement**

* Many consumers unknowingly buy products from unverified or fraudulent vendors.
* Lack of accessible, real-time verification of **BIS/FSSAI certifications**.
* Filing complaints (FIRs) is manual, cumbersome, and inaccessible to many consumers.
* Particularly relevant in **Assam and Northeast India**, where local markets and small distributors often operate without transparency.

**Consumer Rights Violated:**

1. **Right to Safety** – fake/exploding electronics, unsafe food.
2. **Right to Be Informed** – misleading product info, hidden ingredients.
3. **Right to Seek Redressal** – lack of easy complaint filing.

---

## **Standards Referenced**

* **BIS Standards:** IS 16046 (Lithium Battery Safety), IS 13252 (IT Equipment Safety), IS 14534, IS 9833 (Food Labeling & Safety)
* **FSSAI Standards:** Food Safety & Labeling, ISO 22000 equivalent
* **Legal Framework:** Indian Penal Code for fraud, FIR filing requirements
* **Policy Recommendation:** Open REST API access for BIS/FSSAI product & business verification

---

## **Solution Architecture**

### **Modules**

1. **Chrome Extension: Website/Business Authenticity Validator**

   * Checks if business/website is **registered with BIS/FSSAI**
   * Displays **authenticity score / safe/unsafe warning**
   * Uses additional metrics: website age, location, user reviews

2. **MVP Backend**

   * Scrapes **public BIS/FSSAI recall lists & open data**
   * Matches products / businesses against scraped datasets
   * Provides verified info to extension & PWA

3. **Automated FIR Filing System**

   * Pre-fills FIR forms with: URL, product info, batch number, violation type
   * Tracks FIR status in **user dashboard**
   * Optional integration with **local law enforcement portals**

4. **Policy Recommendation Layer**

   * Highlights lack of **real-time APIs**
   * Suggests **official REST API for public verification**, aligning with Open Data Initiative

5. **Optional Extensions**

   * **TTS:** read out warnings for visually impaired users
   * AI image recognition to detect counterfeit packaging
   * IoT integration for product condition monitoring (electronics, cold-chain food)

---

## **Block Diagram / Flow**

```
[Website / Product QR] --> [Chrome Extension / PWA]
         |                  |
         |                  --> [Scraped BIS/FSSAI Database Lookup]
         |                  --> [Authenticity Score / Safety Warning]
         |                  --> [Automated FIR Filing Module] --> [Law Enforcement / Dashboard]
         |
         --> [Policy Recommendation Layer] (REST API Proposal)
```

---

## **Implementation Plan**

### **Tech Stack**

* **Frontend:** React/PWA, Chrome Extension API, Tailwind CSS
* **Backend:** Node.js/Express, Python (for scraping / AI modules)
* **Database:** MongoDB
* **Hosting:** Vercel

### **Database Design**

**Tables / Collections**:

1. **Users**

   * id, name, email, profile preferences (allergies, dietary restrictions, electronics safety flags)

2. **Products**

   * product_id, name, category, batch_no, MRP, manufacturer_id, expiry_date, safety_status, ingredients

3. **Manufacturers / Businesses**

   * business_id, name, registration_number (BIS/FSSAI), website_url, registration_status, rating_metrics

4. **FIRs / Complaints**

   * fir_id, user_id, product_id, business_id, complaint_type, status, filing_date, police_reference

5. **Scraped Data / Lookup Tables**

   * BIS certified products, recall lists, FSSAI licenses, public ratings

---

### **External APIs / Data Sources**

* **FSSAI License Verification API** (third-party / Gridlines API or similar)
* **Public BIS Care Data / Certification Lists** (scraped)
* Optional **MRP / price check APIs** (local e-commerce APIs)
* Optional **OpenStreetMap / Geo APIs** for regional authenticity scoring

---

### **MVP vs Ambitious Features**

| Feature               | MVP                                            | Ambitious                                                               |
| --------------------- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| Business Verification | Chrome Extension checks scraped BIS/FSSAI data | Real-time REST API integration with BIS/FSSAI                           |
| Product Safety        | Scraped recall lists & batch number validation | IoT + Blockchain tracking across supply chain                           |
| FIR Filing            | Pre-fill complaint form for users              | Auto-submit FIR + track updates in dashboard + push notifications       |
| User Alerts           | Safety/unsafe indicator, simple dashboard      | AI-powered counterfeit detection, TTS warnings, regional pricing alerts |
| Regional Impact       | Assam/NE focus                                 | Scalable nationwide, multi-sector (food, electronics, cosmetics)        |

---

## **Roadmap / Future Scope**

* Integrate **official BIS/FSSAI REST API** when available
* AI/ML to **detect fraudulent websites or counterfeit packaging**
* TTS & accessibility features for **visually impaired consumers**
* Expand into **other regulated products**: electronics, toys, cosmetics
* Mobile PWA & offline scanning for **rural market users**

---

## **Hackathon Pitch Angle**

* **Regulatory Alignment:** uses BIS/FSSAI standards & Open Data Initiative
* **Technical Feasibility:** MVP works using scraped open data & browser extension
* **Innovation:** combines real-time alerts, automated FIR filing, and authenticity scoring
* **Local Impact:** directly addresses **Assam/NE consumer trust gaps**, scalable nationwide

## **Team Overview**

This repository was made during the BIS hackathon 2026 held at Assam Engineering College.

Built by **Team 18**:
- [Shivayan](https://github.com/Shivayan09)
- [Parashar](https://github.com/ParasharDeb)
- [Poran Dip](https://github.com/poran-dip)
