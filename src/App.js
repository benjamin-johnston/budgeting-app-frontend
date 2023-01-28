import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import ModalForm from "./Components/Modals/Modal";
import DataTable from "./Components/Tables/DataTable";
import ExpenseTotalsTable from "./Components/Tables/ExpenseTotalsTable";
import ExpenseCategoryTable from "./Components/Tables/ExpenseCategoryTable";

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
      {/*<DataTable
        addExpenseToState={addExpenseToState}
        expenses={expenses}
        updateState={updateState}
        deleteExpenseFromState={deleteExpenseFromState}
        expenseCategories={expenseCategories}
  /> */}
      <ExpenseTotalsTable />
      {/*ExpenseCategoryTable expenseCategories={expenseCategories} */}
    </Container>
  );
}

export default App;
