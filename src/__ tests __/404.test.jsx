import { describe, it, expect } from "vitest";
import { render } from "./test-utils";

import _404 from "../routes/404";

describe("<_404 />", () => {
  it("renders correctly", () => {
    const { getByText } = render(<_404 />);

    expect(getByText("404 page not found")).toBeInTheDocument();
  });

  it("contains a link to the login page", () => {
    const { getByRole } = render(<_404 />);

    const loginLink = getByRole("link", { name: "Go to Home page" });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink.getAttribute("href")).toBe("/");
  });
});
