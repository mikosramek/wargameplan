import Footer from "@components/Footer";
import Header from "@components/Header";
import Head from "next/head";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Warhammer Gameplan</title>
        <meta
          name="description"
          content="A site to help plan and keep track of warhammer games"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
