import "../styles/styles.scss";
import type { AppProps } from "next/app";
import { useAuth } from "hooks/auth/useAuth";

export default function App({ Component, pageProps }: AppProps) {
  useAuth();
  return <Component {...pageProps} />;
}
