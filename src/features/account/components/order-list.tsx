'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import Link from 'next/link';
import { ChevronRight, Package } from 'lucide-react';
import type { Order } from '@/lib/utils/types';

interface OrderListProps {
  orders: Order[];
  pagination: { page: number; totalPages: number; total: number };
}

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'danger'> = {
  delivered: 'success',
  shipped: 'success',
  processing: 'warning',
  pending: 'warning',
  cancelled: 'danger',
};

export function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center py-20 text-gray-400">
        <Package className="mb-4 h-16 w-16" />
        <p className="text-lg font-medium text-gray-900">No orders yet</p>
        <p className="text-sm">Start shopping to see your orders here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link key={order.id} href={`/account/orders/${order.id}`}>
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="hidden sm:block">
                  <Package className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                  <p className="text-sm text-gray-500">{order.items.length} item(s)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium text-gray-900">{formatCurrency(order.total)}</p>
                  <Badge variant={statusVariant[order.status] ?? 'default'}>{order.status}</Badge>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
