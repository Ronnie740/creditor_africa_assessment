# Checkout Flow Implementation - Credstore Assessment

This project implements a 3-step checkout flow (Account, Shipping, Payment) using Next.js, React, TypeScript, and Tailwind CSS.

## Features Implemented

### 1. 3-Step Checkout Flow
- **Account Step:** Email and Password validation.
- **Shipping Step:** Address details and shipping method selection.
- **Payment Step:** Credit card details validation.
- **Progress Indicator:** Visualizes current step and completed steps.
- **Navigation:** Next/Back controls with data persistence between steps.

### 2. API Integration
- **Dummy Backend:** Implemented using Next.js API Routes (`app/api/checkout/...`).
- **Endpoints:**
    - `GET /api/checkout/summary`: Fetches order summary (items, subtotal, tax, shipping, total).
    - `POST /api/checkout/account`: Validates account details.
    - `POST /api/checkout/shipping`: Validates shipping details.
    - `POST /api/checkout/payment`: Validates payment details.
    - `POST /api/checkout/complete`: Finalizes the order.
- **Simulation:** Added artificial delay (400-800ms) to simulate network latency.

### 3. Internationalization (i18n)
- **Support:** English (en) and French (fr).
- **Language Switcher:** Located in the Navbar (toggles between EN/FR).
- **Scope:** Translates all labels, buttons, error messages, and step indicators.
- **Currency:** Formats prices based on the selected locale (GBP for EN, EUR formatting for FR - note: currency symbol remains consistent with API response for simplicity, but formatting rules apply).

### 4. Form Handling & Validation
- **Library:** `react-hook-form` with `zod` for schema validation.
- **Validation:** 
    - Real-time feedback (checkmarks).
    - Block progression on invalid fields.
    - API-side validation simulation.
- **Loading States:** Buttons show loading spinners during API calls.

### 5. Responsive Design
- Mobile-friendly layout using Tailwind CSS.
- Stacked layout on mobile, 2-column layout on desktop.

## Setup & Running

1. **Install Dependencies:**
   ```bash
   pnpm install
   ```

2. **Run Development Server:**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build:**
   ```bash
   pnpm build
   ```

## Design Decisions

- **State Management:** Used `react-hook-form` to manage the entire checkout form state. The form wraps all steps to easily preserve data when navigating back and forth.
- **i18n:** Implemented a lightweight `LanguageProvider` context to avoid heavy external libraries for this scope.
- **API Strategy:** API routes mock server-side logic and return success/error responses which the frontend handles gracefully.

## Project Structure

- `app/api/checkout/`: API route handlers.
- `components/Account.tsx`: Main checkout flow component.
- `components/OrderSummary.tsx`: Dynamic order summary component.
- `components/LanguageProvider.tsx`: i18n context provider.
- `lib/translations.ts`: Translation dictionary.
- `lib/schema.ts`: Zod validation schema.

