import { isBlank } from "../helpers";

describe("isBlank", () => {
  it("returns true for an empty string", () => {
    expect(isBlank("")).toBe(true);
  });

  it("returns true for a string with only spaces", () => {
    expect(isBlank("   ")).toBe(true);
  });

  it("returns true for a string with tabs and newlines", () => {
    expect(isBlank("\t\n ")).toBe(true);
  });

  it("returns false for a non-empty string", () => {
    expect(isBlank("hello")).toBe(false);
  });

  it("returns false for a string with leading/trailing spaces", () => {
    expect(isBlank("  hello  ")).toBe(false);
  });
});
