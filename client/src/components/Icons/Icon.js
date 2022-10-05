import React from "react";
// import PropTypes from "prop-types";
import { Logo } from './';

const Icon = ({ name }) => {
  switch (name) {
    case "Logo":
      return <Logo />;
    default:
      return null;
  }
};

// Icon.propTypes = {
//   name: PropTypes.string.isRequired,
// };

export default Icon;
