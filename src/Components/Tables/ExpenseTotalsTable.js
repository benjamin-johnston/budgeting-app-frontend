import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Row, Col } from "reactstrap";
import MonthPicker from "../Dropdowns/MonthPicker";
import ModalForm from "../Modals/Modal";

function ExpenseTotalsTable(props) {
  const [expenseTotals, setExpenseTotals] = useState([]);

  const getExpenseTotals = (month, year) => {
    fetch("http://localhost:8080/budgetingapp/expenseCategory/totals", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        month: month,
        year: year,
      }),
    })
      .then((response) => response.json())
      .then((expenseTotals) => {
        setExpenseTotals(expenseTotals);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getExpenseTotals("01", "2023");
    console.log("useEffect");
  }, []);

  function getCategoryName(categoryId) {
    const category = props.expenseCategories[categoryId - 1];
    if (category === undefined) {
      return;
    }
    return category["name"];
  }

  const expenseTotalRows = expenseTotals?.map((category) => {
    return (
      <tr key={category.categoryId}>
        <td scope="row">{category.categoryId}</td>
        <td scope="row">{getCategoryName(category.categoryId)}</td>
        <td style={{ textAlign: "right" }}>
          {category.categorySum.toFixed(2)}
        </td>
        <td>
          <div style={{ width: "110px" }}></div>
        </td>
      </tr>
    );
  });

  const monthlyTotal = expenseTotals?.reduce(
    (total, category) => (total += category.categorySum),
    0
  );

  return (
    <React.Fragment>
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>Expense Totals By Category</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <MonthPicker getExpenseTotals={getExpenseTotals} />
        </Col>
        <Col>
          <ModalForm
            buttonLabel="Add Expense"
            addExpenseToState={props.addExpenseToState}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>Id</th>
                <th>Category</th>
                <th style={{ textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {expenseTotalRows}
              <tr>
                <td></td>
                <th scope="row">Total</th>
                <td style={{ textAlign: "right" }}>
                  {monthlyTotal.toFixed(2)}
                </td>
                <td>
                  <div style={{ width: "110px" }}></div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ExpenseTotalsTable;
