/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Dialog,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Category, Expense } from '../model/Expenses';
import { useExpenseStore } from '../stores/ExpenseStores';
import ReactHookFormSelect from './ReactHookForm';

interface Inputs {
    category: string;
    amount: number;
    date: string;
    description: string;
    account: string;
    receiver: string;
}

const ExpenseDialog = () => {
    const {opened, handleClose, selectedExpenseId} = useExpenseStore();
    const {register, handleSubmit, control, reset} = useForm<Inputs>({});
    const [, setExpense] = useState<Expense>();
    const [, setExpenses] = useState<Expense[]>([]);
    const fetchExpenses = () => {
        axios
            .get('http://localhost:3001/api/expenses')
            .then((response) => {
                const expenses = response.data.map(
                    (expense: any) =>
                        new Expense(
                            expense.id,
                            expense.category,
                            expense.amount,
                            expense.date,
                            expense.description,
                            expense.account,
                            expense.receiver,
                        ),
                );
                setExpenses(expenses);
            })
            .catch((error) => {
                console.error('Error fetching expenses:', error);
            });
    };
    useEffect(() => {
        fetchExpenses();
    }, []);
    const fetchExpenseDetails = async () => {
        if (selectedExpenseId !== null) {
            try {
                const response = await axios.get(
                    'http://localhost:3001/api/expenses',
                );
                const expense = response.data;
                setExpense(expense);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        } else {
            reset();
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
    }, []);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (selectedExpenseId) {
            axios
                .put(
                    `http://localhost:3001/api/expenses/${selectedExpenseId}`,
                    data,
                )
                .then(() => {
                    fetchExpenseDetails();
                    handleClose();
                    fetchExpenses();
                })
                .catch((error) => {
                    console.error('Error updating expense:', error);
                });
        } else {
            axios
                .post('http://localhost:3001/api/expenses', data)
                .then(() => {
                    fetchExpenseDetails();
                    handleClose();
                    fetchExpenses();
                })
                .catch((error) => {
                    console.error('Error adding expense:', error);
                });
        }
        handleClose();
    };

    return (
        <Dialog
            open={opened}
            onClose={handleClose}
            fullWidth
            maxWidth='sm'
            fullScreen={false}
        >
            <form style={{padding: 16}} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h5'>Add a new expense</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ReactHookFormSelect
                            label='Category'
                            control={control}
                            defaultValue={''}
                            name={'category'}
                        >
                            {Object.keys(Category).map((category) => {
                                const value =
                                    Category[category as keyof typeof Category];
                                return (
                                    <MenuItem key={value} value={value}>
                                        {value}
                                    </MenuItem>
                                );
                            })}
                        </ReactHookFormSelect>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Ammount'
                            type='number'
                            fullWidth
                            {...register('amount', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Date'
                            fullWidth
                            {...register('date', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Description'
                            fullWidth
                            {...register('description', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Account'
                            fullWidth
                            {...register('account', {required: true})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Receiver'
                            fullWidth
                            {...register('receiver', {required: true})}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'flex-end'}
                    >
                        <Button variant='contained' type='submit' sx={{mr: 2}}>
                            Submit
                        </Button>
                        <Button variant='outlined' onClick={handleClose}>
                            Close
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    );
};

export default ExpenseDialog;
