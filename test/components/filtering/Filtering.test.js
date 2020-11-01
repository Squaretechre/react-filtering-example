import React, { useState } from "react";
import { Filtering, Filter } from "../../../src/components/filtering/Filtering";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import hotels from "../../data/hotels";

const Button = ({ isSelected, applyFilter, applyTogether, children }) => {
  return (
    <button onClick={applyFilter}>
      {children}
      {applyTogether && isSelected ? ` selected` : ` not selected`}
    </button>
  );
};

const Hotels = () => {
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [
    hotelAddressFilterSearchTerm,
    setHotelAddressFilterSearchTerm
  ] = useState("");

  return (
    <>
      <Filtering
        getOriginalDataSet={hotels}
        setFilteredDataSet={setFilteredHotels}
        applyTogether
      >
        {(props) => {
          return (
            <>
              <Filter transformation={(hotel) => hotel.stars === 5} {...props}>
                {(props) => {
                  return <Button {...props}>5 star</Button>;
                }}
              </Filter>
              <Filter transformation={(hotel) => hotel.price < 100} {...props}>
                {(props) => {
                  return <Button {...props}>{`price < 100`}</Button>;
                }}
              </Filter>
              <Filter transformation={(hotel) => hotel.stars > 3} {...props}>
                {(props) => {
                  return <Button {...props}>{"stars > 3"}</Button>;
                }}
              </Filter>
              <Filter
                transformation={(hotel) => hotel.reviews > 6000}
                {...props}
              >
                {(props) => {
                  return <Button {...props}>{"reviews > 6000"}</Button>;
                }}
              </Filter>
              <Filter {...props}>
                {() => {
                  return (
                    <input
                      type="text"
                      placeholder="Filter by address"
                      value={hotelAddressFilterSearchTerm}
                      onChange={(event) => {
                        const searchTerm = event.target.value.toLowerCase();

                        props.alwaysApply("filter-hotel-address", (hotel) => {
                          return hotel.address
                            .toLowerCase()
                            .includes(searchTerm);
                        });

                        setHotelAddressFilterSearchTerm(event.target.value);
                      }}
                    />
                  );
                }}
              </Filter>
              <button onClick={props.applySelected}>Apply filters</button>
              <button onClick={props.resetSelection}>Reset selection</button>
              <button onClick={props.removeAll}>Remove all filters</button>
            </>
          );
        }}
      </Filtering>
      {filteredHotels.map((hotel) => (
        <p key={hotel.name}>{hotel.name}</p>
      ))}
    </>
  );
};

const radissonBlue = "Radisson Blu Hotel, Berlin";
const parkInn = "Park Inn by Radisson Berlin Alexanderplatz";
const hampton = "Hampton by Hilton Berlin City Centre Alexanderplatz";
const hyperion = "Hyperion Hotel Berlin";
const riuPlaza = "Riu Plaza Berlin";
const titanicComfort = "TITANIC Comfort Mitte";

const fiveStarSelected = "5 star selected";
const fiveStarNotSelected = "5 star not selected";
const priceLessThan100Selected = "price < 100 selected";
const priceLessThan100NotSelected = "price < 100 not selected";
const starsGreaterThan3Selected = "stars > 3 selected";
const starsGreaterThan3NotSelected = "stars > 3 not selected";
const reviewsGreaterThan6000Selected = "reviews > 6000 selected";
const reviewsGreaterThan6000NotSelected = "reviews > 6000 not selected";

const applyFilters = "Apply filters";
const resetSelection = "Reset selection";
const removeAllFilters = "Remove all filters";
const filterByAddress = "Filter by address";

const expectHotelIsInTheDocument = (name) => {
  expect(screen.queryByText(name)).toBeInTheDocument();
};

const expectHotelIsNotInTheDocument = (name) => {
  expect(screen.queryByText(name)).not.toBeInTheDocument();
};

describe("Filtering", () => {
  describe("applying filters together", () => {
    it("does not apply any filters when it first renders", () => {
      render(<Hotels />);

      expectHotelIsInTheDocument(radissonBlue);
      expectHotelIsInTheDocument(parkInn);
      expectHotelIsInTheDocument(hampton);
      expectHotelIsInTheDocument(hyperion);
      expectHotelIsInTheDocument(riuPlaza);
      expectHotelIsInTheDocument(titanicComfort);
    });
  });

  it("does not apply filters when they are selected but not applied", () => {
    render(<Hotels />);

    fireEvent.click(screen.getByText(fiveStarNotSelected));
    fireEvent.click(screen.getByText(priceLessThan100NotSelected));

    expectHotelIsInTheDocument(radissonBlue);
    expectHotelIsInTheDocument(parkInn);
    expectHotelIsInTheDocument(hampton);
    expectHotelIsInTheDocument(hyperion);
    expectHotelIsInTheDocument(riuPlaza);
    expectHotelIsInTheDocument(titanicComfort);
  });

  it("applies always applied filters regardless of apply selected callback invocation", () => {
    render(<Hotels />);

    const hotelAddressFilterInput = screen.getByPlaceholderText(
      filterByAddress
    );

    fireEvent.change(hotelAddressFilterInput, { target: { value: "Mitte" } });

    expectHotelIsInTheDocument(radissonBlue);
    expectHotelIsInTheDocument(parkInn);
    expectHotelIsInTheDocument(hampton);
    expectHotelIsInTheDocument(titanicComfort);

    expectHotelIsNotInTheDocument(hyperion);
    expectHotelIsNotInTheDocument(riuPlaza);
  });

  it("applies selected filters when the apply selected callback is invoked", async () => {
    render(<Hotels />);

    fireEvent.click(screen.getByText(fiveStarNotSelected));
    fireEvent.click(screen.getByText(applyFilters));

    expectHotelIsInTheDocument(radissonBlue);
    expectHotelIsInTheDocument(hyperion);

    expectHotelIsNotInTheDocument(parkInn);
    expectHotelIsNotInTheDocument(hampton);
    expectHotelIsNotInTheDocument(riuPlaza);
    expectHotelIsNotInTheDocument(titanicComfort);
  });

  it("applies multiple filters at the same time", async () => {
    render(<Hotels />);

    fireEvent.click(screen.getByText(priceLessThan100NotSelected));
    fireEvent.click(screen.getByText(starsGreaterThan3NotSelected));
    fireEvent.click(screen.getByText(reviewsGreaterThan6000NotSelected));
    fireEvent.click(screen.getByText(applyFilters));

    expectHotelIsInTheDocument(parkInn);
    expectHotelIsInTheDocument(riuPlaza);

    expectHotelIsNotInTheDocument(radissonBlue);
    expectHotelIsNotInTheDocument(hyperion);
    expectHotelIsNotInTheDocument(hampton);
    expectHotelIsNotInTheDocument(titanicComfort);
  });

  it("applies multiple filters at the same time", async () => {
    render(<Hotels />);

    fireEvent.click(screen.getByText(priceLessThan100NotSelected));
    fireEvent.click(screen.getByText(starsGreaterThan3NotSelected));
    fireEvent.click(screen.getByText(reviewsGreaterThan6000NotSelected));
    fireEvent.click(screen.getByText(applyFilters));

    expectHotelIsInTheDocument(parkInn);
    expectHotelIsInTheDocument(riuPlaza);

    expectHotelIsNotInTheDocument(radissonBlue);
    expectHotelIsNotInTheDocument(hyperion);
    expectHotelIsNotInTheDocument(hampton);
    expectHotelIsNotInTheDocument(titanicComfort);
  });

  it("applies filters on top of already applied filters", async () => {
    render(<Hotels />);

    fireEvent.click(screen.getByText(starsGreaterThan3NotSelected));
    fireEvent.click(screen.getByText(applyFilters));

    expectHotelIsInTheDocument(parkInn);
    expectHotelIsInTheDocument(riuPlaza);
    expectHotelIsInTheDocument(radissonBlue);
    expectHotelIsInTheDocument(hyperion);

    expectHotelIsNotInTheDocument(hampton);
    expectHotelIsNotInTheDocument(titanicComfort);

    fireEvent.click(screen.getByText(reviewsGreaterThan6000NotSelected));
    fireEvent.click(screen.getByText(applyFilters));

    expectHotelIsInTheDocument(parkInn);
    expectHotelIsInTheDocument(riuPlaza);
    expectHotelIsInTheDocument(radissonBlue);

    expectHotelIsNotInTheDocument(hyperion);
    expectHotelIsNotInTheDocument(hampton);
    expectHotelIsNotInTheDocument(titanicComfort);

    fireEvent.click(screen.getByText(priceLessThan100NotSelected));
    fireEvent.click(screen.getByText(applyFilters));

    expectHotelIsInTheDocument(parkInn);
    expectHotelIsInTheDocument(riuPlaza);

    expectHotelIsNotInTheDocument(radissonBlue);
    expectHotelIsNotInTheDocument(hyperion);
    expectHotelIsNotInTheDocument(hampton);
    expectHotelIsNotInTheDocument(titanicComfort);
  });

  it("applies always applied filters on top of already applied filters", () => {
    render(<Hotels />);

    fireEvent.click(screen.getByText(starsGreaterThan3NotSelected));
    fireEvent.click(screen.getByText(reviewsGreaterThan6000NotSelected));
    fireEvent.click(screen.getByText(applyFilters));

    expectHotelIsInTheDocument(parkInn);
    expectHotelIsInTheDocument(riuPlaza);
    expectHotelIsInTheDocument(radissonBlue);

    expectHotelIsNotInTheDocument(hyperion);
    expectHotelIsNotInTheDocument(hampton);
    expectHotelIsNotInTheDocument(titanicComfort);

    const hotelAddressFilterInput = screen.getByPlaceholderText(
      filterByAddress
    );

    fireEvent.change(hotelAddressFilterInput, {
      target: { value: "Karl-Liebknecht-Str" }
    });

    expectHotelIsInTheDocument(radissonBlue);

    expectHotelIsNotInTheDocument(parkInn);
    expectHotelIsNotInTheDocument(hampton);
    expectHotelIsNotInTheDocument(titanicComfort);
    expectHotelIsNotInTheDocument(hyperion);
    expectHotelIsNotInTheDocument(riuPlaza);
  });

  it("toggles a filters selected state when it is selected", async () => {
    render(<Hotels />);

    fireEvent.click(screen.getByText(priceLessThan100NotSelected));

    expect(screen.queryByText(priceLessThan100Selected)).toBeInTheDocument();

    expect(
      screen.queryByText(priceLessThan100NotSelected)
    ).not.toBeInTheDocument();
  });

  it("toggles a filters selected state when it is deselected", async () => {
    render(<Hotels />);

    fireEvent.click(screen.getByText(priceLessThan100NotSelected));

    expect(screen.queryByText(priceLessThan100Selected)).toBeInTheDocument();

    fireEvent.click(screen.getByText(priceLessThan100Selected));

    expect(screen.queryByText(priceLessThan100NotSelected)).toBeInTheDocument();
  });

  it("resets the selected filters to those that are applied when the reset selection callback is invoked", async () => {
    render(<Hotels />);

    fireEvent.click(screen.getByText(fiveStarNotSelected));
    fireEvent.click(screen.getByText(priceLessThan100NotSelected));
    fireEvent.click(screen.getByText(applyFilters));

    expect(screen.queryByText(fiveStarSelected)).toBeInTheDocument();
    expect(screen.queryByText(priceLessThan100Selected)).toBeInTheDocument();
    expect(
      screen.queryByText(starsGreaterThan3NotSelected)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(reviewsGreaterThan6000NotSelected)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(fiveStarSelected));
    fireEvent.click(screen.getByText(priceLessThan100Selected));
    fireEvent.click(screen.getByText(starsGreaterThan3NotSelected));
    fireEvent.click(screen.getByText(reviewsGreaterThan6000NotSelected));

    expect(screen.queryByText(fiveStarNotSelected)).toBeInTheDocument();
    expect(screen.queryByText(priceLessThan100NotSelected)).toBeInTheDocument();
    expect(screen.queryByText(starsGreaterThan3Selected)).toBeInTheDocument();
    expect(
      screen.queryByText(reviewsGreaterThan6000Selected)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(resetSelection));

    expect(screen.queryByText(fiveStarSelected)).toBeInTheDocument();
    expect(screen.queryByText(priceLessThan100Selected)).toBeInTheDocument();
    expect(
      screen.queryByText(starsGreaterThan3NotSelected)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(reviewsGreaterThan6000NotSelected)
    ).toBeInTheDocument();
  });

  it("removes all applied filter when the remove all callback is invoked", async () => {
    render(<Hotels />);

    fireEvent.click(screen.getByText(fiveStarNotSelected));
    fireEvent.click(screen.getByText(priceLessThan100NotSelected));
    fireEvent.click(screen.getByText(applyFilters));

    expectHotelIsInTheDocument(hyperion);

    expectHotelIsNotInTheDocument(radissonBlue);
    expectHotelIsNotInTheDocument(parkInn);
    expectHotelIsNotInTheDocument(hampton);
    expectHotelIsNotInTheDocument(riuPlaza);
    expectHotelIsNotInTheDocument(titanicComfort);

    fireEvent.click(screen.getByText(removeAllFilters));

    expectHotelIsInTheDocument(radissonBlue);
    expectHotelIsInTheDocument(parkInn);
    expectHotelIsInTheDocument(hampton);
    expectHotelIsInTheDocument(hyperion);
    expectHotelIsInTheDocument(riuPlaza);
    expectHotelIsInTheDocument(titanicComfort);
  });
});
