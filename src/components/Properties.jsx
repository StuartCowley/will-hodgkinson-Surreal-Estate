import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import Alert from "./Alert";
import SideBar from "./SideBar";
import "../styles/sass/properties.scss";

const Properties = ({ userID, properties, setProperties, alert, setAlert }) => {
  const { search } = useLocation();
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/PropertyListing${search}`)
      .then(({ data }) => setProperties(data))
      .catch(() => {
        setAlert({
          message: "Server error. Please try again later.",
          isSuccess: false,
        });
      });
  }, [search]);

  const handleSaveProperty = (propertyId) => {
    axios.post("http://localhost:4000/api/v1/Favourite", {
      propertyListing: propertyId,
      fbUserId: userID,
    });
  };

  return (
    <div className="properties">
      <SideBar />
      <Alert message={alert.message} success={alert.isSuccess} />
      <div className="container">
        {properties.map((property) => (
          <PropertyCard
            key={property._id}
            {...property}
            userID={userID}
            onSaveProperty={handleSaveProperty}
          />
        ))}
      </div>
    </div>
  );
};

Properties.propTypes = {
  alert: PropTypes.shape({
    isSuccess: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      bedrooms: PropTypes.string.isRequired,
      bathrooms: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  setAlert: PropTypes.func.isRequired,
  setProperties: PropTypes.func.isRequired,
  userID: PropTypes.string.isRequired,
};

export default Properties;
