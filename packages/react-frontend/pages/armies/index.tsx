import { useUser } from "hooks/useUser";

const Armies = () => {
  const { account } = useUser({ redirectTo: "/" });

  if (!account || account.isLoggedIn === false) {
    return <>Loading...</>;
  }

  return (
    <>
      <main>
        <h1>Your Armies</h1>
      </main>
    </>
  );
};

export default Armies;
