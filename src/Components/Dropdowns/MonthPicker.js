import React, { useState } from "react";

function MonthPicker() {
  const [month, setMonth] = useState(() => {
    var today = new Date();
    var mm = today.getMonth() + 1;

    if (mm < 10) {
      mm = "0" + mm;
    }
    var initialMonth = today.getFullYear() + "-" + mm;

    return initialMonth;
  });

  const onChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div>
      <label htmlFor="month">Month:</label>{" "}
      <input
        type="month"
        id="month"
        name="month"
        value={month}
        onChange={onChange}
      ></input>
    </div>
  );
}

export default MonthPicker;
