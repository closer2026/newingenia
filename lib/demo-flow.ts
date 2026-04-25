export type DemoFlowStage = "lead" | "offer" | "email" | "task";

export type DemoFlow = {
  leadId: string;
  company: string;
  contact: string;
  message: string;
  responseDraft?: string;
  followUpDraft?: string;
  stage: DemoFlowStage;
  updatedAt: string;
};

const STORAGE_KEY = "newingenia-demo-flow";

export function readDemoFlow(): DemoFlow | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DemoFlow) : null;
  } catch {
    return null;
  }
}

export function writeDemoFlow(flow: DemoFlow) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...flow, updatedAt: new Date().toISOString() })
  );
}

export function clearDemoFlow() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function upsertDemoFlow(next: Omit<DemoFlow, "updatedAt">) {
  writeDemoFlow({ ...next, updatedAt: new Date().toISOString() });
}
