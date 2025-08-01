import { colors } from "@/constants/Colors";
import React from "react";
import { StyledInput } from "../Input/styles";
import * as S from "../PostForm/styles";

type EditFormProps = {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
};

export function EditForm({
  title,
  setTitle,
  content,
  setContent,
}: EditFormProps) {
  return (
    <>
      <S.Label>Title</S.Label>
      <StyledInput
        testID="edit-title-input"
        placeholder="Hello Word"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={colors.placeholder}
      />
      <S.Label>Content</S.Label>
      <S.TextArea
        testID="edit-content-input"
        placeholder="Content here"
        value={content}
        onChangeText={setContent}
        multiline
        placeholderTextColor={colors.placeholder}
      />
    </>
  );
}
