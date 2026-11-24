// DEUCE demonstration data. Everything here is sample content shown in the browser;
// nothing is executed by an AI model and no external service is connected.

export type EmployeeStatus = 'active' | 'paused' | 'review';
export type RunResult = 'success' | 'failed' | 'awaiting_approval';

export type Run = {
  id: string;
  employeeId: string;
  task: string;
  result: RunResult;
  startedAt: string; // ISO
  durationMin: number;
};

export type Employee = {
  id: string;
  name: string;
  role: string;
  department: string;
  status: EmployeeStatus;
  responsibilities: string[];
  tools: string[];
  tasksCompleted: number;
  successRate: number; // %
  hoursSaved: number;
  lastActive: string; // ISO
};

const now = new Date('2026-11-24T15:00:00Z').getTime();
const ago = (min: number) => new Date(now - min * 60_000).toISOString();

export const employees: Employee[] = [
  {
    id: 'ava', name: 'Ava', role: 'Sales Development Rep', department: 'Revenue', status: 'active',
    responsibilities: ['Qualify inbound leads within 5 minutes', 'Draft first-touch outreach for review', 'Book discovery calls on AE calendars'],
    tools: ['CRM', 'Email', 'Calendar'], tasksCompleted: 1284, successRate: 96.2, hoursSaved: 312, lastActive: ago(3)
  },
  {
    id: 'milo', name: 'Milo', role: 'Customer Support Agent', department: 'Support', status: 'active',
    responsibilities: ['Triage and tag incoming tickets', 'Answer tier-1 questions from the help center', 'Escalate billing disputes to humans'],
    tools: ['Helpdesk', 'Knowledge base'], tasksCompleted: 3410, successRate: 93.8, hoursSaved: 540, lastActive: ago(1)
  },
  {
    id: 'nora', name: 'Nora', role: 'Finance Operations', department: 'Finance', status: 'review',
    responsibilities: ['Match invoices to purchase orders', 'Flag duplicate or unusual payments', 'Prepare weekly cash summary'],
    tools: ['Accounting', 'Spreadsheets'], tasksCompleted: 642, successRate: 98.9, hoursSaved: 188, lastActive: ago(42)
  },
  {
    id: 'theo', name: 'Theo', role: 'Recruiting Coordinator', department: 'People', status: 'active',
    responsibilities: ['Screen applications against role criteria', 'Schedule interview loops', 'Send candidate status updates'],
    tools: ['ATS', 'Calendar', 'Email'], tasksCompleted: 517, successRate: 91.4, hoursSaved: 146, lastActive: ago(18)
  },
  {
    id: 'iris', name: 'Iris', role: 'Marketing Content Analyst', department: 'Marketing', status: 'paused',
    responsibilities: ['Summarize campaign performance', 'Draft social copy variants for approval', 'Monitor competitor announcements'],
    tools: ['Analytics', 'Docs'], tasksCompleted: 389, successRate: 89.7, hoursSaved: 97, lastActive: ago(60 * 26)
  },
  {
    id: 'kai', name: 'Kai', role: 'Data Analyst', department: 'Operations', status: 'active',
    responsibilities: ['Refresh weekly KPI dashboard', 'Investigate metric anomalies', 'Answer ad-hoc data questions'],
    tools: ['Warehouse', 'BI'], tasksCompleted: 721, successRate: 95.1, hoursSaved: 205, lastActive: ago(9)
  }
];

const tasksByEmployee: Record<string, string[]> = {
  ava: ['Qualified lead: Northwind Traders', 'Drafted outreach to Helios Labs', 'Booked discovery call with Quantix', 'Enriched 24 inbound leads'],
  milo: ['Resolved ticket #48213 password reset', 'Escalated refund request #48190', 'Tagged 112 tickets overnight', 'Updated macro: shipping delays'],
  nora: ['Matched 86 invoices to POs', 'Flagged duplicate payment to Apex Supply', 'Prepared weekly cash summary', 'Reconciled card transactions'],
  theo: ['Screened 41 applicants for Senior PM', 'Scheduled onsite loop for J. Alvarez', 'Sent rejection updates (12)', 'Synced interview feedback'],
  iris: ['Summarized Q4 webinar results', 'Drafted 6 LinkedIn variants', 'Logged competitor pricing change'],
  kai: ['Refreshed weekly KPI dashboard', 'Investigated churn spike in EMEA', 'Answered: CAC by channel', 'Rebuilt cohort retention table']
};

const results: RunResult[] = ['success', 'success', 'success', 'failed', 'success', 'awaiting_approval', 'success'];

export const runs: Run[] = employees.flatMap((e, ei) =>
  Array.from({ length: 8 }, (_, i) => {
    const list = tasksByEmployee[e.id] ?? [];
    return {
      id: `${e.id}-${i}`,
      employeeId: e.id,
      task: list[i % list.length] ?? 'Task',
      result: results[(i + ei) % results.length] ?? 'success',
      startedAt: ago(i * 95 + ei * 7 + 2),
      durationMin: ((i * 7 + ei * 3) % 18) + 2
    };
  })
);

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';
export type Approval = { id: string; employeeId: string; title: string; detail: string; requestedAt: string; amount?: string };

export const approvals: Approval[] = [
  { id: 'ap1', employeeId: 'nora', title: 'Release vendor payment', detail: 'Apex Supply Co. — invoice INV-20931', requestedAt: ago(12), amount: '$18,420.00' },
  { id: 'ap2', employeeId: 'ava', title: 'Send outreach sequence', detail: '14 prospects at Fortune 500 accounts', requestedAt: ago(34) },
  { id: 'ap3', employeeId: 'milo', title: 'Issue customer refund', detail: 'Order #88214 — damaged in transit', requestedAt: ago(55), amount: '$249.00' },
  { id: 'ap4', employeeId: 'iris', title: 'Publish social posts', detail: '3 LinkedIn posts for product launch', requestedAt: ago(130) }
];

export type Activity = { id: string; employeeId: string; text: string; at: string; kind: 'success' | 'warning' | 'info' };
export const activity: Activity[] = [
  { id: 'a1', employeeId: 'milo', text: 'Resolved 18 support tickets in the last hour', at: ago(4), kind: 'success' },
  { id: 'a2', employeeId: 'ava', text: 'Booked discovery call with Quantix (Enterprise)', at: ago(11), kind: 'success' },
  { id: 'a3', employeeId: 'nora', text: 'Flagged duplicate payment for review', at: ago(26), kind: 'warning' },
  { id: 'a4', employeeId: 'kai', text: 'Published weekly KPI dashboard', at: ago(48), kind: 'info' },
  { id: 'a5', employeeId: 'theo', text: 'Scheduled 6 interviews for Senior PM', at: ago(73), kind: 'success' },
  { id: 'a6', employeeId: 'iris', text: 'Paused by Jordan Lee pending brand review', at: ago(60 * 26), kind: 'warning' }
];

// 12 weeks of productivity
export const productivity = Array.from({ length: 12 }, (_, i) => {
  const base = 820 + i * 64;
  return {
    week: `W${i + 37}`,
    tasks: base + ((i * 137) % 160),
    hours: Math.round((base + ((i * 137) % 160)) * 0.19),
    successRate: Math.round((92 + ((i * 7) % 6) * 0.6) * 10) / 10
  };
});

export type WorkflowStatus = 'running' | 'paused' | 'draft';
export type WorkflowStep = { label: string; kind: 'trigger' | 'action' | 'approval' | 'outcome'; owner?: string };
export type Workflow = {
  id: string; name: string; description: string; status: WorkflowStatus; ownerId: string;
  lastRun: string; runsThisWeek: number; successRate: number; steps: WorkflowStep[];
};

export const workflows: Workflow[] = [
  {
    id: 'wf-lead', name: 'Inbound lead to booked meeting', description: 'Qualifies new leads and books calls for account executives.',
    status: 'running', ownerId: 'ava', lastRun: ago(6), runsThisWeek: 214, successRate: 94.1,
    steps: [
      { label: 'New form submission', kind: 'trigger' },
      { label: 'Enrich company data', kind: 'action', owner: 'Ava' },
      { label: 'Score against ICP', kind: 'action', owner: 'Ava' },
      { label: 'AE approves outreach', kind: 'approval' },
      { label: 'Meeting booked', kind: 'outcome' }
    ]
  },
  {
    id: 'wf-ticket', name: 'Support ticket triage', description: 'Tags, answers or escalates every incoming ticket.',
    status: 'running', ownerId: 'milo', lastRun: ago(1), runsThisWeek: 1890, successRate: 92.6,
    steps: [
      { label: 'Ticket created', kind: 'trigger' },
      { label: 'Classify intent & urgency', kind: 'action', owner: 'Milo' },
      { label: 'Draft answer from help center', kind: 'action', owner: 'Milo' },
      { label: 'Refunds need human sign-off', kind: 'approval' },
      { label: 'Ticket resolved', kind: 'outcome' }
    ]
  },
  {
    id: 'wf-ap', name: 'Invoice to payment', description: 'Matches invoices to POs and queues payments.',
    status: 'running', ownerId: 'nora', lastRun: ago(40), runsThisWeek: 86, successRate: 98.8,
    steps: [
      { label: 'Invoice received', kind: 'trigger' },
      { label: 'Match to purchase order', kind: 'action', owner: 'Nora' },
      { label: 'Finance lead approves', kind: 'approval' },
      { label: 'Payment scheduled', kind: 'outcome' }
    ]
  },
  {
    id: 'wf-hire', name: 'Candidate screening', description: 'Screens applicants and schedules interview loops.',
    status: 'paused', ownerId: 'theo', lastRun: ago(60 * 20), runsThisWeek: 41, successRate: 90.2,
    steps: [
      { label: 'Application submitted', kind: 'trigger' },
      { label: 'Screen against criteria', kind: 'action', owner: 'Theo' },
      { label: 'Hiring manager review', kind: 'approval' },
      { label: 'Interview scheduled', kind: 'outcome' }
    ]
  },
  {
    id: 'wf-report', name: 'Weekly business review', description: 'Builds the Monday KPI pack for leadership.',
    status: 'draft', ownerId: 'kai', lastRun: ago(60 * 24 * 6), runsThisWeek: 0, successRate: 0,
    steps: [
      { label: 'Every Monday 7:00', kind: 'trigger' },
      { label: 'Refresh KPI tables', kind: 'action', owner: 'Kai' },
      { label: 'Write commentary', kind: 'action', owner: 'Kai' },
      { label: 'Send to leadership', kind: 'outcome' }
    ]
  }
];

export type CustomerStatus = 'active' | 'trial' | 'at_risk' | 'churned';
export type Customer = {
  id: number; company: string; contact: string; email: string; plan: 'Starter' | 'Growth' | 'Enterprise';
  status: CustomerStatus; mrr: number; employeesDeployed: number; lastContact: string; industry: string;
};

const companies = ['Northwind Traders', 'Helios Labs', 'Quantix', 'Apex Supply Co.', 'Bluefin Logistics', 'Cobalt Health', 'Meridian Bank', 'Lumen Retail', 'Orbit Media', 'Sable Energy', 'Vantage Legal', 'Kestrel Air', 'Pinecrest Foods', 'Atlas Robotics', 'Harbor Insurance', 'Nimbus Cloud', 'Ironclad Security', 'Juniper Education', 'Redwood Realty', 'Solace Travel', 'Tidewater Marine', 'Granite Partners', 'Echo Studios', 'Fathom Analytics', 'Summit Outdoor', 'Verdant Farms', 'Polaris Telecom', 'Crescent Pharma', 'Beacon Nonprofit', 'Mosaic Design', 'Zenith Motors', 'Aurora Hotels'];
const people = ['Maya Chen', 'Liam Patel', 'Sofia Rossi', 'Ethan Brooks', 'Amara Okafor', 'Lucas Martin', 'Hana Suzuki', 'Diego Ramirez', 'Chloe Dubois', 'Noah Fischer', 'Isla Murphy', 'Omar Haddad'];
const industries = ['Retail', 'Healthcare', 'Finance', 'Logistics', 'SaaS', 'Manufacturing', 'Media', 'Energy'];
const plans: Customer['plan'][] = ['Starter', 'Growth', 'Enterprise'];
const cStatus: CustomerStatus[] = ['active', 'active', 'active', 'trial', 'at_risk', 'active', 'churned'];

export const customers: Customer[] = companies.map((company, i) => {
  const contact = people[i % people.length] ?? 'Alex Doe';
  const plan = plans[(i * 5) % 3] ?? 'Growth';
  const status = cStatus[i % cStatus.length] ?? 'active';
  const domain = company.toLowerCase().replace(/[^a-z]/g, '').slice(0, 12);
  return {
    id: i + 1, company, contact,
    email: `${contact.split(' ')[0]?.toLowerCase()}@${domain}.com`,
    plan, status,
    mrr: status === 'churned' ? 0 : plan === 'Enterprise' ? 8000 + ((i * 731) % 9000) : plan === 'Growth' ? 1500 + ((i * 397) % 2500) : 300 + ((i * 113) % 500),
    employeesDeployed: plan === 'Enterprise' ? 6 + (i % 5) : plan === 'Growth' ? 2 + (i % 3) : 1,
    lastContact: ago(60 * (2 + ((i * 37) % 300))),
    industry: industries[i % industries.length] ?? 'SaaS'
  };
});

export type Integration = { id: string; name: string; category: string; description: string; usedBy: string[] };
export const integrations: Integration[] = [
  { id: 'slack', name: 'Slack', category: 'Communication', description: 'Receive approval requests and activity updates in channels.', usedBy: ['milo', 'ava'] },
  { id: 'gmail', name: 'Gmail', category: 'Communication', description: 'Let employees draft and send email from a shared inbox.', usedBy: ['ava', 'theo'] },
  { id: 'hubspot', name: 'HubSpot', category: 'CRM', description: 'Sync contacts, companies and deals.', usedBy: ['ava'] },
  { id: 'salesforce', name: 'Salesforce', category: 'CRM', description: 'Read and update leads, opportunities and accounts.', usedBy: ['ava'] },
  { id: 'zendesk', name: 'Zendesk', category: 'Support', description: 'Triage, answer and escalate support tickets.', usedBy: ['milo'] },
  { id: 'stripe', name: 'Stripe', category: 'Finance', description: 'Look up payments, refunds and subscriptions.', usedBy: ['nora', 'milo'] },
  { id: 'quickbooks', name: 'QuickBooks', category: 'Finance', description: 'Match invoices and record payments.', usedBy: ['nora'] },
  { id: 'notion', name: 'Notion', category: 'Knowledge', description: 'Use your docs as a knowledge source.', usedBy: ['milo', 'kai'] },
  { id: 'gcal', name: 'Google Calendar', category: 'Productivity', description: 'Schedule meetings and interviews.', usedBy: ['ava', 'theo'] },
  { id: 'greenhouse', name: 'Greenhouse', category: 'Recruiting', description: 'Read applications and update candidate stages.', usedBy: ['theo'] },
  { id: 'snowflake', name: 'Snowflake', category: 'Data', description: 'Query your warehouse for reporting.', usedBy: ['kai'] },
  { id: 'linkedin', name: 'LinkedIn', category: 'Marketing', description: 'Draft and schedule company page posts.', usedBy: ['iris'] }
];

export const employeeById = (id: string) => employees.find((e) => e.id === id);

export function timeAgo(iso: string) {
  const m = Math.max(1, Math.round((now - new Date(iso).getTime()) / 60_000));
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.round(h / 24)}d ago`;
}
