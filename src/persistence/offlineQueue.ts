import { getJson, setJson } from "./storage";
import { getAuthData } from "../restapi/authHelpers";
import { safeFetch } from "../utils/safeFetch";

const OFFLINE_QUEUE_KEY = "shophub_offline_queue";

export type QueuedRequest = {
  id: string;
  url: string; // base url without auth param
  method: string;
  body?: any;
  headers?: Record<string, string>;
  needsAuth?: boolean;
  timestamp: number;
  retryCount: number;
};

async function loadQueue(): Promise<QueuedRequest[]> {
  const q = await getJson<QueuedRequest[]>(OFFLINE_QUEUE_KEY);
  return q || [];
}

async function saveQueue(queue: QueuedRequest[]) {
  await setJson(OFFLINE_QUEUE_KEY, queue);
}

function makeId() {
  return `${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

export async function enqueueRequest(params: {
  url: string;
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  needsAuth?: boolean;
}) {
  const queue = await loadQueue();
  const req: QueuedRequest = {
    id: makeId(),
    url: params.url,
    method: params.method || "POST",
    body: params.body,
    headers: params.headers,
    needsAuth: params.needsAuth,
    timestamp: Date.now(),
    retryCount: 0,
  };
  queue.push(req);
  await saveQueue(queue);
  return req.id;
}

export async function processQueue(options?: { onProgress?: (processed: number, total: number) => void; maxRetries?: number; }) {
  const maxRetries = options?.maxRetries ?? 3;
  const queue = await loadQueue();
  if (!queue.length) return;

  const remaining: QueuedRequest[] = [];
  let processed = 0;
  for (const req of queue) {
    try {
      let url = req.url + "";
      const headers = { "Content-Type": "application/json", ...(req.headers || {}) };

      if (req.needsAuth) {
        try {
          const { idToken } = await getAuthData();
          if (url.includes("?")) url = `${url}&auth=${idToken}`;
          else url = `${url}?auth=${idToken}`;
        } catch (err) {
          console.error("Failed to get auth data for queued request:", err);
          // no auth available - keep in queue
          req.retryCount = (req.retryCount || 0) + 1;
          if (req.retryCount <= maxRetries) remaining.push(req);
          processed++;
          options?.onProgress?.(processed, queue.length);
          continue;
        }
      }

      const safeResult = await safeFetch(url, {
        method: req.method,
        headers,
        body: req.body ? JSON.stringify(req.body) : undefined,
      });

      if (safeResult.networkError) {
        // network failure - keep for retry
        console.warn("Network error when processing queued request:", safeResult.error);
        req.retryCount = (req.retryCount || 0) + 1;
        if (req.retryCount <= maxRetries) remaining.push(req);
      } else {
        const res = safeResult.response!;
        if (!res.ok) {
          req.retryCount = (req.retryCount || 0) + 1;
          if (req.retryCount <= maxRetries) remaining.push(req);
        }
      }
  } catch {
      // network error - increment retry count and keep in queue until maxRetries
      req.retryCount = (req.retryCount || 0) + 1;
      if (req.retryCount <= maxRetries) remaining.push(req);
    }

    processed++;
    options?.onProgress?.(processed, queue.length);
  }

  await saveQueue(remaining);
}

export async function clearQueue() {
  await setJson(OFFLINE_QUEUE_KEY, []);
}
