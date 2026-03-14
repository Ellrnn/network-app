import { Text, TextStyle } from "react-native";

import { colors } from "@/constants/colors";
import { parseMentionSegments } from "@/features/posts/utils/mentions";

type MentionTextProps = {
  children: string;
  style?: TextStyle;
};

export function MentionText({ children, style }: MentionTextProps) {
  const segments = parseMentionSegments(children);

  return (
    <Text style={style}>
      {segments.map((segment, index) =>
        segment.isMention ? (
          <Text
            key={index}
            style={{ color: colors.primary, fontWeight: "bold" }}
          >
            {segment.text}
          </Text>
        ) : (
          <Text key={index}>{segment.text}</Text>
        )
      )}
    </Text>
  );
}
