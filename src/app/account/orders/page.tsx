import { Suspense } from 'react';
import { getOrders } from '@/lib/api/orders';
import { OrderList } from '@/features/account/components/order-list';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

async function OrdersPage() {
  const result = await getOrders(1, 10);
  return <OrderList orders={result.data} pagination={result.pagination} />;
}

export default function OrdersRoute() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">My Orders</h1>
      <Suspense fallback={<Skeleton className="h-64 w-full rounded-xl" />}>
        <OrdersPage />
      </Suspense>
    </div>
  );
}
