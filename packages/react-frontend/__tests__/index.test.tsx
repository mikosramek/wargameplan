import { render, screen } from "@testing-library/react";
import Landing from "pages/index";

// import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: () => "/", //jest.fn(),
}));

describe("Landing", () => {
  it("renders the login form", () => {
    // useRouter.mockReturnValue({ query: {} });
    render(<Landing />);

    const heading = screen.getByRole("heading", {
      name: /Login/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
