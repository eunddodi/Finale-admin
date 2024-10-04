"use client";

import { redirectToLogin } from "@/lib/utils";
import { AuthError, ForbiddenError } from "@/types/errors";
import { QueryCache, QueryClient, QueryClientProvider as QueryClientProviderOrigin } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0
      }
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof AuthError || error instanceof ForbiddenError) {
          alert('로그인에 실패했습니다. 다시 로그인해주세요.')
          redirectToLogin()
        }
      }
    }),
  }));

  return (
    <QueryClientProviderOrigin client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProviderOrigin>
  );
}
