import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import { useRouter } from "expo-router";

import { colors } from "@/constants/colors";
import { StyledButton } from "@/components/Button";
import { useCreatePostMutation } from "@/features/posts/hooks/usePosts";
import { useInfinitePosts } from "@/features/posts/hooks/useInfinitePosts";
import { useInteractionsStore } from "@/features/posts/hooks/useLikes";
import {
  useFilteredPosts,
  usePostFilters,
} from "@/features/posts/hooks/usePostFilters";
import { useUser } from "@/hooks/useUser";
import { isBlank } from "@/lib/helpers";
import { enrichPost } from "@/features/posts/utils/enrichPost";

import PostCard from "../components/PostCard";
import { PostForm } from "../components/PostForm";
import { SortFilterBar } from "../components/SortFilterBar";
import * as S from "./MainScreen.styles";

export default function MainScreen() {
  const router = useRouter();
  const { username, logout } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {
    data: pages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    refetch,
  } = useInfinitePosts();

  const { data: interactions } = useInteractionsStore();
  const createPostMutation = useCreatePostMutation();
  const { sort, setSort, filter, setFilter } = usePostFilters();

  const allPosts = useMemo(() => {
    const flat = pages?.pages.flatMap((p) => p.results) ?? [];
    return flat.map((p) => enrichPost(p, interactions ?? {}, username));
  }, [pages, interactions, username]);

  const filteredPosts = useFilteredPosts(allPosts, sort, filter, username);

  const isCreateDisabled =
    isBlank(title) || isBlank(content) || createPostMutation.isPending;

  const handleCreatePost = async () => {
    if (isBlank(title) || isBlank(content)) return;

    try {
      await createPostMutation.mutateAsync({
        username,
        title: title.trim(),
        content: content.trim(),
      });

      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View style={{ paddingVertical: 16, alignItems: "center" }}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      );
    }
    if (!hasNextPage && allPosts.length > 0) {
      return (
        <Text
          style={{
            textAlign: "center",
            color: colors.placeholder,
            paddingVertical: 16,
            fontSize: 13,
          }}
        >
          You have reached the end
        </Text>
      );
    }
    return null;
  };

  const renderEmpty = () => {
    if (isLoading) {
      return (
        <View style={{ paddingVertical: 40, alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
    return (
      <View style={{ paddingVertical: 40, alignItems: "center" }}>
        <Ionicons
          name="chatbubbles-outline"
          size={48}
          color={colors.gray}
          style={{ marginBottom: 8 }}
        />
        <Text style={{ color: colors.placeholder, fontSize: 15 }}>
          No posts yet. Create the first one!
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <S.Container>
        <S.HeaderRow>
          <S.Header>CodeLeap Network</S.Header>
          <Pressable
            onPress={() => {
              logout();
              router.replace("/signup");
            }}
            hitSlop={8}
            style={{ padding: 16 }}
          >
            <Ionicons name="log-out-outline" size={22} color={colors.white} />
          </Pressable>
        </S.HeaderRow>

        <Pressable onPress={Keyboard.dismiss}>
          <S.Card>
            <S.Label>{"What's on your mind?"}</S.Label>
            <PostForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
            />
            <S.ButtonRow>
              <StyledButton
                testID="create-post-button"
                onPress={handleCreatePost}
                disabled={isCreateDisabled}
              >
                <S.ButtonText>Create</S.ButtonText>
              </StyledButton>
            </S.ButtonRow>
          </S.Card>
        </Pressable>

        <SortFilterBar
          sort={sort}
          filter={filter}
          onSortChange={setSort}
          onFilterChange={setFilter}
        />

        <LegendList
          testID="posts-list"
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          estimatedItemSize={200}
          recycleItems
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item, index }) => (
            <PostCard post={item} currentUser={username} index={index} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching && !isFetchingNextPage}
              onRefresh={() => refetch()}
            />
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
      </S.Container>
    </View>
  );
}
