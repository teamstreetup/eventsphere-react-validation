# EventSphere 2026 — ReactJS Client-Side Validation & Interactive Summit Portal

> **Web Technology (WT) Lab Assignment**  
> **Topic:** Design, develop and deploy a web application using ReactJS to demonstrate client-side validation and interactive functionality.  
> **Deployment Link:** [https://teamstreetup.github.io/eventsphere-react-validation/](https://teamstreetup.github.io/eventsphere-react-validation/)  
> **Repository:** [https://github.com/teamstreetup/eventsphere-react-validation](https://github.com/teamstreetup/eventsphere-react-validation)

---

## 📌 Executive Overview

**EventSphere 2026** is a production-grade, responsive single-page web application built with **ReactJS** and **Vite**. It models an enterprise-grade Tech Summit & Developer Workshop registration portal designed to demonstrate comprehensive client-side form validation, real-time feedback, reactive calculations, state management, and modern user experience (UX) paradigms.

---

## 🎯 Assignment Objectives & Compliance

| Requirement | Implementation Detail in EventSphere 2026 | Status |
| :--- | :--- | :---: |
| **1. Individual ReactJS App** | Modular component architecture built using React 19 and modern functional components with hooks (`useState`, `useEffect`, `useMemo`). | ✅ Completed |
| **2. Client-Side Validation** | Strict regex patterns, numeric range boundaries, temporal age constraints, multi-selection limits, and password security policies. | ✅ Completed |
| **3. Meaningful Error Messages** | Clear, accessible, color-coded inline error alerts with warning icons displayed on invalid inputs. | ✅ Completed |
| **4. Success Messages & Confirmation** | Interactive confirmation modal, celebratory confetti animation, and a downloadable/printable Digital Attendee Pass badge. | ✅ Completed |
| **5. Interactive Functionality** | 4-step progressive disclosure form, real-time password strength meter, live character counter, dynamic pricing calculator with coupon support (`STUDENT50`, `EARLYBIRD`), dark/light theme switch, and attendee registry with search & filters. | ✅ Completed |
| **6. User-Friendly Interface** | Modern UI with smooth micro-interactions, responsive grid/flexbox layout, and keyboard accessibility. | ✅ Completed |
| **7. Input Testing** | Automated test suite (`test-validation.js`) with 42 unit tests covering all valid, invalid, and edge cases. Built-in "Fill Valid Data" and "Test Error States" buttons for live viva demonstration. | ✅ Completed |
| **8. Deployment** | Live deployment on GitHub Pages with continuous build verification. | ✅ Completed |

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework:** React 19 (`react`, `react-dom`)
- **Build Tool:** Vite 8 (Ultra-fast HMR and optimized production bundling)
- **Styling:** Modern CSS3 with CSS Custom Properties (Variables), Flexbox, CSS Grid, and responsive media queries
- **Icons:** `lucide-react`
- **Effects:** `canvas-confetti`
- **Testing:** Custom automated validation test runner (42 test assertions)
- **Hosting & Deployment:** GitHub Pages

---

## 📋 Comprehensive Form Validation Matrix

| Field | Validation Rule / Technique | Error Message Triggered | Success / Valid State |
| :--- | :--- | :--- | :--- |
| **Full Name** | Regex: `/^[A-Za-z]+([ A-Za-z'-]+)*$/`, 3 to 50 chars | *"Full name must be at least 3 characters long"* / *"Only alphabetic letters allowed"* | Green border + checkmark |
| **Email Address** | Strict RFC 5322 regex + Domain typo detection heuristic | *"Please enter a valid email address"* / *"Did you mean @gmail.com?"* | Domain validated |
| **Mobile Number** | Exact 10 digits, Telecom prefixes (`/^[6-9]\d{9}$/`) | *"Must be exactly 10 digits starting with 6, 7, 8, or 9"* | 10 valid digits confirmed |
| **Date of Birth** | Temporal math against current date; Age $\ge 18$; No future dates | *"Attendees must be at least 18 years old to register"* / *"Cannot be in the future"* | Valid age approved |
| **Gender** | Required dropdown selection | *"Please select your gender identification"* | Option selected |
| **Institution** | Required, minimum 3 characters | *"College or Organization name is required (min 3 chars)"* | Verified string |
| **Portfolio URL** | Optional; if entered, requires valid protocol (`https://...`) | *"Please enter a valid URL starting with http:// or https://"* | Valid URL format |
| **Statement / Bio** | Min 30 characters, Max 300 characters with live counter | *"Bio is too short. Please write at least 30 characters (X/30)"* | Character counter turns green |
| **Pass Tier** | 1 of 3 options (Student: ₹499, Developer: ₹1,499, VIP: ₹2,999) | Auto-selected by default | Card highlight + reactive price update |
| **Workshops** | Checkbox multi-select; Min 1, Max 3 tracks | *"Please select at least 1 workshop"* / *"Maximum 3 workshops allowed"* | Selected 1 to 3 items |
| **Password** | 8+ chars, $\ge 1$ uppercase, $\ge 1$ lowercase, $\ge 1$ digit, $\ge 1$ special symbol | Real-time score indicator; *"Password must contain uppercase, lowercase, digit, and symbol"* | Strength bar turns green (Strong 5/5) |
| **Confirm Password** | Exact string matching (`confirmPassword === password`) | *"Passwords do not match. Please ensure both fields are identical"* | Match confirmed |
| **Terms & Conduct** | Required checkbox boolean (`true`) | *"You must accept the terms of service to proceed"* | Checked |

---

## 💡 Key Interactive Features

1. **Multi-Step Form Wizard:**
   - 4 modular steps (Personal Info $\rightarrow$ Academic Profile $\rightarrow$ Pass & Workshops $\rightarrow$ Security & Review).
   - Step gating ensures users cannot proceed until current step inputs satisfy all validation checks.
2. **Interactive Real-Time Price Engine:**
   - Calculates base ticket tier + workshop fees (waived for VIP passes).
   - Instant coupon code verification:
     - `STUDENT50`: 50% discount
     - `EARLYBIRD`: 25% discount
     - `DEVCON`: Flat ₹300 discount
3. **Password Security Inspector:**
   - Real-time 5-point criteria checklist with green checkmark transitions.
   - Dynamic animated strength bar (Weak $\rightarrow$ Moderate $\rightarrow$ Strong $\rightarrow$ Very Strong).
   - Show/Hide password toggle buttons.
4. **Interactive Sandbox Evaluation Buttons:**
   - **"Fill Valid Data":** Pre-populates a complete valid attendee profile for fast 1-click verification.
   - **"Test Error States":** Deliberately populates invalid inputs (underage DOB, invalid phone, typo email, weak password) to immediately showcase all validation alerts to the examiner.
5. **Printable Digital Pass:**
   - Automatically renders upon successful submission with a unique Badge ID (`ES-2026-XXXX`), simulated QR code, and print styling (`window.print()`).
6. **Confirmed Attendees Directory (Local Persistence):**
   - Stores submitted attendee records in `localStorage`.
   - Real-time search by name, email, or institution.
   - Filter by pass tier and exportable as JSON.
7. **Dark / Light Mode Toggle:**
   - High-contrast, theme-switchable UI with local storage persistence.

---

## 🚀 Running the Project Locally

```bash
# 1. Clone the repository
git clone https://github.com/teamstreetup/eventsphere-react-validation.git
cd eventsphere-react-validation

# 2. Install dependencies
npm install

# 3. Run validation tests (42 tests)
npm test

# 4. Start local development server
npm run dev

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```

---

## 🧪 Automated Test Results

Run `npm test` to execute the automated validation suite:
```
====================================================
  EventSphere 2026 - Client-Side Validation Tests
====================================================

[1] Full Name Validation: 5/5 Passed
[2] Email Validation: 6/6 Passed
[3] Mobile Phone Number Validation: 6/6 Passed
[4] Date of Birth & Age (18+) Validation: 4/4 Passed
[5] Institution Validation: 3/3 Passed
[6] Bio / Statement of Purpose (30 - 300 Chars): 3/3 Passed
[7] Workshop Multi-Select (1 to 3) Validation: 4/4 Passed
[8] Password Strength & Criteria Tests: 5/5 Passed
[9] Confirm Password Match: 2/2 Passed
[10] Full Form Step & Overall Validation: 4/4 Passed

====================================================
Test Execution Completed: 42 Passed, 0 Failed
====================================================
```

---

## 🎓 Viva Questions & Answers for Students

<details>
<summary><strong>Q1: What is client-side validation and why is it important in web applications?</strong></summary>

**Answer:** Client-side validation is the process of verifying user input in the web browser *before* submitting data to the server. It is crucial because:
1. It provides instantaneous feedback to users without waiting for a server round-trip.
2. It reduces server bandwidth and processing load by filtering out malformed requests.
3. It improves user experience (UX) with contextual hints, inline highlights, and guided corrections.
*(Note: Client-side validation does not replace server-side validation; security-critical validation must always be verified on the server as well.)*
</details>

<details>
<summary><strong>Q2: How is state managed across the multi-step form in this React application?</strong></summary>

**Answer:** We utilize React's `useState` hook to manage centralized state objects:
- `formData`: Holds all form values across all 4 steps.
- `errors`: A dictionary storing specific field error messages.
- `touched`: Tracks which input fields the user has visited or interacted with, ensuring error messages are displayed gracefully on blur or change rather than intimidating the user prematurely.
- `currentStep` and `completedSteps`: Govern progressive step disclosure and navigation locks.
</details>

<details>
<summary><strong>Q3: How does the application calculate dynamic pricing and coupon discounts?</strong></summary>

**Answer:** We use the `useMemo` hook to recompute the subtotal, add-on workshop costs, and applied promo code discount whenever `formData.passTier`, `formData.selectedWorkshops`, or `formData.promoCode` changes. This ensures $O(1)$ re-renders and smooth UI reactivity.
</details>

---

## 📄 License
Open-source under the MIT License. Developed for academic demonstration in Web Technology (WT).
