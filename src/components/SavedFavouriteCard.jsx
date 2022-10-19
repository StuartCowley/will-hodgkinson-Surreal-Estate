import PropTypes from "prop-types";
import React from "react";
import "../styles/sass/saved-favourite-card.scss";

const SavedFavouriteCard = ({ favId, title, onDeleteFavourite }) => {
  return (
    <div className="saved-favourite-card">
      <div className="listing">{title}</div>
      <div className="remove">
        <button type="button" onClick={() => onDeleteFavourite(favId)}>
          Remove
        </button>
      </div>
    </div>
  );
};

SavedFavouriteCard.propTypes = {
  favId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onDeleteFavourite: PropTypes.func.isRequired,
};

export default SavedFavouriteCard;
