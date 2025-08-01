import { getTimeAgo } from "@/lib/utils";
import React from "react";
import { Post } from "../../services/api/posts";
import { DeleteModal } from "../DeleteModal";
import { EditModal } from "../EditModal";
import { EditIcon } from "../Icons/EditIcon";
import { TrashIcon } from "../Icons/TrashIcon";
import * as S from "./styles";

type Props = {
  post: Post;
  currentUser: string;
  onRefresh: () => void;
};

export default function PostCard({ post, currentUser, onRefresh }: Props) {
  const [isEditModalVisible, setEditModalVisible] = React.useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const isOwner = post.username === currentUser;

  const handleDelete = async () => {
    setDeleteModalVisible(true);
  };

  const handleEdit = () => {
    setEditModalVisible(true);
  };

  return (
    <>
      <S.Card testID="post-card">
        <S.CardHeader>
          <S.Title numberOfLines={2}>{post.title}</S.Title>
          {isOwner && (
            <S.Actions>
              <S.IconButton testID="delete-post-button" onPress={handleDelete}>
                <TrashIcon />
              </S.IconButton>
              <S.IconButton testID="edit-post-button" onPress={handleEdit}>
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
          <S.Content>{post.content}</S.Content>
        </S.CardBody>
      </S.Card>
      <EditModal
        post={post}
        isVisible={isEditModalVisible}
        onClose={() => {
          onRefresh();
          setEditModalVisible(false);
        }}
      />
      <DeleteModal
        isVisible={isDeleteModalVisible}
        onClose={() => {
          onRefresh();
          setDeleteModalVisible(false);
        }}
        postId={post.id}
      />
    </>
  );
}
