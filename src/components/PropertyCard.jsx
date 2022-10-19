import PropTypes from "prop-types";
import React from "react";
import "../styles/sass/property-card.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faBed,
  faSterlingSign,
  faEnvelope,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const PropertyCard = ({
  _id,
  title,
  type,
  bathrooms,
  bedrooms,
  price,
  city,
  email,
  onSaveProperty,
  userID,
}) => {
  return (
    <div className="property-card">
      <div className="title">{title}</div>
      <div className="type">
        {type} - {city}
      </div>
      <div className="bathrooms">
        <div className="icon">
          <FontAwesomeIcon icon={faBath} />
        </div>
        {bathrooms}
      </div>
      <div className="bedrooms">
        <div className="icon">
          <FontAwesomeIcon icon={faBed} />
        </div>
        {bedrooms}
      </div>
      <div className="price">
        <FontAwesomeIcon icon={faSterlingSign} />
        {price}
      </div>
      <div className="email">
        <a href={`mailto:${email}`}>
          <div className="icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>
          Email
        </a>
      </div>
      <div className="favourite">
        {userID && (
          <button
            type="button"
            onClick={() => onSaveProperty(_id)}
            className="save"
          >
            <div className="icon">
              <FontAwesomeIcon icon={faStar} />
            </div>
            Save
          </button>
        )}
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  _id: PropTypes.string.isRequired,
  bathrooms: PropTypes.string.isRequired,
  bedrooms: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onSaveProperty: PropTypes.func.isRequired,
  price: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
};

export default PropertyCard;
