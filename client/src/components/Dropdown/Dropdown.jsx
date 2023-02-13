import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

const Dropdown = (props) => {
  const { data } = props;
  const [selectedItem, setselectedItem] = useState(data[0]);

  return (
    <div className="dropdown">
      <Listbox value={selectedItem} onChange={setselectedItem}>
        <Listbox.Button className="dropdown-btn">
          <span className="title">Category</span>
          <FiChevronDown className="icon" />
        </Listbox.Button>
        <Listbox.Options className="options">
          {data.map((item) => (
            <Listbox.Option
              key={item.id}
              value={item}
              className="list-item"
              disabled={item.unavailable}
            >
              {item.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default Dropdown;
