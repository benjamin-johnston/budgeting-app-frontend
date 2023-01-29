import React from "react";
import { Table, Button, Row, Col } from "reactstrap";
import ModalForm from "../Modals/Modal";
import { CSVLink } from "react-csv";

function ExpenseTable(props) {
  const deleteExpense = (id) => {
    let confirmDelete = window.confirm("Delete expense forever?");
    if (confirmDelete) {
      fetch("http://localhost:8080/budgetingapp/expenses/delete", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      })
        .then((response) => {
          props.deleteExpenseFromState(id);
        })
        .catch((err) => console.log(err));
    }
  };

  function getCategoryName(categoryId) {
    const category = props.expenseCategories[categoryId - 1];
    return category["name"];
  }

  function sortExpenses(sortField) {
    //console.log(sortField);
  }

  const expenses = props.expenses.map((expense) => {
    return (
      <tr key={expense.id}>
        <th scope="row">{expense.id}</th>
        <td>{expense.description}</td>
        <td>{expense.amount}</td>
        <td>{getCategoryName(expense.categoryId)}</td>
        <td>{expense.expenseDate}</td>
        <td>
          <div style={{ width: "110px" }}>
            <ModalForm
              buttonLabel="Edit"
              expense={expense}
              updateState={props.updateState}
              expenseCategories={props.expenseCategories}
            />{" "}
            <Button color="danger" onClick={() => deleteExpense(expense.id)}>
              Del
            </Button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <React.Fragment>
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>Expenses</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <CSVLink
            filename={"db.csv"}
            color="primary"
            style={{ float: "left", marginRight: "10px" }}
            className="btn btn-primary"
            data={props.expenses}
          >
            Download CSV
          </CSVLink>
          <ModalForm buttonLabel="Add Expense" {...props} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>
                  <Button color="light" onClick={() => sortExpenses("id")}>
                    ID
                  </Button>
                </th>
                <th>
                  <Button
                    color="light"
                    onClick={() => sortExpenses("description")}
                  >
                    Expense
                  </Button>
                </th>
                <th>
                  <Button color="light" onClick={() => sortExpenses("amount")}>
                    Amount
                  </Button>
                </th>
                <th>
                  <Button
                    color="light"
                    onClick={() => sortExpenses("category")}
                  >
                    Category
                  </Button>
                </th>
                <th>
                  <Button
                    color="light"
                    onClick={() => sortExpenses("expenseDate")}
                  >
                    Expense Date
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>{expenses}</tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ExpenseTable;
