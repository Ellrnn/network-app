import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";
import { FilterOption, SortOption } from "@/features/posts/types";

type SortFilterBarProps = {
  sort: SortOption;
  filter: FilterOption;
  onSortChange: (sort: SortOption) => void;
  onFilterChange: (filter: FilterOption) => void;
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "most_liked", label: "Most Liked" },
];

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
  { value: "all", label: "All" },
  { value: "my_posts", label: "My Posts" },
  { value: "mentioned_me", label: "Mentions Me" },
];

function Chip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

export function SortFilterBar({
  sort,
  filter,
  onSortChange,
  onFilterChange,
}: SortFilterBarProps) {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {SORT_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            label={opt.label}
            active={sort === opt.value}
            onPress={() => onSortChange(opt.value)}
          />
        ))}
        <Text style={styles.divider}>|</Text>
        {FILTER_OPTIONS.map((opt) => (
          <Chip
            key={opt.value}
            label={opt.label}
            active={filter === opt.value}
            onPress={() => onFilterChange(opt.value)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexShrink: 0,
    minHeight: 44,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 6,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: colors.text,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: "bold",
  },
  divider: {
    color: colors.border,
    fontSize: 16,
    marginRight: 6,
  },
});
