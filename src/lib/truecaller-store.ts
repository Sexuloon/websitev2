/**
 * Global in-memory session store for Truecaller pending verifications.
 * Keyed by nonce. Each entry expires after 5 minutes.
 *
 * Note: On serverless (Vercel), this persists within a warm function instance.
 * For multi-instance production, swap this for Vercel KV / Upstash Redis.
 */

export interface TruecallerSession {
  status: "pending" | "verified" | "failed";
  profile?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  createdAt: number;
}

// Use globalThis so the Map survives hot-reloads in dev
const g = globalThis as typeof globalThis & {
  __tc_sessions__?: Map<string, TruecallerSession>;
};

if (!g.__tc_sessions__) {
  g.__tc_sessions__ = new Map();
}

export const tcSessions = g.__tc_sessions__;

/** Prune sessions older than 5 minutes */
export function pruneSessions() {
  const now = Date.now();
  for (const [nonce, session] of tcSessions.entries()) {
    if (now - session.createdAt > 5 * 60 * 1000) {
      tcSessions.delete(nonce);
    }
  }
}
