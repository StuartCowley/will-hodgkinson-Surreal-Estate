import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SavedFavouriteCard from "../components/SavedFavouriteCard";

describe("SavedFavouriteCard", () => {
  const validProps = {
    title: "2-bed semi-detached",
    favId: "1",
    onDeleteFavourite: jest.fn(),
  };

  test("renders title prop", () => {
    const { getByText } = render(<SavedFavouriteCard {...validProps} />);

    expect(getByText("2-bed semi-detached")).toHaveClass("listing");
  });

  test("function fires", async () => {
    render(<SavedFavouriteCard {...validProps} />);
    const button = screen.getByText("Remove");
    await fireEvent.click(button);

    expect(validProps.onDeleteFavourite).toHaveBeenCalled();
  });
});
