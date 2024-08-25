"use client";

import { QueryClient, QueryClientProvider as QueryClientProviderOrigin } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProviderOrigin client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProviderOrigin>
  );
}
