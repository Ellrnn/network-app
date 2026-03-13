import Modal from "react-native-modal";

import { colors } from "@/constants/colors";
import { StyledButton } from "@/components/Button";
import { useDeletePostMutation } from "@/features/posts/hooks/usePosts";

import * as S from "./DeleteModal.styles";

type DeleteModalProps = {
  isVisible: boolean;
  onClose: () => void;
  postId: number;
};

export function DeleteModal({
  isVisible,
  onClose,
  postId,
}: DeleteModalProps) {
  const deletePostMutation = useDeletePostMutation();

  const handleDelete = async () => {
    try {
      await deletePostMutation.mutateAsync(postId);
      onClose();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <Modal
      testID="delete-modal"
      isVisible={isVisible}
      onBackdropPress={() => {}}
    >
      <S.Card>
        <S.Label>Are you sure you want to delete this item?</S.Label>
        <S.ButtonRow>
          <StyledButton
            testID="cancel-delete-button"
            variant="outline"
            onPress={onClose}
          >
            <S.ButtonText>Cancel</S.ButtonText>
          </StyledButton>
          <StyledButton
            testID="confirm-delete-button"
            variant="danger"
            onPress={handleDelete}
          >
            <S.ButtonText style={{ color: colors.white }}>Delete</S.ButtonText>
          </StyledButton>
        </S.ButtonRow>
      </S.Card>
    </Modal>
  );
}
