import { getByRole, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Die from "./Die";

test("die", () => {
  render(<Die />);
  const headingElement = screen.getByRole("heading");
  expect(headingElement).toBeInTheDocument();
});
