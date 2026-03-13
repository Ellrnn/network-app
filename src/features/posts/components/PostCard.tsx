import { useState } from "react";

import { EditIcon } from "@/components/Icons/EditIcon";
import { TrashIcon } from "@/components/Icons/TrashIcon";
import { getTimeAgo } from "@/lib/formatters";

import { Post } from "../types";
import { DeleteModal } from "./DeleteModal";
import { EditModal } from "./EditModal";
import * as S from "./PostCard.styles";

type Props = {
  post: Post;
  currentUser: string;
};

export default function PostCard({ post, currentUser }: Props) {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const isOwner = post.username === currentUser;

  return (
    <>
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
            <S.Time testID="post-time">{getTimeAgo(post.created_datetime)}</S.Time>
          </S.MetaRow>
          <S.Content>{post.content}</S.Content>
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
    </>
  );
}
