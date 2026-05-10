export {};
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, data?: Record<string, unknown>) => void;
      identify: (uniqId: string, data?: Record<string, unknown>) => void;
    };
  }
}
