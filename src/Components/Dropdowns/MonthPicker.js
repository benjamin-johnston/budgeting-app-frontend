function MonthPicker(props) {
  const onChange = (event) => {
    props.setMonth(event.target.value);
  };

  return (
    <div>
      <label htmlFor="month">Month:</label>{" "}
      <input
        type="month"
        id="month"
        name="month"
        value={props.month}
        onChange={onChange}
      ></input>
    </div>
  );
}

export default MonthPicker;
