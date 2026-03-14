import { memo, useState } from "react";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { EditIcon } from "@/components/Icons/EditIcon";
import { TrashIcon } from "@/components/Icons/TrashIcon";
import { colors } from "@/constants/colors";
import { getTimeAgo } from "@/lib/formatters";

import {
  useAddCommentMutation,
  useDeleteCommentMutation,
} from "../hooks/useComments";
import { useLikeMutation } from "../hooks/useLikes";
import { EnrichedPost } from "../types";
import { CommentsSheet } from "./CommentsSheet";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";
import { MentionText } from "./MentionText";
import { PostActions } from "./PostActions";
import * as S from "./PostCard.styles";

type Props = {
  post: EnrichedPost;
  currentUser: string;
  index: number;
};

function PostCardComponent({ post, currentUser, index }: Props) {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const isOwner = post.username === currentUser;

  const likeMutation = useLikeMutation();
  const addCommentMutation = useAddCommentMutation();
  const deleteCommentMutation = useDeleteCommentMutation();

  const handleLike = () => {
    likeMutation.mutate({ postId: post.id, username: currentUser });
  };

  const handleAddComment = (content: string) => {
    addCommentMutation.mutate({
      postId: post.id,
      username: currentUser,
      content,
    });
  };

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutation.mutate({ postId: post.id, commentId });
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(300)}>
      <S.Card testID="post-card">
        <S.CardHeader>
          <S.Title numberOfLines={2}>{post.title}</S.Title>
          {isOwner && (
            <S.Actions>
              <S.IconButton
                testID="delete-post-button"
                onPress={() => setDeleteModalVisible(true)}
              >
                <TrashIcon />
              </S.IconButton>
              <S.IconButton
                testID="edit-post-button"
                onPress={() => setEditModalVisible(true)}
              >
                <EditIcon />
              </S.IconButton>
            </S.Actions>
          )}
        </S.CardHeader>
        <S.CardBody>
          <S.MetaRow>
            <S.Username testID="post-username">@{post.username}</S.Username>
            <S.Time testID="post-time">
              {getTimeAgo(post.created_datetime)}
            </S.Time>
          </S.MetaRow>

          <MentionText style={{ fontSize: 14, color: colors.text }}>
            {post.content}
          </MentionText>

          <PostActions
            likesCount={post.likesCount}
            likedByMe={post.likedByMe}
            commentsCount={post.commentsCount}
            onLike={handleLike}
            onComments={() => setCommentsVisible(true)}
          />
        </S.CardBody>
      </S.Card>

      <EditModal
        post={post}
        isVisible={isEditModalVisible}
        onClose={() => setEditModalVisible(false)}
      />
      <DeleteModal
        isVisible={isDeleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        postId={post.id}
      />
      <CommentsSheet
        visible={isCommentsVisible}
        onClose={() => setCommentsVisible(false)}
        comments={post.comments}
        currentUser={currentUser}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
        isPending={addCommentMutation.isPending}
      />
    </Animated.View>
  );
}

export default memo(PostCardComponent);
