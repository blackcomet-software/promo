"use client";

import { ReactNode } from "react";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers(props: {children: ReactNode}) {
  return (
    
        <QueryClientProvider client={queryClient} >
          {props.children}
        </QueryClientProvider>
  )
}
