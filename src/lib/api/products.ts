import { api } from './client';
import { productListSchema, productSchema, categorySchema } from '@/lib/utils/schemas';
import type { Product, Category, ProductFilters } from '@/lib/utils/types';
import { z } from 'zod';

export async function getProducts(filters: ProductFilters = {}): Promise<z.infer<typeof productListSchema>> {
  const data = await api.get<Record<string, unknown>>('/catalog/products', {
    params: {
      category: filters.category,
      q: filters.q,
      page: filters.page,
      limit: filters.limit ?? 20,
      sort: filters.sort,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      cursor: filters.cursor,
    },
    tags: ['products'],
  });
  return productListSchema.parse(data);
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const data = await api.get<Record<string, unknown>>(`/catalog/products/${slug}`, {
    tags: [`product-${slug}`],
  });
  return productSchema.parse(data);
}

export async function getCategories(): Promise<Category[]> {
  const data = await api.get<Record<string, unknown>[]>('/catalog/categories', {
    tags: ['categories'],
  });
  return z.array(categorySchema).parse(data);
}
