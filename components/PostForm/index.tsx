import { colors } from "@/constants/Colors";
import React from "react";
import { StyledInput } from "../Input/styles";
import * as S from "./styles";

type PostFormProps = {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
};

export function PostForm({
  title,
  setTitle,
  content,
  setContent,
}: PostFormProps) {
  return (
    <>
      <S.Label>Title</S.Label>
      <StyledInput
        testID="post-title-input"
        placeholder="Hello Word"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={colors.placeholder}
      />
      <S.Label>Content</S.Label>
      <S.TextArea
        testID="post-content-input"
        placeholder="Content here"
        value={content}
        onChangeText={setContent}
        multiline
        placeholderTextColor={colors.placeholder}
      />
    </>
  );
}
