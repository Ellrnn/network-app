import { useEffect, useState } from "react";
import Modal from "react-native-modal";

import { colors } from "@/constants/colors";
import { StyledButton } from "@/components/Button";
import { useUpdatePostMutation } from "@/features/posts/hooks/usePosts";
import { Post } from "@/features/posts/types";

import { EditForm } from "./EditForm";
import * as S from "./EditModal.styles";

type EditModalProps = {
  isVisible: boolean;
  onClose: () => void;
  post: Post;
};

export function EditModal({ isVisible, onClose, post }: EditModalProps) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const updatePostMutation = useUpdatePostMutation();

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
  }, [post.content, post.title]);

  const handleSave = async () => {
    try {
      await updatePostMutation.mutateAsync({
        id: post.id,
        title,
        content,
      });
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <Modal testID="edit-modal" isVisible={isVisible} onBackdropPress={() => {}}>
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
  );
}
