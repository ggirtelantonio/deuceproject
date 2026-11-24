# DEUCE — AI business operating system

## What I'll keep
The dashboard you uploaded is already working here: sign-in through Lovable Cloud, workspaces and team members, the sidebar frame, command menu, data tables, forms, charts and kanban. I'll reshape these pieces instead of rebuilding them.

## Look
- Dark only, on a graphite background, with thin, quiet borders and an electric-cyan highlight color (no purple).
- Type: Geist for text and Geist Mono for numbers and labels. Tighter spacing and smooth hover and page transitions.
- I'll add a new "deuce" color theme and make it the default. The old theme picker and light/dark switch come out.
- The sign-in screens get the DEUCE brand.

## Sidebar
Overview · AI Employees · Workflows · Customers · Analytics · Integrations · Settings. All seven open real pages. The workspace switcher and account menu stay.

## Pages
1. **Overview**: active AI employees, tasks completed, success rate and hours saved, plus productivity charts (the existing charts with new data), recent activity, and pending approvals. Approve and Reject change the item's status in this demo.
2. **AI Employees**: cards for specialized roles (Sales Development, Support, Finance Ops, Recruiting, Marketing, Data Analyst). Each card shows responsibilities, status (active, paused, needs review) and a detail panel with past runs.
3. **Workflows**: a visual step view of each business process (trigger, steps, approval, outcome), with a list showing status, last run and owner. You can pause and resume them in the demo.
4. **Customers**: built on the existing products/users table pattern (search, filters, sort, paging) with a detail side panel and an add/edit form.
5. **Analytics**: the existing chart components, showing trends by employee and workflow.
6. **Integrations**: a catalog (Slack, HubSpot, Gmail, Stripe, Notion and others). Every one is marked **Not connected**, with no fake connect button.
7. **Settings**: profile, password, workspace and team. These are the real pages that already work.

The old demo pages (products, kanban, chat, form demos, icons, React Query, pokemon) leave the menu. Their files stay in the project, so nothing that works gets deleted.

## Honesty rules
- All employee, workflow, run and customer data is clearly demo data, stored in the browser. A small "Demo data" badge says so.
- Nothing pretends to run AI or connect to outside services. Buttons that would start a run say it's not available yet.

## Migration risks
- **Old users**: if you had real users in the old sign-in service, they need to sign up again. I can import them if you send a user export.
- **Billing** is held until you choose a payment provider.
- **Sentry** error tracking was not carried over. The built-in error reporting covers this for now.
- **Leftover demo pages** stay in the project but are hidden. I can remove them later.
- **Demo data isn't saved to the database**, so it resets on refresh. Saving real employees, workflows and customers to the database is a follow-up step once you want it.
- I haven't yet checked signed-in pages in a browser. I'll do that after the redesign.

## Technical notes
- New `deuce` theme file in src/styles/themes, set as DEFAULT_THEME. Force `dark` class and remove the mode toggle and theme selector from the header.
- nav-config.ts is rewritten to the 7 items. New routes go under `_authenticated/dashboard/` (employees, workflows, customers, analytics, integrations, settings). Settings reuses the profile and team views.
- Demo data goes in `src/constants/deuce-data.ts`. Interactive state (approvals, pause/resume) uses zustand stores, following the kanban store pattern.
- Customers reuses the data-table, useDataTable and nuqs search-param setup.
