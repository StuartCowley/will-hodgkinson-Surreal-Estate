import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import "../styles/sass/sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const [query, setQuery] = useState("");
  const { search } = useLocation();

  const buildQueryString = (operation, valueObj) => {
    const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });
    const newQueryParams = {
      ...currentQueryParams,
      [operation]: JSON.stringify({
        ...JSON.parse(currentQueryParams[operation] || "{}"),
        ...valueObj,
      }),
    };

    return qs.stringify(newQueryParams, {
      addQueryPrefix: true,
      encode: false,
    });
  };

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const newQueryString = buildQueryString("query", {
      title: { $regex: query },
    });

    navigate(newQueryString);
  };

  return (
    <div className="sidebar">
      <form className="search" onSubmit={handleSearch}>
        <h2>Filter By Title</h2>
        <div className="input">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="button">
          <button type="submit">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
      <div className="byCity">
        <h2>Filter By City</h2>
        <Link to={buildQueryString("query", { city: "Liverpool" })}>
          Liverpool
        </Link>
        <Link to={buildQueryString("query", { city: "Manchester" })}>
          Manchester
        </Link>
        <Link to={buildQueryString("query", { city: "Leeds" })}>Leeds</Link>
        <Link to={buildQueryString("query", { city: "Sheffield" })}>
          Sheffield
        </Link>
      </div>
      <div className="byOrder">
        <h2>Sort by</h2>
        <Link to={buildQueryString("sort", { price: 1 })}>Price Ascending</Link>
        <Link to={buildQueryString("sort", { price: -1 })}>
          Price Descending
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
