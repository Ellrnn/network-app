export function mockLatency(min = 100, max = 400): Promise<void> {
  const ms = Math.random() * (max - min) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}
