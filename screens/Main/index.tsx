import { PostForm } from "@/components/PostForm";
import { useUser } from "@/hooks/useUser";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import PostCard from "../../components/PostCard";
import { colors } from "../../constants/Colors";
import { createPost, getPosts, Post } from "../../services/api/posts";
import * as S from "./styles";

export default function MainScreen() {
  const { username } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error("Erro ao buscar posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      await createPost(username, title.trim(), content.trim());
      setTitle("");
      setContent("");
      fetchPosts();
    } catch (err) {
      console.error("Erro ao criar post", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
            <S.Button
              testID="create-post-button"
              onPress={handleCreatePost}
              disabled={!title.trim() || !content.trim()}
            >
              <S.ButtonText>Create</S.ButtonText>
            </S.Button>
          </S.ButtonRow>
        </S.Card>
        <FlatList
          testID="posts-list"
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          renderItem={({ item }) => (
            <PostCard
              post={item}
              currentUser={username}
              onRefresh={fetchPosts}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchPosts} />
          }
        />
      </S.Container>
    </View>
  );
}
