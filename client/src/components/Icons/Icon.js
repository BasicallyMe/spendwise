import React from "react";
// import PropTypes from "prop-types";
import { IoTicketOutline } from "react-icons/io5";
import { BsCheckCircleFill } from 'react-icons/bs';
import { Logo, Mastercard, Visa } from "./";

const Icon = ({ name }) => {
  switch (name) {
    case "Logo":
      return <Logo />;
    case "Entertainment":
      return <IoTicketOutline />;
    case "Mastercard":
      return <Mastercard />;
    case "Visa":
      return <Visa />;
    case "Check": 
      return <BsCheckCircleFill />
    default:
      return null;
  }
};

// Icon.propTypes = {
//   name: PropTypes.string.isRequired,
// };

export default Icon;
