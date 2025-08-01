import { colors } from "@/constants/Colors";
import { deletePost } from "@/services/api/posts";
import Modal from "react-native-modal";
import { StyledButton } from "../Button/styles";
import * as S from "./styles";

type DeleteModalProps = {
  isVisible: boolean;
  onClose: () => void;
  postId: number;
};

export function DeleteModal({ isVisible, onClose, postId }: DeleteModalProps) {
  const handleDelete = async () => {
    try {
      await deletePost(postId);
      onClose();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
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
              <S.ButtonText style={{ color: colors.white }}>
                Delete
              </S.ButtonText>
            </StyledButton>
          </S.ButtonRow>
        </S.Card>
      </Modal>
    </>
  );
}
