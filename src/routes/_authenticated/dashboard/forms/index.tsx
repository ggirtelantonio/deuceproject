import { createFileRoute, redirect } from '@tanstack/react-router';
export const Route = createFileRoute('/_authenticated/dashboard/forms/')({
  beforeLoad: () => {
    throw redirect({ to: '/dashboard/forms/basic' });
  }
});
