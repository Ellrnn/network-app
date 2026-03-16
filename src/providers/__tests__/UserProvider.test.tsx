import { act, renderHook, waitFor } from "@testing-library/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropsWithChildren } from "react";

import { UserProvider } from "../UserProvider";
import { useUser } from "@/hooks/useUser";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

function wrapper({ children }: PropsWithChildren) {
  return <UserProvider>{children}</UserProvider>;
}

describe("UserProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("starts with empty username and isLoading true", () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    expect(result.current.username).toBe("");
    expect(result.current.isLoading).toBe(true);
  });

  it("restores username from AsyncStorage on mount", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("stored_user");

    const { result } = renderHook(() => useUser(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.username).toBe("stored_user");
  });

  it("sets isLoading to false even when storage is empty", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const { result } = renderHook(() => useUser(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.username).toBe("");
  });

  it("setUsername updates state and persists to AsyncStorage", async () => {
    const { result } = renderHook(() => useUser(), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.setUsername("new_user");
    });

    expect(result.current.username).toBe("new_user");
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@network_app/username",
      "new_user"
    );
  });

  it("logout clears username and removes from AsyncStorage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("existing_user");

    const { result } = renderHook(() => useUser(), { wrapper });

    await waitFor(() => {
      expect(result.current.username).toBe("existing_user");
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.username).toBe("");
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
      "@network_app/username"
    );
  });
});
