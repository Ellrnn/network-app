import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

import { colors } from "@/constants/colors";
import { Comment } from "@/features/posts/types";
import { getTimeAgo } from "@/lib/formatters";

type CommentsSheetProps = {
  visible: boolean;
  onClose: () => void;
  comments: Comment[];
  currentUser: string;
  onAddComment: (content: string) => void;
  onDeleteComment: (commentId: string) => void;
  isPending?: boolean;
};

export function CommentsSheet({
  visible,
  onClose,
  comments,
  currentUser,
  onAddComment,
  onDeleteComment,
  isPending,
}: CommentsSheetProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddComment(trimmed);
    setText("");
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
      propagateSwipe
      avoidKeyboard
    >
      <View style={styles.container}>
        <View style={styles.handle} />
        <Text style={styles.title}>Comments ({comments.length})</Text>

        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          style={styles.list}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <View style={styles.commentRow}>
              <View style={styles.commentBody}>
                <Text style={styles.commentUser}>@{item.username}</Text>
                <Text style={styles.commentText}>{item.content}</Text>
                <Text style={styles.commentTime}>
                  {getTimeAgo(item.createdDatetime)}
                </Text>
              </View>
              {item.username === currentUser && (
                <Pressable
                  onPress={() => onDeleteComment(item.id)}
                  hitSlop={8}
                >
                  <Ionicons
                    name="trash-outline"
                    size={16}
                    color={colors.danger}
                  />
                </Pressable>
              )}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>No comments yet. Be the first!</Text>
          }
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Write a comment..."
            placeholderTextColor={colors.placeholder}
            value={text}
            onChangeText={setText}
            editable={!isPending}
            onSubmitEditing={handleSend}
            returnKeyType="send"
          />
          <Pressable
            style={[styles.sendBtn, !text.trim() && styles.sendDisabled]}
            onPress={handleSend}
            disabled={!text.trim() || isPending}
          >
            <Ionicons
              name="send"
              size={18}
              color={text.trim() ? colors.white : colors.gray}
            />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
    paddingBottom: 24,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray,
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 16,
    color: colors.text,
  },
  list: {
    paddingHorizontal: 16,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  commentBody: {
    flex: 1,
  },
  commentUser: {
    fontSize: 13,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 2,
  },
  commentTime: {
    fontSize: 11,
    color: colors.border,
  },
  empty: {
    textAlign: "center",
    color: colors.placeholder,
    paddingVertical: 24,
    fontSize: 14,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  sendDisabled: {
    backgroundColor: colors.gray,
  },
});
