import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState([]);

  async function getData() {
    try {
      let response = await fetch("/api/anime", {
        mode: "cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Karasuno High School Volleyball Team</h1>
      {data.length !== 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={`${index}-${item}`}>{item}</li>
          ))}
        </ul>
      ) : <p>No data available</p>}
    </div>
  );
};

export default App;
