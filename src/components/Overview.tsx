/* eslint-disable @typescript-eslint/no-explicit-any */
import {Box, Button} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Expense} from '../model/Expenses';
import {useExpenseStore} from '../stores/ExpenseStores';

const Overview = () => {
    const navigate = useNavigate();
    const {handleOpen, deleteExpense, expenses} = useExpenseStore();
    const [isOnline, setIsOnline] = useState<boolean>(true);

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
    console.log(isOnline);

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
    const rows = expenses;
    console.log(rows);
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
        <Box
            sx={{
                height: '100',
                width: '100%',
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
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
            />
            <br></br>
            <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={() => handleOpen()}
            >
                Add Expense
            </Button>
            {/* <Button
                variant='outlined'
                sx={{
                    color: 'green',
                    borderColor: 'green',
                    '&:hover': {
                        backgroundColor: 'green',
                        color: 'white',
                    },
                }}
                onClick={() => {
                    sendMessage();
                }}
            >
                Send message w web sockets
            </Button> */}
            {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
              
                <DialogTitle>{'Delete expense?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                        Are you sure you want to delete this expense?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button>Disagree</Button>
                    <Button
                        onClick={() =>
                            expenseToDelete && handleDelete(expenseToDelete)
                        }
                    >
                        Agree
                    </Button>{' '}
                   
                </DialogActions>
            </Dialog>  */}
            <br></br>
            <Button
                variant='contained'
                color='primary'
                size='large'
                onClick={() => navigate('/chart')}
            >
                View Chart
            </Button>
        </Box>
    );
};

export default Overview;
