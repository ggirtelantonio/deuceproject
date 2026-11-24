import { Suspense } from 'react';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { ProductTable } from './product-tables';

export default function ProductListingPage() {
  return (
    <Suspense fallback={<DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />}>
      <ProductTable />
    </Suspense>
  );
}
