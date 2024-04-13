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
import {useContext, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ExpenseContext} from '../contexts/Context';
import {Category} from '../model/Expenses';
import {useExpenseStore} from '../stores/ExpenseStores';
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
    const expenseContext = useContext(ExpenseContext);
    useEffect(() => {
        const fetchExpenseDetails = async () => {
            if (selectedExpenseId !== null) {
                try {
                    // Fetch the expense details based on selectedExpenseId
                    const expense =
                        expenseContext?.getExpenseById(selectedExpenseId);
                    if (expense) {
                        // Populate the form fields with fetched expense details
                        reset({
                            category: expense.getCategory(),
                            amount: expense.getAmount(),
                            date: expense.getDate(),
                            description: expense.getDescription(),
                            account: expense.getAccount(),
                            receiver: expense.getReceiver(),
                        });
                    }
                } catch (error) {
                    console.error('Error fetching expense details:', error);
                }
            } else {
                // Clear the form fields for adding a new expense
                reset();
            }
        };

        fetchExpenseDetails();
    }, [selectedExpenseId, reset, expenseContext]);

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (selectedExpenseId !== null) {
            try {
                axios
                    .put(
                        `http://localhost:3001/api/expenses/${selectedExpenseId}`,
                        data,
                    )
                    .then((response) => {
                        expenseContext?.deleteExpense(selectedExpenseId);
                        expenseContext?.addExpense(response.data as any);
                    });
            } catch (error) {
                console.error('Error editing expense:', error);
            }
        } else {
            axios
                .post('http://localhost:3001/api/expenses', data)
                .then((response) => {
                    expenseContext?.addExpense(response.data as any);
                })
                .catch((error) => {
                    console.error('Error adding expense:', error);
                });
        }
        reset();
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
