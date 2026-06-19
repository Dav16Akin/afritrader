import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="mb-2 text-4xl font-bold text-gray-900">404</h1>
      <p className="mb-6 text-gray-500">Page not found</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
