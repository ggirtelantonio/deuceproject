import { create } from 'zustand';
import {
  approvals as seedApprovals, customers as seedCustomers, employees as seedEmployees, workflows as seedWorkflows,
  type ApprovalStatus, type Customer, type EmployeeStatus, type WorkflowStatus
} from '@/constants/deuce-data';

// Demo state in the browser only; resets on reload.
type State = {
  approvalStatus: Record<string, ApprovalStatus>;
  employeeStatus: Record<string, EmployeeStatus>;
  workflowStatus: Record<string, WorkflowStatus>;
  customers: Customer[];
  decide: (id: string, s: ApprovalStatus) => void;
  setEmployeeStatus: (id: string, s: EmployeeStatus) => void;
  setWorkflowStatus: (id: string, s: WorkflowStatus) => void;
  upsertCustomer: (c: Omit<Customer, 'id'> & { id?: number }) => void;
  removeCustomer: (id: number) => void;
};

export const useDeuce = create<State>((set) => ({
  approvalStatus: Object.fromEntries(seedApprovals.map((a) => [a.id, 'pending'])),
  employeeStatus: Object.fromEntries(seedEmployees.map((e) => [e.id, e.status])),
  workflowStatus: Object.fromEntries(seedWorkflows.map((w) => [w.id, w.status])),
  customers: seedCustomers,
  decide: (id, s) => set((st) => ({ approvalStatus: { ...st.approvalStatus, [id]: s } })),
  setEmployeeStatus: (id, s) => set((st) => ({ employeeStatus: { ...st.employeeStatus, [id]: s } })),
  setWorkflowStatus: (id, s) => set((st) => ({ workflowStatus: { ...st.workflowStatus, [id]: s } })),
  upsertCustomer: (c) =>
    set((st) => {
      if (c.id) return { customers: st.customers.map((x) => (x.id === c.id ? { ...x, ...c, id: x.id } : x)) };
      const id = Math.max(0, ...st.customers.map((x) => x.id)) + 1;
      return { customers: [{ ...c, id } as Customer, ...st.customers] };
    }),
  removeCustomer: (id) => set((st) => ({ customers: st.customers.filter((x) => x.id !== id) }))
}));
