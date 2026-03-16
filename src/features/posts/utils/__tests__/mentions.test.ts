import { extractMentions, parseMentionSegments } from "../mentions";

describe("extractMentions", () => {
  it("returns empty array when there are no mentions", () => {
    expect(extractMentions("hello world")).toEqual([]);
  });

  it("extracts a single mention", () => {
    expect(extractMentions("hello @alice")).toEqual(["alice"]);
  });

  it("extracts multiple mentions", () => {
    expect(extractMentions("hi @alice and @bob")).toEqual(["alice", "bob"]);
  });

  it("deduplicates repeated mentions", () => {
    expect(extractMentions("@alice @alice @bob")).toEqual(["alice", "bob"]);
  });

  it("extracts mentions at the start of text", () => {
    expect(extractMentions("@admin check this")).toEqual(["admin"]);
  });

  it("returns empty array for empty string", () => {
    expect(extractMentions("")).toEqual([]);
  });
});

describe("parseMentionSegments", () => {
  it("returns a single non-mention segment for plain text", () => {
    expect(parseMentionSegments("hello")).toEqual([
      { text: "hello", isMention: false },
    ]);
  });

  it("parses a mention in the middle of text", () => {
    const segments = parseMentionSegments("hi @alice bye");
    expect(segments).toEqual([
      { text: "hi ", isMention: false },
      { text: "@alice", isMention: true },
      { text: " bye", isMention: false },
    ]);
  });

  it("parses adjacent mentions", () => {
    const segments = parseMentionSegments("@alice@bob");
    expect(segments).toEqual([
      { text: "@alice", isMention: true },
      { text: "@bob", isMention: true },
    ]);
  });

  it("handles text with only a mention", () => {
    const segments = parseMentionSegments("@admin");
    expect(segments).toEqual([{ text: "@admin", isMention: true }]);
  });

  it("returns single segment for empty string", () => {
    expect(parseMentionSegments("")).toEqual([
      { text: "", isMention: false },
    ]);
  });
});
