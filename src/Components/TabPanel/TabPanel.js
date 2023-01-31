import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ExpenseTotalsTable from "../Tables/ExpenseTotalsTable";
import ExpenseTable from "../Tables/ExpenseTable";
import ExpenseCategoryTable from "../Tables/ExpenseCategoryTable";
import ExpenseImportTable from "../Tables/ExpenseImportTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ span: 4 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Expenses" {...a11yProps(0)} />
          <Tab label="Totals" {...a11yProps(1)} />
          <Tab label="Categories" {...a11yProps(2)} />
          <Tab label="Import Expenses" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ExpenseTable {...props} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ExpenseTotalsTable
          expenseCategories={props.expenseCategories}
          addExpenseToState={props.addExpenseToState}
          expenses={props.expenses}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ExpenseCategoryTable expenseCategories={props.expenseCategories} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ExpenseImportTable />
      </TabPanel>
    </Box>
  );
}
