import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import TabPanel from "./Components/TabPanel/TabPanel";

import "bootstrap/dist/css/bootstrap.min.css";

function App(props) {
  const [expenses, setExpenses] = useState([]);
  const [expenseCategories, setexpenseCategories] = useState([]);

  const getExpenses = () => {
    fetch("http://localhost:8080/budgetingapp/expenses/all")
      .then((response) => response.json())
      .then((expenses) => setExpenses(expenses))
      .catch((err) => console.log(err));
  };

  const getExpenseCategories = () => {
    fetch("http://localhost:8080/budgetingapp/expenseCategory/all")
      .then((response) => response.json())
      .then((expenseCategories) => setexpenseCategories(expenseCategories))
      .catch((err) => console.log(err));
  };

  const addExpenseToState = (expense) => {
    console.log(expense);
    var expenseIndex = 0;
    //Find the correct insertion point
    //Data is sorted by expenseDate descending
    while (expenses[expenseIndex].expenseDate > expense.expenseDate) {
      expenseIndex++;
    }
    const newArray = [...expenses];
    newArray.splice(expenseIndex, 0, expense);

    setExpenses(newArray);
  };

  const updateState = (expense) => {
    const expenseIndex = expenses.findIndex((data) => data.id === expense.id);
    const newArray = [
      ...expenses.slice(0, expenseIndex),
      expense,
      ...expenses.slice(expenseIndex + 1),
    ];
    setExpenses(newArray);
  };

  const deleteExpenseFromState = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  useEffect(() => {
    getExpenseCategories();
    getExpenses();
  }, []);

  return (
    <Container className="App">
      <TabPanel
        expenses={expenses}
        updateState={updateState}
        deleteExpenseFromState={deleteExpenseFromState}
        expenseCategories={expenseCategories}
        addExpenseToState={addExpenseToState}
      />
    </Container>
  );
}

export default App;
