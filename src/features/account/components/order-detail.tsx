'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PriceDisplay } from '@/components/ui/price-display';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Order } from '@/lib/utils/types';

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'danger'> = {
  delivered: 'success',
  shipped: 'success',
  processing: 'warning',
  pending: 'warning',
  cancelled: 'danger',
};

export function OrderDetail({ order }: { order: Order }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/account/orders"
        className="mb-6 flex items-center gap-1 text-sm text-green-600 hover:text-green-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
          <p className="text-sm text-gray-500">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <Badge variant={statusVariant[order.status] ?? 'default'} className="text-sm capitalize">
          {order.status}
        </Badge>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <PriceDisplay price={item.price} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">Delivery Address</h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{order.address.street}</p>
              <p>{order.address.city}, {order.address.state}</p>
              {order.address.zip && <p>{order.address.zip}</p>}
              <p>{order.address.country}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span>{formatCurrency(order.deliveryFee)}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-gray-900">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
              {order.paymentReference && (
                <p className="mt-2 text-xs text-gray-400">
                  Payment ref: {order.paymentReference}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
