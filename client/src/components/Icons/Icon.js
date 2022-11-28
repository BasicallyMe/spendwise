import React from "react";
// import PropTypes from "prop-types";
import { IoTicketOutline } from "react-icons/io5";
import { Logo } from "./";

const Icon = ({ name }) => {
  switch (name) {
    case "Logo":
      return <Logo />;
    case "Entertainment":
      return <IoTicketOutline />;
    default:
      return null;
  }
};

// Icon.propTypes = {
//   name: PropTypes.string.isRequired,
// };

export default Icon;
