/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import MenuIcon from '@mui/icons-material/Menu';
import {Box, Button, Drawer, Grid, IconButton} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useEffect, useState} from 'react';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import {useNavigate} from 'react-router-dom';
import {Expense} from '../../model/Expenses';
import {useExpenseStore} from '../../stores/ExpenseStores';

const Overview = () => {
    const navigate = useNavigate();
    const {
        handleOpen,
        expenses,
        deleteExpense,
        fetchMoreExpenses,
        fetchExpenses,
    } = useExpenseStore();
    const [page, setPage] = useState(0);
    const storedUser = localStorage.getItem('selectedUser');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const selectedUser = storedUser ? JSON.parse(storedUser) : null;
    const [loggedInTime] = useState(Date.now()); // Capture login time

    const tokenLifetime = 60 * 60 * 1000; // Example token lifetime in milliseconds (1 hour)
    const bufferTime = 60 * 5000; // Buffer time before token expiration (5 minutes)
    const logoutThreshold = tokenLifetime - bufferTime; // Time after which to trigger logout

    useEffect(() => {
        const intervalId = setInterval(() => {
            const elapsedTime = Date.now() - loggedInTime;
            if (elapsedTime >= logoutThreshold) {
                signOut(); // Trigger logout
                localStorage.removeItem('token');
                localStorage.removeItem('selectedUser');
                navigate('/sign-in');
            }
        }, 5000); // Check every 5 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);
    const handleDelete = (expense: Expense) => {
        deleteExpense(expense);
    };

    const handleDetails = (expense: Expense) => {
        navigate(`/expenses/${expense.eid}`);
    };

    const handleLoadMoreExpenses = async () => {
        try {
            console.log('page:', page);
            await fetchMoreExpenses(page, selectedUser.uid);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Error fetching more data:', error);
        }
    };

    useEffect(() => {
        fetchExpenses(selectedUser.uid);
    }, []);

    const signOut = useSignOut();
    const handleLogout = () => {
        signOut();
        localStorage.removeItem('token');
        localStorage.removeItem('selectedUser');
        navigate('/sign-in');
    };

    const columns: GridColDef<(typeof expenses)[number]>[] = [
        {
            field: 'category',
            headerName: 'Category',
            width: 200,
            editable: false,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            width: 100,
            editable: false,
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            editable: false,
        },
        {
            field: 'description',
            headerName: 'Description',
            sortable: false,
            width: 200,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleOpen(params.row)}
                >
                    Edit
                </Button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => handleDelete(params.row)}
                >
                    Delete
                </Button>
            ),
        },
        {
            field: 'details',
            headerName: 'Details',
            width: 100,
            renderCell: (params) => (
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => handleDetails(params.row)}
                >
                    Details
                </Button>
            ),
        },
    ];

    return (
        <Box sx={{display: 'flex', height: '100vh'}}>
            <Box sx={{flexGrow: 1, padding: 2}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <DataGrid
                                rows={expenses}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 25,
                                        },
                                    },
                                }}
                                pageSizeOptions={[25, 50, 100]}
                                disableRowSelectionOnClick
                                getRowId={(rows) => rows.eid}
                            ></DataGrid>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Drawer
                anchor='right'
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box
                    sx={{
                        width: 250,
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={() => handleOpen()}
                        sx={{marginBottom: 2}}
                    >
                        Add Expense
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={() => navigate('/chart')}
                        sx={{marginBottom: 2}}
                    >
                        View Chart
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={() => handleLoadMoreExpenses()}
                        sx={{marginBottom: 2}}
                    >
                        See More
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='large'
                        onClick={handleLogout}
                        sx={{marginTop: 'auto'}}
                    >
                        Logout
                    </Button>
                </Box>
            </Drawer>
            <IconButton
                sx={{position: 'fixed', right: 16, top: 16}}
                onClick={() => setDrawerOpen(true)}
            >
                <MenuIcon />
            </IconButton>
        </Box>
    );
};

export default Overview;
