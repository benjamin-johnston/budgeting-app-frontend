import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import CategorySelect from "../Dropdowns/CategorySelect";

function AddEditForm(props) {
  const [form, setValues] = useState({
    id: 0,
    description: "",
    amount: "",
    categoryId: "",
    expenseDate: "",
  });

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitFormAdd = (e) => {
    console.log(form);
    e.preventDefault();
    fetch("http://localhost:8080/budgetingapp/expenses/save", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: form.description,
        amount: form.amount,
        categoryId: form.categoryId,
        expenseDate: form.expenseDate,
        staticExpenseInd: "N",
      }),
    })
      .then((response) => response.json())
      .then((expense) => {
        props.addExpenseToState(expense);
        props.toggle();
      })
      .catch((err) => console.log(err));
  };

  const submitFormEdit = (e) => {
    console.log(form);
    e.preventDefault();
    fetch("http://localhost:8080/budgetingapp/expenses/save", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: form.id,
        description: form.description,
        amount: form.amount,
        categoryId: form.categoryId,
        expenseDate: form.expenseDate,
      }),
    })
      .then((response) => response.json())
      .then((expense) => {
        props.updateState(expense);
        props.toggle();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.expense) {
      const { id, description, amount, categoryId, expenseDate } =
        props.expense;
      setValues({
        id,
        description,
        amount,
        categoryId,
        expenseDate,
      });
    }
  }, [props.expense]);

  return (
    <Form onSubmit={props.expense ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="description">Expense</Label>
        <Input
          type="text"
          name="description"
          id="description"
          onChange={onChange}
          value={form.description === null ? "" : form.description}
        />
      </FormGroup>
      <FormGroup>
        <Label for="amount">Amount</Label>
        <Input
          type="text"
          name="amount"
          id="amount"
          onChange={onChange}
          value={form.amount === null ? "" : form.amount}
        />
      </FormGroup>
      <FormGroup>
        <CategorySelect
          categoryId={form.categoryId}
          expenseCategories={props.expenseCategories}
          onChange={onChange}
          showLabel
        />
      </FormGroup>
      <FormGroup>
        <Label for="expenseDate">Expense Date</Label>
        <Input
          type="date"
          name="expenseDate"
          id="expenseDate"
          onChange={onChange}
          value={form.expenseDate === null ? "" : form.expenseDate}
        />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default AddEditForm;
