import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { io } from "socket.io-client";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export const socket = io("http://localhost:3001");