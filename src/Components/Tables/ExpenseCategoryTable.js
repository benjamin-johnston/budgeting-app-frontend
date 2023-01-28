import { Table } from "reactstrap";
import { Row, Col } from "reactstrap";
import React from "react";

function ExpenseCategoryTable(props) {
  const resolveFixedAmountInd = (ind) => {
    if ((ind = "N")) {
      return "No";
    }
    return "Yes";
  };

  const expenses = props.expenseCategories.map((category) => {
    return (
      <tr key={category.id}>
        <th scope="row">{category.id}</th>
        <td>{category.name}</td>
        <td>{resolveFixedAmountInd(category.fixedAmountInd)}</td>
        <td>{category.billFrequency}</td>
        <td>{category.billAmount}</td>
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
          <h1 style={{ margin: "20px 0" }}>Category Maintenance</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive hover striped>
            <thead>
              <tr>
                <th>Category Id</th>
                <th>Name</th>
                <th>Fixed Amount ( Y / N)</th>
                <th>Bill Frequency</th>
                <th>Bill Amount</th>
              </tr>
            </thead>
            <tbody>{expenses}</tbody>
          </Table>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default ExpenseCategoryTable;
