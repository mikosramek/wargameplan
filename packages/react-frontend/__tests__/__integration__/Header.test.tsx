import { render, screen } from "@testing-library/react";
import Header from "components/Header";
import { useAccountStore } from "store/account";
import { useGeneralStore } from "store/general";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: () => "/",
}));

beforeAll(() => {
  const initialStoreState = useGeneralStore.getState();
  useGeneralStore.setState(initialStoreState, true);

  const initialAccountStoreState = useAccountStore.getState();
  useAccountStore.setState(initialAccountStoreState, true);
});

describe("Header", () => {
  beforeEach(() => {
    useGeneralStore.setState({ heading: "The heading in the header" });
    render(<Header />);
  });
  it("render the expected heading text", () => {
    const heading = screen.getByRole("heading", {
      name: "The heading in the header",
    });
    expect(heading).toBeInTheDocument();
  });
  describe("When not logged in", () => {
    beforeAll(() => {
      useAccountStore.setState({ isLoggedIn: false });
    });
    it("shows the login and signup anchors", () => {
      const login = screen.getByRole("link", { name: "Log in" });
      const signup = screen.getByRole("link", { name: "Sign up" });
      expect(login).toBeInTheDocument();
      expect(signup).toBeInTheDocument();
    });
    it("renders the correct css for active page", () => {
      const login = screen.getByRole("link", { name: "Log in" });
      expect(login).toHaveStyle("text-decoration: underline;");
      const signup = screen.getByRole("link", { name: "Sign up" });
      expect(signup).not.toHaveStyle("text-decoration: underline;");
    });
  });
  describe("When logged in", () => {
    beforeAll(() => {
      useAccountStore.setState({ isLoggedIn: true });
    });
    it("shows the signout button", async () => {
      const login = await screen.queryByText("Log in");
      expect(login).not.toBeInTheDocument();
      const signout = screen.getByRole("button", { name: "Sign out" });
      expect(signout).toBeInTheDocument();
    });
  });
});
