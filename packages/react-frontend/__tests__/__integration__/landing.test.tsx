import { render, screen } from "@testing-library/react";
import Landing from "pages/index";

// import { useRouter } from "next/navigation";
// useRouter.mockReturnValue({ query: {} });

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: () => "/", //jest.fn(),
}));

describe("Landing", () => {
  beforeEach(() => {
    render(<Landing />);
  });
  it("render the expected heading", () => {
    const heading = screen.getByRole("heading", { name: "WarGameplan" });
    expect(heading).toBeInTheDocument();
  });
  it("renders the login form", () => {
    const form = screen.getByRole("form");
    const formHeading = screen.getByRole("heading", {
      name: /Login/i,
    });

    expect(form).toBeInTheDocument();
    expect(formHeading).toBeInTheDocument();
  });
});
