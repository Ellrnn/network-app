import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react-native";
import { PropsWithChildren, ReactElement } from "react";

import { UserProvider } from "@/providers/UserProvider";

type CustomRenderOptions = RenderOptions & {
  username?: string;
};

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { gcTime: Infinity, retry: false },
      mutations: { retry: false },
    },
  });
}

export function createWrapper(username?: string) {
  const queryClient = createQueryClient();

  return function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>
        <UserProvider>{children}</UserProvider>
      </QueryClientProvider>
    );
  };
}

function customRender(ui: ReactElement, options?: CustomRenderOptions) {
  const { username, ...renderOptions } = options ?? {};
  return render(ui, { wrapper: createWrapper(username), ...renderOptions });
}

export { customRender as render };
