import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Row, Col } from "reactstrap";
import MonthPicker from "../Dropdowns/MonthPicker";

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
  }, []);

  function getCategoryName(categoryId) {
    const category = props.expenseCategories[categoryId - 1];
    return category["name"];
  }

  const expenseTotalRows = expenseTotals?.map((category) => {
    return (
      <tr key={category.categoryId}>
        <th scope="row">{getCategoryName(category.categoryId)}</th>
        <td>{category.categorySum}</td>
        <td>
          <div style={{ width: "110px" }}></div>
        </td>
      </tr>
    );
  });

  const fixedExpenseRows = props.expenseCategories
    ?.filter((category) => category.billAmount > 0)
    .map((category) => {
      return (
        <tr key={category.id}>
          <th scope="row">{category.name}</th>
          <td>
            {((category.billAmount * category.billFrequency) / 12).toFixed(2)}
          </td>
          <td>
            <div style={{ width: "110px" }}></div>
          </td>
        </tr>
      );
    });

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
      </Row>
      <Row>
        <Col>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>Category</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {expenseTotalRows}
              {fixedExpenseRows}
            </tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ExpenseTotalsTable;
