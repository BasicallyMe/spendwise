import React from "react";
// import PropTypes from "prop-types";
import { IoTicketOutline } from "react-icons/io5";
import { BsCheckCircleFill, BsFillExclamationCircleFill } from "react-icons/bs";
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
    case "Error": 
      return <BsFillExclamationCircleFill />
    default:
      return null;
  }
};

// Icon.propTypes = {
//   name: PropTypes.string.isRequired,
// };

export default Icon;
