import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackUI } from "@components/error-boundary";
import { ToastProvider } from "@context/toast-provider";
import { AuthProvider } from "@context/auth-provider";
import "@style/global.scss";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/twb-svg/twb-logo-36x36.svg"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          {/* @ts-ignore */}
          <ErrorBoundary FallbackComponent={FallbackUI}>
            <ToastProvider>
              <AuthProvider>
                <Component {...pageProps} />
              </AuthProvider>
            </ToastProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}
