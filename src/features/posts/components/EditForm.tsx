import { PostForm } from "./PostForm";

type EditFormProps = {
  title: string;
  setTitle: (title: string) => void;
  content: string;
  setContent: (content: string) => void;
};

export function EditForm(props: EditFormProps) {
  return (
    <PostForm
      {...props}
      titleTestId="edit-title-input"
      contentTestId="edit-content-input"
    />
  );
}
