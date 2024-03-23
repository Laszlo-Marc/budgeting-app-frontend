import { Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Expense from "../model/Expenses";
import useExpenseStore from "../stores/ExpenseStores";

const Detail = () => {
    const params = useParams();
    const [expense, setExpense] = useState<Expense | undefined>(undefined);
    const { expenses } = useExpenseStore();
    React.useEffect(() => {
      if (params.id) setExpense(expenses.find((dog) => dog.id === parseInt(params.id!)));
    }, []);
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography variant="body1">
                  <b>Account:</b>
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField disabled={true} value={expense?.account || ""} />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">
                  <b>Receiver:</b>
                </Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField disabled={true} value={expense?.receiver || ""}></TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
  
  export default Detail;
