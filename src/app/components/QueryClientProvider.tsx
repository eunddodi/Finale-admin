"use client";

import { redirectToLogin } from "@/lib/utils";
import { AuthError, ForbiddenError } from "@/types/errors";
import { QueryCache, QueryClient, QueryClientProvider as QueryClientProviderOrigin } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        if (error instanceof AuthError || error instanceof ForbiddenError) {
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
