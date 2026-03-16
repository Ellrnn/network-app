import { getTimeAgo } from "../formatters";

function minutesAgo(n: number): string {
  return new Date(Date.now() - n * 60_000).toISOString();
}

function hoursAgo(n: number): string {
  return new Date(Date.now() - n * 3_600_000).toISOString();
}

function daysAgo(n: number): string {
  return new Date(Date.now() - n * 86_400_000).toISOString();
}

describe("getTimeAgo", () => {
  it('returns "just now" for less than 1 minute ago', () => {
    const date = new Date(Date.now() - 10_000).toISOString();
    expect(getTimeAgo(date)).toBe("just now");
  });

  it('returns "1 minute ago" for exactly 1 minute', () => {
    expect(getTimeAgo(minutesAgo(1))).toBe("1 minute ago");
  });

  it("returns plural minutes for 2-59 minutes", () => {
    expect(getTimeAgo(minutesAgo(30))).toBe("30 minutes ago");
  });

  it('returns "1 hour ago" for exactly 1 hour', () => {
    expect(getTimeAgo(hoursAgo(1))).toBe("1 hour ago");
  });

  it("returns plural hours for 2-23 hours", () => {
    expect(getTimeAgo(hoursAgo(5))).toBe("5 hours ago");
  });

  it('returns "1 day ago" for exactly 1 day', () => {
    expect(getTimeAgo(daysAgo(1))).toBe("1 day ago");
  });

  it("returns plural days for 2+ days", () => {
    expect(getTimeAgo(daysAgo(7))).toBe("7 days ago");
  });
});
