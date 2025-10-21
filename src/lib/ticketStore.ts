// One shared in-memory store that survives Next dev HMR.
// Change total to your real cap.
type Store = { total: number; sold: number };

const g = globalThis as unknown as { __TICKET_STORE?: Store };

if (!g.__TICKET_STORE) {
  g.__TICKET_STORE = { total: 110, sold: 0 }; // <-- set your starting numbers here
}

export const store = g.__TICKET_STORE!;