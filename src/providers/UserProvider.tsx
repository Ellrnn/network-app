import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const USERNAME_KEY = "@network_app/username";

type UserContextValue = {
  username: string;
  setUsername: (name: string) => void;
  logout: () => void;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextValue | undefined>(
  undefined
);

export function UserProvider({ children }: PropsWithChildren) {
  const [username, setUsernameState] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(USERNAME_KEY)
      .then((stored) => {
        if (stored) setUsernameState(stored);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const setUsername = useCallback((name: string) => {
    setUsernameState(name);
    AsyncStorage.setItem(USERNAME_KEY, name).catch(() => {});
  }, []);

  const logout = useCallback(() => {
    setUsernameState("");
    AsyncStorage.removeItem(USERNAME_KEY).catch(() => {});
  }, []);

  const value = useMemo(
    () => ({ username, setUsername, logout, isLoading }),
    [username, setUsername, logout, isLoading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
