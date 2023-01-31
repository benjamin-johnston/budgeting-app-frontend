import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Label,
  Input,
  FormText,
  Form,
  FormGroup,
} from "reactstrap";
import ModalForm from "../Modals/Modal";
import { CSVLink } from "react-csv";

function ExpenseTable(props) {
  const [importedExpenses, setImportedExpenses] = useState([]);
  const [file, setFile] = useState();

  const deleteExpenseFromState = (id) => {
    const updatedExpenses = importedExpenses.filter(
      (expense) => expense.id !== id
    );
    setImportedExpenses(updatedExpenses);
  };

  const sortExpenses = () => {
    console.log("To do: implement sort expenses");
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();

    var fileReader = new FileReader();

    if (file) {
      fileReader.onload = function (event) {
        const fileText = event.target.result;
        csvFileToArray(fileText);
      };

      fileReader.readAsText(file);
    }
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    //console.log(csvRows);

    //logic for chase expenses
    var index = 1;
    const expenseArray = csvRows.map((i) => {
      const values = i.split(",");
      const expense = {
        id: index,
        description: values[2],
        amount: values[5].replace("-", ""),
        categoryId: 1,
        expenseDate:
          values[1].substring(6, 10) +
          "-" +
          values[1].substring(0, 2) +
          "-" +
          values[1].substring(3, 5),
      };
      index++;
      return expense;
    });

    setImportedExpenses(expenseArray);
  };

  const expenses = importedExpenses.map((expense) => {
    return (
      <tr key={expense.id}>
        <th scope="row">{expense.id}</th>
        <td>{expense.description}</td>
        <td>{expense.amount}</td>
        <td>{expense.categoryId}</td>
        <td>{expense.expenseDate}</td>
        <td>
          <div style={{ width: "110px" }}>
            <Button
              color="danger"
              onClick={() => deleteExpenseFromState(expense.id)}
            >
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
          <h1 style={{ margin: "20px 0" }}>Import Expenses</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <FormGroup row>
              {/*<Label for="importFile" sm={2}>
                Import File
  </Label>*/}
              <Col sm={8}>
                <Input
                  id="importFile"
                  name="file"
                  type="file"
                  accept=".csv"
                  onChange={handleOnChange}
                />
                <FormText>
                  This is some placeholder block-level help text for the above
                  input. It‘s a bit lighter and easily wraps to a new line.
                </FormText>
              </Col>
              <Col>
                <Button color="success" onClick={(e) => handleUpload(e)}>
                  Upload
                </Button>
              </Col>
            </FormGroup>
          </Form>
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
