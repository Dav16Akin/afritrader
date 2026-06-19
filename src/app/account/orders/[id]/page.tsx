import { Suspense } from 'react';
import { getOrder } from '@/lib/api/orders';
import { notFound } from 'next/navigation';
import { OrderDetail } from '@/features/account/components/order-detail';
import { Skeleton } from '@/components/ui/skeleton';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function OrderDetailPage({ params }: PageProps) {
  const { id } = await params;
  let order;
  try {
    order = await getOrder(id);
  } catch {
    notFound();
  }
  if (!order) notFound();
  return <OrderDetail order={order} />;
}

export default function OrderRoute(props: PageProps) {
  return (
    <Suspense fallback={<Skeleton className="h-96 w-full rounded-xl" />}>
      <OrderDetailPage {...props} />
    </Suspense>
  );
}
