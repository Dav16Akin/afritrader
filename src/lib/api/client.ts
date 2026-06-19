import { env } from '@/lib/utils/env';

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  tags?: string[];
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getTokens(): { accessToken?: string; refreshToken?: string } {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem('auth-storage');
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      const state = parsed?.state;
      return {
        accessToken: state?.accessToken,
        refreshToken: state?.refreshToken,
      };
    } catch {
      return {};
    }
  }

  private buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(`${this.baseUrl}${path}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          url.searchParams.set(key, String(value));
        }
      });
    }
    return url.toString();
  }

  async fetch<TResponse>(
    path: string,
    options: FetchOptions = {},
  ): Promise<TResponse> {
    const { body, params, tags, headers: extraHeaders, ...rest } = options;
    const url = this.buildUrl(path, params);
    const { accessToken } = this.getTokens();

    const headers = new Headers(extraHeaders as Record<string, string>);
    if (body && !(body instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const response = await fetch(url, {
      ...rest,
      headers,
      body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
      next: tags ? { tags } : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new ApiClientError(
        error.message ?? `HTTP ${response.status}`,
        error.code ?? 'UNKNOWN',
        response.status,
      );
    }

    if (response.status === 204) return undefined as TResponse;

    return response.json();
  }

  get<TResponse>(path: string, options?: FetchOptions): Promise<TResponse> {
    return this.fetch<TResponse>(path, { ...options, method: 'GET' });
  }

  post<TResponse, TBody = unknown>(path: string, body?: TBody, options?: FetchOptions): Promise<TResponse> {
    return this.fetch<TResponse>(path, { ...options, method: 'POST', body: body as unknown });
  }

  put<TResponse, TBody = unknown>(path: string, body?: TBody, options?: FetchOptions): Promise<TResponse> {
    return this.fetch<TResponse>(path, { ...options, method: 'PUT', body: body as unknown });
  }

  delete<TResponse>(path: string, options?: FetchOptions): Promise<TResponse> {
    return this.fetch<TResponse>(path, { ...options, method: 'DELETE' });
  }
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export const api = new ApiClient(env.API_URL);
