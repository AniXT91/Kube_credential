import { render, screen } from "@testing-library/react";
import Issue from "./Issue";
import { vi } from "vitest";

vi.mock("../api/client", () => ({
  api: { issue: vi.fn().mockResolvedValue({ data: { success: true, message: "ok" } }) }
}));

test("renders issue form", async () => {
  render(<Issue />);
  expect(screen.getByText(/Issue Credential/i)).toBeInTheDocument();
});
