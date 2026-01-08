import { API_URLS } from "../config/api";
import { safeFetch } from "./safeFetch";
import { AppState } from "react-native";

type Listener = (isOnline: boolean) => void;

let listeners: Listener[] = [];
let lastStatus: boolean | null = null;
let timer: ReturnType<typeof setInterval> | null = null;
let netInfoUnsub: (() => void) | null = null;
let appStateUnsub: (() => void) | null = null;

async function checkServerReachable(): Promise<boolean> {
  try {
    const res = await safeFetch(`${API_URLS.PRODUCTS}/1`);
    return !res.networkError && !!res.response && res.response.ok;
  } catch {
    return false;
  }
}

async function updateStatus(online: boolean) {
  if (lastStatus === null || online !== lastStatus) {
    lastStatus = online;
    listeners.forEach((l) => l(online));
  }
}

async function check() {
  const reachable = await checkServerReachable();
  await updateStatus(reachable);
}

function startPolling(intervalMs = 1000) {
  if (timer) return;
  // immediate check
  check();
  timer = setInterval(check, intervalMs);
}

function stopPolling() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function tryUseNetInfo() {
  // Try to use @react-native-community/netinfo if available for instant events.
  try {
  const NetInfo = require("@react-native-community/netinfo");
    if (!NetInfo || !NetInfo.addEventListener) return false;

    netInfoUnsub = NetInfo.addEventListener(async (state: any) => {
        // state.isConnected is a quick indicator. Notify listeners immediately when
        // we see a connected event so the UI can react instantly, then verify
        // backend reachability in background and correct the status if needed.
        if (state.isConnected) {
          // optimistic: immediately report online so UI becomes responsive
          updateStatus(true);
          // verify backend reachability and correct if it's actually unreachable
          checkServerReachable().then((reachable) => {
            if (!reachable) updateStatus(false);
          });
        } else {
          updateStatus(false);
        }
    });

    return true;
  } catch {
    return false;
  }
}

function ensureMonitoring() {
  if (netInfoUnsub) return;

  const netinfoAvailable = tryUseNetInfo();
  if (!netinfoAvailable) {
    // fallback to polling
    startPolling(1000);
  }

  // Always listen to AppState to trigger an immediate check when app becomes active
  if (!appStateUnsub) {
    const handler = (next: string) => {
      if (next === "active") check();
    };
    const sub = AppState.addEventListener("change", handler as any);
    appStateUnsub = () => {
      try {
        sub.remove();
      } catch {}
    };
  }
}

export function subscribeNetworkStatus(listener: Listener) {
  listeners.push(listener);
  ensureMonitoring();

  // immediately call with last known status if available
  if (lastStatus !== null) listener(lastStatus);
  else {
    // trigger immediate check for newcomers
    check();
  }

  return () => {
    listeners = listeners.filter((l) => l !== listener);
    if (listeners.length === 0) {
      // cleanup
      if (netInfoUnsub) {
        try {
          netInfoUnsub();
        } catch {}
        netInfoUnsub = null;
      }
      if (appStateUnsub) {
        try {
          appStateUnsub();
        } catch {}
        appStateUnsub = null;
      }
      stopPolling();
      lastStatus = null;
    }
  };
}

export function getNetworkStatus() {
  return lastStatus;
}

export function startNetworkMonitoring() {
  ensureMonitoring();
}
