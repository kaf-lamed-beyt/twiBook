import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackUI } from "@components/error-boundary";
import { ToastProvider } from "@context/toast-provider";
import { AuthProvider } from "@context/auth-provider";
import "@style/global.scss";

import { Livvic } from "next/font/google";

const livic = Livvic({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "900"],
  display: "swap",
});

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
        <link rel="preconnect" href="https://fonts.googleapis.com" /> */
        {/* @ts-ignore */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          {/* @ts-ignore */}
          <ErrorBoundary FallbackComponent={FallbackUI}>
            <ToastProvider>
              <AuthProvider>
                <main className={livic.className}>
                  <Component {...pageProps} />
                </main>
              </AuthProvider>
            </ToastProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}
