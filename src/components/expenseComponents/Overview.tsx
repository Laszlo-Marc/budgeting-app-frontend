/* eslint-disable @typescript-eslint/no-explicit-any */
import {Box, Button, Grid} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Expense} from '../../model/Expenses';
import {useExpenseStore} from '../../stores/ExpenseStores';
import {useUserStore} from '../../stores/UserStore';

const Overview = () => {
    const navigate = useNavigate();
    const {handleOpen, expenses, deleteExpense, fetchMoreExpenses} =
        useExpenseStore();
    const {selectedUser} = useUserStore();
    const [, setIsOnline] = useState<boolean>(true);
    const [page, setPage] = useState(0);
    //const [isLeaving, setIsLeaving] = useState(false);
    const checkInternetStatus = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3001/api/check-internet',
            );
            setIsOnline(response.data.isOnline);
            if (!response.data.isOnline) {
                // Alert the user that the internet connection is down
                alert('Internet connection is down!');
            }
        } catch (error) {
            setIsOnline(false); // If there's an error, assume offline
            alert('Internet connection is down!');
        }
    };
    useEffect(() => {
        checkInternetStatus();
        const interval = setInterval(checkInternetStatus, 5000); // Check every 5 seconds
        return () => clearInterval(interval);
    });

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
    // useEffect(() => {
    //     function handleBeforeUnload(event: BeforeUnloadEvent) {
    //         event.preventDefault();
    //         clearExpenses();
    //     }
    //     window.addEventListener('beforeunload', handleBeforeUnload, {
    //         capture: true,
    //     });
    //     return () =>
    //         window.removeEventListener('beforeunload', handleBeforeUnload, {
    //             capture: true,
    //         });
    // }, [clearExpenses]);

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
            display: 'flex',
            align: 'right',
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
            display: 'flex',
            align: 'right',
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
            display: 'flex',
            align: 'right',
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
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={() => handleOpen()}
                    >
                        Add Expense
                    </Button>
                    <br />
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={() => navigate('/chart')}
                    >
                        View Chart
                    </Button>
                    <br />
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={() => handleLoadMoreExpenses()}
                    >
                        See More
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
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
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Overview;
