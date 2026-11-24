import { Suspense } from 'react';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { UsersTable } from './users-table';

export default function UserListingPage() {
  return (
    <Suspense fallback={<DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />}>
      <UsersTable />
    </Suspense>
  );
}
