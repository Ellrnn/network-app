import { StyledInput } from "@/components/Input";
import { colors } from "@/constants/colors";

import * as S from "./PostForm.styles";

type PostFormProps = {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
  titleTestId?: string;
  contentTestId?: string;
};

export function PostForm({
  title,
  setTitle,
  content,
  setContent,
  titleTestId = "post-title-input",
  contentTestId = "post-content-input",
}: PostFormProps) {
  return (
    <>
      <S.Label>Title</S.Label>
      <StyledInput
        testID={titleTestId}
        placeholder="Hello World"
        value={title}
        onChangeText={setTitle}
        placeholderTextColor={colors.placeholder}
      />
      <S.Label>Content</S.Label>
      <S.TextArea
        testID={contentTestId}
        placeholder="Content here"
        value={content}
        onChangeText={setContent}
        multiline
        placeholderTextColor={colors.placeholder}
      />
    </>
  );
}
