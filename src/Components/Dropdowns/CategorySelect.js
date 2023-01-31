import React from "react";
import { Label, Input } from "reactstrap";

function CategorySelect(props) {
  const selectOptions = props.expenseCategories?.map((category) => {
    return (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    );
  });

  return (
    <React.Fragment>
      {props.showLabel && <Label for="categoryId">Category</Label>}
      <Input
        id="categoryId"
        name="categoryId"
        type="select"
        onChange={props.onChange}
        value={props.categoryId === null ? "" : props.categoryId}
      >
        {selectOptions}
      </Input>
    </React.Fragment>
  );
}

export default CategorySelect;
