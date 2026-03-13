import {
  createContext,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";

type UserContextValue = {
  username: string;
  setUsername: (name: string) => void;
};

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

export function UserProvider({ children }: PropsWithChildren) {
  const [username, setUsername] = useState("");

  const value = useMemo(
    () => ({
      username,
      setUsername,
    }),
    [username]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
