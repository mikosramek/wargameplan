import Footer from "components/Footer";
import Header from "components/Header";
import useModal from "hooks/useModal";
import Head from "next/head";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  const { Modal } = useModal();
  return (
    <>
      <Head>
        <title>WarGameplan</title>
        <meta
          name="description"
          content="A site to help plan and keep track of tabletop wargame games"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        {children}
        {Modal}
      </main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
