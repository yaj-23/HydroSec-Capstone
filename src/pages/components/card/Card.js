import React from 'react';
import './Card.css'
import PropTypes from 'prop-types';

const Card = ({ icon, heading, sentences }) => {
  return (
    <div className="card">
      <img className="icon" src={icon} alt="Icon" />
      <h2 className="heading">{heading}</h2>
      <p className="sentences">{sentences}</p>
    </div>
  );
};

Card.propTypes = {
  icon: PropTypes.string.isRequired, // The source URL for the image
  heading: PropTypes.string.isRequired, // The heading text
  sentences: PropTypes.string.isRequired, // The sentences text
};

export default Card;