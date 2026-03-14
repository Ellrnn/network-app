import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { colors } from "@/constants/colors";

type PostActionsProps = {
  likesCount: number;
  likedByMe: boolean;
  commentsCount: number;
  onLike: () => void;
  onComments: () => void;
};

const SCALE_UP = { duration: 100, easing: Easing.out(Easing.ease) };
const SCALE_DOWN = { duration: 150, easing: Easing.inOut(Easing.ease) };

export function PostActions({
  likesCount,
  likedByMe,
  commentsCount,
  onLike,
  onComments,
}: PostActionsProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleLike = () => {
    scale.value = withSequence(
      withTiming(1.3, SCALE_UP),
      withTiming(1, SCALE_DOWN)
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onLike();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <Pressable style={styles.action} onPress={handleLike}>
          <Ionicons
            name={likedByMe ? "heart" : "heart-outline"}
            size={20}
            color={likedByMe ? colors.danger : colors.border}
          />
          <Text
            style={[styles.count, likedByMe && { color: colors.danger }]}
          >
            {likesCount}
          </Text>
        </Pressable>
      </Animated.View>

      <Pressable style={styles.action} onPress={onComments}>
        <Ionicons name="chatbubble-outline" size={18} color={colors.border} />
        <Text style={styles.count}>{commentsCount}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    marginTop: 12,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  count: {
    fontSize: 13,
    color: "#999",
  },
});
