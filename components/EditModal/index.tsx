import { colors } from "@/constants/Colors";
import { Post, updatePost } from "@/services/api/posts";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { StyledButton } from "../Button/styles";
import { EditForm } from "../EditForm";
import * as S from "./styles";

type EditModalProps = {
  isVisible: boolean;
  onClose: () => void;
  post: Post;
};

export function EditModal({ isVisible, onClose, post }: EditModalProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const handleSave = async () => {
    try {
      await updatePost(post.id, title, content);
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <>
      <Modal
        testID="edit-modal"
        isVisible={isVisible}
        onBackdropPress={() => {}}
      >
        <S.Card>
          <S.Label>Edit Item</S.Label>

          <EditForm
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
          />
          <S.ButtonRow>
            <StyledButton
              testID="cancel-edit-button"
              variant="outline"
              onPress={onClose}
            >
              <S.ButtonText>Cancel</S.ButtonText>
            </StyledButton>
            <StyledButton
              testID="save-edit-button"
              variant="success"
              onPress={handleSave}
            >
              <S.ButtonText style={{ color: colors.white }}>Save</S.ButtonText>
            </StyledButton>
          </S.ButtonRow>
        </S.Card>
      </Modal>
    </>
  );
}
