const MENTION_PATTERN = /@(\w+)/g;

export function extractMentions(text: string): string[] {
  const matches = text.match(MENTION_PATTERN);
  if (!matches) return [];
  return [...new Set(matches.map((m) => m.slice(1)))];
}

export function parseMentionSegments(
  text: string
): Array<{ text: string; isMention: boolean }> {
  const segments: Array<{ text: string; isMention: boolean }> = [];
  let lastIndex = 0;
  const regex = new RegExp(MENTION_PATTERN);
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        text: text.slice(lastIndex, match.index),
        isMention: false,
      });
    }
    segments.push({ text: match[0], isMention: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), isMention: false });
  }

  if (segments.length === 0) {
    segments.push({ text, isMention: false });
  }

  return segments;
}
