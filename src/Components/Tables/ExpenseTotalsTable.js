import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Row, Col } from "reactstrap";
import MonthPicker from "../Dropdowns/MonthPicker";
import ModalForm from "../Modals/Modal";

function ExpenseTotalsTable(props) {
  const [expenseTotals, setExpenseTotals] = useState([]);
  const [payCheckAmount, setPayCheckAmount] = useState("");
  const [month, setMonth] = useState(() => {
    var today = new Date();
    var mm = today.getMonth() + 1;

    if (mm < 10) {
      mm = "0" + mm;
    }
    var initialYearMonth = today.getFullYear() + "-" + mm;

    return initialYearMonth;
  });

  const getExpenseTotals = (yearMonth) => {
    var year = yearMonth.substring(0, 4);
    var month = yearMonth.substring(5, 7);

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

  const getPayCheckAmount = (frequency) => {
    fetch("http://localhost:8080/budgetingapp/pay/getByFrequency", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        frequency: frequency,
      }),
    })
      .then((response) => response.json())
      .then((payCheckAmount) => {
        console.log(payCheckAmount);
        setPayCheckAmount(payCheckAmount[0].payAmount);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPayCheckAmount(12);
  }, []);

  useEffect(() => {
    getExpenseTotals(month);
  }, [props.expenses, month]);

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
        <td>{category.categoryId}</td>
        <td>{getCategoryName(category.categoryId)}</td>
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
          <MonthPicker month={month} setMonth={setMonth} />
        </Col>
        <Col>
          <ModalForm
            buttonLabel="Add Expense"
            addExpenseToState={props.addExpenseToState}
            expenseCategories={props.expenseCategories}
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
              <tr>
                <td></td>
                <th scope="row">Paycheck Amount</th>
                <td style={{ textAlign: "right" }}>
                  {payCheckAmount.toFixed(2)}
                </td>
                <td>
                  <div style={{ width: "110px" }}></div>
                </td>
              </tr>
              <tr>
                <td></td>
                <th scope="row">Balance</th>
                <td style={{ textAlign: "right" }}>
                  {payCheckAmount.toFixed(2) - monthlyTotal.toFixed(2)}
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
