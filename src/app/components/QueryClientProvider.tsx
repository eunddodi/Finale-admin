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
        staleTime: 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof AuthError) {
          redirectToLogin()
          return
        }
        if (error instanceof ForbiddenError) {
          alert('접근 권한이 없습니다. 관리자에게 문의하세요.')
          return
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
