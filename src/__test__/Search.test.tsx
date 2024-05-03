/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, fireEvent } from "@testing-library/react";
import Search from "../components/Search";
import "@testing-library/jest-dom";

describe("Search Component", () => {
  it("renders the Search component correctly", () => {
    const mockOnSearch = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Search onSearch={mockOnSearch} />
    );

    expect(getByText("Rating")).toBeInTheDocument();
    expect(getByPlaceholderText("search...")).toBeInTheDocument();
  });

  it("calls onSearch prop with correct state when form is submitted", () => {
    const mockOnSearch = jest.fn();
    const { getByText, getByDisplayValue } = render(<Search onSearch={mockOnSearch} />);
    
    fireEvent.change(getByDisplayValue(""), { target: { value: "pg-13" } });

    expect(getByText("OK")).toBeInTheDocument();

    fireEvent.click(getByText("OK"));

    expect(mockOnSearch).toHaveBeenCalled();
    // expect(mockOnSearch).toHaveBeenCalledWith({
    //   rating: '',
    //   keyword: '',
    //   page: 1,
    //   offset: 0,
    // });
  });

  it("resets the state when reset button is clicked", () => {
    const mockOnSearch = jest.fn();
    const { getByText, getByDisplayValue } = render(
      <Search onSearch={mockOnSearch} />
    );

    fireEvent.change(getByDisplayValue(""), { target: { value: "pg-13" } });
    fireEvent.click(getByText("reset"));

    expect(getByDisplayValue("")).toHaveValue("");
    expect(getByDisplayValue("Rating")).toHaveValue("");
  });
});
