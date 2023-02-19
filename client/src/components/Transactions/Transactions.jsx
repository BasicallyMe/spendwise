import React, { useState } from "react";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import Dropdown from "../Dropdown/Dropdown";
import isToday from "date-fns/isToday";
import parseISO from "date-fns/parseISO";
import { Icon } from "../Icons";
import { getTransactions } from "../../fetchers/fetchers";
import { useQuery } from "@tanstack/react-query";
import "./Transaction.scss";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

export default function Transactions() {
  const [items, setItems] = useState([]);
  const { data, status, isSuccess, error, isLoading } = useQuery(
    ["user", "transactions"],
    getTransactions
  );

  if (isSuccess) {
    if (!isEqual(data.data, items)) {
      setItems(data.data);
    }
  }

  // if (!isEmpty(items)) {
  //   console.log(isToday(parseISO("2023-02-19")));
  // }

  return (
    <div className="transaction">
      <div className="section-header">
        <h1>Your transactions</h1>
      </div>
      {!isSuccess ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="btn-wrapper">
            <Dropdown data={people} />
            <Dropdown data={people} />
          </div>
          <div className="transaction-list">
            {!isEmpty(items) && (
              <ul className="list-items">
                {items.map((item) => (
                  <li className="item" key={item.id}>
                    <div className="icon">
                      <Icon name={item.category} />
                    </div>
                    <div className="item-details">
                      <div className="category">
                        <h4>{item.category}</h4>
                        <span className="date">
                          {isToday(parseISO(item.date)) ? "Today" : item.date}
                        </span>
                      </div>
                      <div className="amount">
                        <h4>{item.amount}</h4>
                        <span className="type">{item.type}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="btn-wrapper">
        <div className="btn loader" />
        <div className="btn loader" />
        <div className="btn loader" />
        <div className="btn loader" />
      </div>
      <div className="list loader">
        <h2>Loading your transactions...</h2>
      </div>
    </div>
  );
};
