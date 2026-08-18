# BudgetVault — Vue 3 + Tailwind CSS + Pinia

A conversion of the original static HTML/CSS/JS BudgetVault product demo into a
component-based Vue 3 app, styled with Tailwind CSS utility classes, with all
app state (current view, sidebar, collaboration submenu, toasts, AI Coach chat)
managed by a Pinia store.

## Getting started

```bash
npm install
npm run dev       # start local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## Project structure

```
src/
  main.js              # app bootstrap (Vue + Pinia)
  App.vue              # layout shell + view switcher
  style.css            # Tailwind entry point
  stores/
    app.js             # Pinia store: navigation, sidebar, toast, AI coach chat
  components/
    Sidebar.vue         # left nav, incl. Collaboration submenu
    Toast.vue           # bottom-right toast notification
    PageHeader.vue       # shared eyebrow / title / subtitle / actions header
    BasePanel.vue        # card/panel wrapper with optional head slot
    StatCard.vue          # dashboard-style stat tile
    Metric.vue            # smaller metric tile used in metric rows
    Pill.vue                # colored status badge
    ProgressTrack.vue        # horizontal progress bar
    ListRow.vue                # generic list row (title/sub/value)
    VaultShell.vue              # shared dark themed shell for Couple/Business/Student vaults
  views/
    Dashboard.vue, Banks.vue, SmartVaults.vue, BudgetPlanner.vue,
    ExpenseTracking.vue, BillSettlement.vue, Goals.vue, Notifications.vue,
    MoneyCalendar.vue, FinancialGps.vue, Subscriptions.vue,
    MoneyPersonality.vue, YearEndReview.vue, AiCoach.vue,
    Business.vue, Couple.vue, Student.vue
```

## Notes on the conversion

- Navigation is driven entirely by the Pinia store (`app.currentView`); `App.vue`
  maps view ids to components and swaps them with `<component :is>` instead of
  the original `display:none/active` class toggling.
- The mobile hamburger menu / sidebar-open state, the Collaboration submenu
  open/closed state, toast visibility, and the AI Coach conversation are all
  Pinia state, so they behave the same across every component that reads them.
- Colors, radii and shadows from the original CSS custom properties were ported
  into `tailwind.config.js` (`bvgreen`, `bvgold`, `bvmint`, `bvcream`, etc.) so
  markup uses Tailwind utility classes (with a few arbitrary-value utilities
  for the exact pixel values from the source design) instead of the original
  hand-written CSS file.
- The AI Coach's canned reply logic from the original inline `<script>` was
  moved into the Pinia store (`coachAsk` action) so any component can trigger
  a coach exchange.
