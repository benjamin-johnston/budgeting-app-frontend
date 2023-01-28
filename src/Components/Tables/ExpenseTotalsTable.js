import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Row, Col } from "reactstrap";
import MonthPicker from "../Dropdowns/MonthPicker";

function ExpenseTotalsTable(props) {
  const [expenseTotals, setExpenseTotals] = useState([]);

  const getExpenseTotals = (month, year) => {
    console.log(month);
    console.log(year);

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
        console.log(expenseTotals);
        setExpenseTotals(expenseTotals);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getExpenseTotals("2023", "01");
  }, []);

  const expenseTotalRows = expenseTotals.map((category) => {
    return (
      <tr key={category.categoryId}>
        <th scope="row">{category.categoryId}</th>
        <td>{category.categorySum}</td>
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
            <tbody>{expenseTotalRows}</tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ExpenseTotalsTable;
