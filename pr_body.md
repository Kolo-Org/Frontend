## 🚀 Overview

This Pull Request implements the high-fidelity User Dashboard screen for the Kolo MVP exactly as defined in the Figma design system. It establishes the foundational layout and introduces reusable, responsive widgets that form the core of the dashboard experience.

## ✨ Key Features & Deliverables

- **Dashboard Layout**: Implemented a responsive dashboard structure in `src/app/(dashboard)/dashboard/page.tsx` utilizing CSS Grid. The layout gracefully collapses from a multi-column desktop view into a single-column scrollable mobile view.
- **Reusable Widgets**:
  - `BalanceCard`: Displays total wallet balance, trend percentage, and actionable Send/Deposit buttons with Lucide icons.
  - `SavingsCircles`: Renders a grid of active savings groups, complete with progress bars, milestone dates, and overlapping member avatars.
  - `TransactionList`: A clean, status-aware list of recent activities highlighting positive/negative amounts dynamically.
- **Data Integration**: Successfully wired the static UI to our custom data hooks (`useWallet`, `useGroups`, `usePayments`). Implemented robust loading states (skeleton loaders) and error boundaries to ensure the layout remains intact regardless of the data fetch state.
- **Component Testing**: Added comprehensive unit tests for each dashboard widget and the main dashboard page using Vitest and React Testing Library (with mocked API data) to verify rendering across different states.

## 🛠 Relevant Files Modified

- `src/app/(dashboard)/dashboard/page.tsx`
- `src/components/dashboard/BalanceCard/BalanceCard.tsx`
- `src/components/dashboard/SavingsCircles/SavingsCircles.tsx`
- `src/components/dashboard/TransactionList/TransactionList.tsx`
- `src/hooks/useGroups.ts`, `src/hooks/usePayments.ts`, `src/hooks/useWallet.ts`
- `src/__tests__/dashboard/*.test.tsx`

## ✅ Acceptance Criteria Met

- [x] Dashboard Layout matches Figma design exactly.
- [x] Reusable widgets built.
- [x] Wired to hooks for data integration.
- [x] CSS Grid responsive layout implemented.
- [x] Component tests passing.

Please review the attached changes!
