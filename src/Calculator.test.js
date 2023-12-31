import React from "react";
import Calculator from "./Calculator";
// import react-testing methods
import { render, fireEvent, screen } from "@testing-library/react";

describe("Calculator", () => {
  // Renders without crashing
  // Doesn't allow for 0 years growth
  // Displays a result with the £ sign when the Calculate button is clicked
  // Result is displayed in the correct NumberFormat (i.e. £100,000.00)

  it("renders without crashing", () => {
    const div = document.createElement("div");
    render(<Calculator />, div);
  });

  it("doesn't allow for 0 years growth", () => {
    // Arrange
    const { getByText, getByLabelText } = render(<Calculator />);
    const timePeriodInput = getByLabelText("Years to grow:");

    //Act
    fireEvent.change(timePeriodInput, { target: { value: 0 } });
    fireEvent.change(timePeriodInput, { target: { value: "00" } });

    //Assert
    expect(getByText("Years to grow must be above zero.")).toBeTruthy();
  });

  it("displays a result with the £ sign when the Calculate button is clicked", async () => {
    const { getByText, getByLabelText } = render(<Calculator />);
    const btn = getByText("Calculate");
    const baseAmountInput = getByLabelText("Base Amount:");
    const annualInterestInput = getByLabelText("Annual Interest (%):");
    const timePeriodInput = getByLabelText("Years to grow:");

    //Act
    fireEvent.change(baseAmountInput, { target: { value: 100000 } });
    fireEvent.change(annualInterestInput, { target: { value: 6 } });
    fireEvent.change(timePeriodInput, { target: { value: 10 } });

    fireEvent.click(btn);

    //   // Assert
    expect(getByText("£181,939.67"));
  });
});
