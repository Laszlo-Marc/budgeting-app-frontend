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
    const {handleOpen, deleteExpense} = useExpenseStore();
    const [, setIsOnline] = useState<boolean>(true);
    const {selectedUser} = useUserStore();
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

    // const socket = new WebSocket('ws://localhost:3000');

    // // Connection opened
    // socket.addEventListener('open', () => {
    //     socket.send('Connection established');
    // });

    // // Listen for messages
    // socket.addEventListener('message', (event) => {
    //     console.log('Message from server ', event.data);
    //     if (event.data === 'refresh') {
    //         fetchDataAndUpdateRows();
    //     }
    // });
    // const sendMessage = () => {
    //     socket.send('hello from frontend');
    // };
    // const fetchDataAndUpdateRows = async () => {
    //     try {
    //         const response = await axios.get(
    //             'http://localhost:5050/api/foods/',
    //         );
    //         setRows(response.data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    const handleDelete = (expense: Expense) => {
        deleteExpense(expense);
    };
    const handleDetails = (expense: Expense) => {
        navigate(`/expenses/${expense.id}`);
    };
    const rows = selectedUser.expenses || [];

    const columns: GridColDef<(typeof rows)[number]>[] = [
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
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 100,
                                },
                            },
                        }}
                        pageSizeOptions={[100]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default Overview;
