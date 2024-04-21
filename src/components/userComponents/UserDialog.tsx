/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button, Dialog, Grid, TextField, Typography} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {useUserStore} from '../../stores/UserStore';

interface Inputs {
    name: string;
    email: string;
    password: string;
    age: number;
}

const UserDialog = () => {
    const {userOpened, handleCloseUser, selectedUser, addUser, editUser} =
        useUserStore();
    const {register, handleSubmit, reset} = useForm<Inputs>({});

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (selectedUser) {
            console.log('edit');
            console.log(selectedUser);
            const updatedUser = {
                id: selectedUser.id,
                name: data.name,
                email: data.email,
                password: data.password,
                age: data.age,
                expenses: selectedUser.expenses,
            };
            reset();
            handleCloseUser();
            editUser(updatedUser);
        } else {
            addUser({
                id: Math.floor(Math.random() * 1000),
                name: data.name,
                email: data.email,
                password: data.password,
                age: data.age,
                expenses: [],
            });
            reset();
            handleCloseUser();
        }
    };

    return (
        <Dialog
            open={userOpened}
            onClose={handleCloseUser}
            fullWidth
            maxWidth='sm'
            fullScreen={false}
        >
            <form style={{padding: 16}} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h5'>
                            {selectedUser
                                ? 'Edit Expense'
                                : 'Add a new expense'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Name'
                            fullWidth
                            {...register('name', {required: true})}
                            defaultValue={selectedUser?.name || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Email'
                            fullWidth
                            {...register('email', {required: true})}
                            defaultValue={selectedUser?.email || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Password'
                            type='password'
                            fullWidth
                            {...register('password', {required: true})}
                            defaultValue={selectedUser?.password || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label='Age'
                            type='number'
                            fullWidth
                            {...register('age', {required: true})}
                            defaultValue={selectedUser?.age || ''}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'flex-end'}
                    >
                        <Button variant='contained' type='submit' sx={{mr: 2}}>
                            {selectedUser ? 'Save' : 'Submit'}
                        </Button>
                        <Button variant='outlined' onClick={handleCloseUser}>
                            Close
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Dialog>
    );
};

export default UserDialog;
