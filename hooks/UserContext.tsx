import React, { createContext, ReactNode, useState } from "react";

type UserContextType = {
  username: string;
  setUsername: (name: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};
