/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Dialog,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Category} from '../../model/Expenses';
import {useExpenseStore} from '../../stores/ExpenseStores';
import {useUserStore} from '../../stores/UserStore';
import ReactHookFormSelect from '../ReactHookForm';

interface Inputs {
    category: string;
    amount: number;
    date: string;
    description: string;
    account: string;
    receiver: string;
}

const ExpenseDialog = () => {
    const {opened, handleClose, selectedExpense, addExpense, editExpense} =
        useExpenseStore();
    const {selectedUser} = useUserStore();
    const {register, handleSubmit, control, reset} = useForm<Inputs>({});

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (selectedExpense) {
            console.log('edit');
            console.log(selectedExpense);
            const updatedExpense = {
                eid: selectedExpense.eid,
                category: data.category as Category,
                amount: data.amount,
                date: data.date.split('T')[0],
                description: data.description,
                receiver: data.receiver,
                account: data.account,
                userid: selectedExpense.userid,
            };
            reset();
            handleClose();
            editExpense(updatedExpense);
        } else {
            addExpense({
                eid: Math.floor(Math.random() * 1000),
                category: data.category as Category,
                amount: data.amount,
                date: data.date.split('T')[0],
                description: data.description,
                account: data.account,
                receiver: data.receiver,
                userid: selectedUser.uid,
            });
            reset();
            handleClose();
        }
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
                        <Typography variant='h5'>
                            {selectedExpense
                                ? 'Edit Expense'
                                : 'Add a new expense'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ReactHookFormSelect
                            label='Category'
                            control={control}
                            defaultValue={selectedExpense?.category || ''}
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
                            label='Amount'
                            type='number'
                            fullWidth
                            {...register('amount', {required: true})}
                            defaultValue={selectedExpense?.amount || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Date'
                            type='date'
                            fullWidth
                            {...register('date', {required: true})}
                            defaultValue={selectedExpense?.date || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Description'
                            fullWidth
                            {...register('description', {required: true})}
                            defaultValue={selectedExpense?.description || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Account'
                            fullWidth
                            {...register('account', {required: true})}
                            defaultValue={selectedExpense?.account || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Receiver'
                            fullWidth
                            {...register('receiver', {required: true})}
                            defaultValue={selectedExpense?.receiver || ''}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'flex-end'}
                    >
                        <Button variant='contained' type='submit' sx={{mr: 2}}>
                            {selectedExpense ? 'Save' : 'Submit'}
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
