import { render, screen } from "@testing-library/react";
import Signup from "pages/signup/";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: () => "/signup",
}));

describe("Signup", () => {
  beforeEach(() => {
    render(<Signup />);
  });
  it("render the expected heading", () => {
    const heading = screen.getByRole("heading", { name: "WarGameplan" });
    expect(heading).toBeInTheDocument();
  });
  it("renders the login form", () => {
    const form = screen.getByRole("form");
    const formHeading = screen.getByRole("heading", {
      name: /Sign up/i,
    });

    expect(form).toBeInTheDocument();
    expect(formHeading).toBeInTheDocument();
  });
});
