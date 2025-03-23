/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import {useEffect, useState} from 'react';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import {useNavigate} from 'react-router-dom';
import sigImg from '../../assets/images/signin.jpg';
import {useExpenseStore} from '../../stores/ExpenseStores';
import {useUserStore} from '../../stores/UserStore';
function Copyright(props: any) {
    return (
        <Typography
            variant='body2'
            color='text.secondary'
            align='center'
            {...props}
        >
            {'Copyright © '}
            <Link color='inherit' href='https://mui.com/'>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface IUserData {
    email: string;
    password: string;
}
export default function SignInSide() {
    const signIn = useSignIn<IUserData>();
    const navigate = useNavigate();
    const {handleExpenses, selectedUser} = useUserStore();
    const {clearExpenses} = useExpenseStore();
    const [errorMsg, setErrorMsg] = useState<string>('');
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response = await axios.put(
                'http://localhost:3001/api/login',
                {
                    email: data.get('email'),
                    password: data.get('password'),
                },
            );
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log(response.data.token.exp);
            if (
                signIn({
                    auth: {
                        token: token,
                        type: 'Bearer',
                    },
                    userState: {
                        email: response.data.email,
                        password: response.data.password,
                    },
                })
            ) {
                const user = {
                    uid: response.data.user.uid,
                    age: response.data.user.age,
                    name: response.data.user.name,
                    password: response.data.user.password,
                    email: response.data.user.email,
                };
                localStorage.setItem('selectedUser', JSON.stringify(user));
                console.log(user);
                handleExpenses(user);

                navigate('/expenses');
                console.log('Logged in');
                console.log(response.data);
                console.log(selectedUser);
            } else {
                console.log('Erorr');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error:', error.response?.data?.message);
                // Display error message to the user
                setErrorMsg(
                    error.response?.data?.message || 'An error occurred',
                );
            } else {
                console.error('Error:', error);
                setErrorMsg('An error occurred');
            }
        }
    };
    useEffect(() => {
        return () => {
            const targetPaths = ['/sign-in'];
            console.log('location:', location.pathname);
            if (
                targetPaths.includes(location.pathname) &&
                localStorage.getItem('token') == null
            ) {
                console.log('Clearing expenses');
                clearExpenses();
                localStorage.removeItem('selectedUser');
            } else {
                navigate('/expenses');
            }
        };
    }, []);
    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component='main' sx={{height: '100vh'}}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${sigImg})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light'
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Sign in
                        </Typography>
                        {errorMsg && (
                            <Typography variant='body2' color='error'>
                                {errorMsg}
                                <br />
                                <br />
                            </Typography>
                        )}
                        <Box
                            component='form'
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{mt: 1}}
                        >
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                name='email'
                                autoComplete='email'
                                autoFocus
                            />
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                autoComplete='current-password'
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value='remember'
                                        color='primary'
                                    />
                                }
                                label='Remember me'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href='#' variant='body2'>
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href='/register' variant='body2'>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
