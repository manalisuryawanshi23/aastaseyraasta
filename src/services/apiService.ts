/**
 * apiService.ts — Centralized async API helper for Admin Panel operations.
 *
 * ALL admin mutations (save, delete, toggle publish) MUST go through these
 * helpers instead of fire-and-forget fetch calls. This ensures:
 *   1. The UI only shows "Saved!" when MySQL actually confirms the write.
 *   2. Errors surface as visible toast messages, not silent console logs.
 *   3. localStorage is only updated AFTER a confirmed API success.
 */

export interface ApiResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const DEFAULT_TIMEOUT_MS = 12000; // 12 seconds

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('aastha_admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      headers['x-admin-token'] = token;
    }
    const sessionStr = localStorage.getItem('aastha_admin_session');
    if (sessionStr) {
      try {
        const session = JSON.parse(sessionStr);
        if (session?.passcode) headers['x-admin-passcode'] = session.passcode;
        if (session?.id) headers['x-admin-user-id'] = session.id;
      } catch {}
    }
  }
  return headers;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function apiPost<T = any>(
  endpoint: string,
  data: any,
  customHeaders?: Record<string, string>
): Promise<ApiResult<T>> {
  try {
    const res = await fetchWithTimeout(endpoint, {
      method: 'POST',
      headers: { ...getAuthHeaders(), ...(customHeaders || {}) },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { success: false, error: json?.error || json?.message || `Server returned ${res.status}` };
    }
    if (json.success === false) {
      return { success: false, error: json?.error || json?.message || 'API returned failure' };
    }
    return { success: true, data: json.data, message: json.message };
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      return { success: false, error: 'Request timed out. Please try again.' };
    }
    return { success: false, error: err?.message || 'Network error — please check your connection.' };
  }
}

export async function apiPut<T = any>(
  endpoint: string,
  data: any,
  customHeaders?: Record<string, string>
): Promise<ApiResult<T>> {
  try {
    const res = await fetchWithTimeout(endpoint, {
      method: 'PUT',
      headers: { ...getAuthHeaders(), ...(customHeaders || {}) },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { success: false, error: json?.error || json?.message || `Server returned ${res.status}` };
    }
    if (json.success === false) {
      return { success: false, error: json?.error || json?.message || 'API returned failure' };
    }
    return { success: true, data: json.data, message: json.message };
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      return { success: false, error: 'Request timed out. Please try again.' };
    }
    return { success: false, error: err?.message || 'Network error.' };
  }
}

export async function apiDelete(endpoint: string): Promise<ApiResult> {
  try {
    const res = await fetchWithTimeout(endpoint, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { success: false, error: json?.error || json?.message || `Server returned ${res.status}` };
    }
    if (json.success === false) {
      return { success: false, error: json?.error || json?.message || 'Delete failed' };
    }
    return { success: true, message: json.message };
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      return { success: false, error: 'Request timed out. Please try again.' };
    }
    return { success: false, error: err?.message || 'Network error.' };
  }
}

export async function apiGet<T = any>(endpoint: string): Promise<ApiResult<T>> {
  try {
    const res = await fetchWithTimeout(endpoint, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { success: false, error: json?.error || json?.message || `Server returned ${res.status}` };
    }
    return { success: true, data: json.data ?? json };
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      return { success: false, error: 'Request timed out.' };
    }
    return { success: false, error: err?.message || 'Network error.' };
  }
}
