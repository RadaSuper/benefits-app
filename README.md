# Benefits Application

* **Stack:** React, TypeScript, and [Vite/Next.js].
* **Dependencies:** Zustand, Immer, React Hook Form, Tailwind CSS, uuid.
* **Prerequisites:** Node.js (v22+) and npm/yarn.

## Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# or

# Start production ready build
npm run start
```

The application will be available at `http://localhost:5173` (or the next available port).

## Architectural Decisions and Trade-Offs

### 1. Stack and Environment

* **Custom Setup (TypeScript):** I opted to use a clean **React/TypeScript setup** instead of the provided JavaScript starter files. This was a deliberate choice to ensure **type safety, code robustness, and better long-term maintainability**.
* **Styling (Tailwind CSS):** Tailwind CSS was chosen as a trade-off to minimize time spent on writing custom CSS.

### 2. State and Data Integrity

* **Zustand + Immer + Normalization:** State management utilizes **Zustand** with the **Immer middleware**. I implemented a **normalized data structure** (separate `employees` and `dependents` dictionaries linked by IDs) to ensure **data consistency** and efficient updates.
* **Persistence:** State persistence is achieved efficiently using the **Zustand `persist` middleware** integrated with `localStorage`.
* **IDs:** Unique IDs are generated using the `uuid` package to ensure production-level data integrity during CRUD operations.

## Financial Integrity (Critical Trade-Off)

* **Floating-Point Risk:** The calculation logic involving payroll data is susceptible to **IEEE 754 floating-point errors** inherent to native JavaScript numbers.
* **Mitigation:** In a production environment, I would integrate a dedicated financial library, such as **`decimal.js` or `big.js`**, to ensure all calculations are performed with **guaranteed precision**. This is a crucial architectural decision to prevent errors in payroll data.
