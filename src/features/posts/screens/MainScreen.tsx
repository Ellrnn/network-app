import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

import { colors } from "@/constants/colors";
import { StyledButton } from "@/components/Button";
import { usePostsQuery, useCreatePostMutation } from "@/features/posts/hooks/usePosts";
import { useUser } from "@/hooks/useUser";
import { isBlank } from "@/lib/helpers";

import PostCard from "../components/PostCard";
import { PostForm } from "../components/PostForm";
import * as S from "./MainScreen.styles";

export default function MainScreen() {
  const { username } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const postsQuery = usePostsQuery();
  const createPostMutation = useCreatePostMutation();

  const posts = postsQuery.data ?? [];
  const isCreateDisabled =
    isBlank(title) || isBlank(content) || createPostMutation.isPending;

  const handleCreatePost = async () => {
    if (isBlank(title) || isBlank(content)) {
      return;
    }

    try {
      await createPostMutation.mutateAsync({
        username,
        title: title.trim(),
        content: content.trim(),
      });
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Erro ao criar post", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <S.Container>
        <S.Header>CodeLeap Network</S.Header>
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
        <FlatList
          testID="posts-list"
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <PostCard post={item} currentUser={username} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={postsQuery.isFetching}
              onRefresh={() => postsQuery.refetch()}
            />
          }
        />
      </S.Container>
    </View>
  );
}
