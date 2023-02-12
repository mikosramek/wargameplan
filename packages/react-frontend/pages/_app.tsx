import "../styles/styles.scss";
import type { AppProps } from "next/app";
import { useAuth } from "hooks/auth/useAuth";
import { useConfig } from "hooks/useConfig";

export default function App({ Component, pageProps }: AppProps) {
  useAuth();
  useConfig();
  return <Component {...pageProps} />;
}
