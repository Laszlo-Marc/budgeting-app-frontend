/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Expense } from '../model/Expenses';
import { useExpenseStore } from '../stores/ExpenseStores';

const Overview = () => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const {setSelctedExpenseId, handleOpen} = useExpenseStore();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expenseToDelete, setExpenseToDelete] = useState<Expense>();
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
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleDelete = async (expense: Expense) => {
        try {
            await axios.delete(
                `http://localhost:3001/api/expenses/${expense.getId()}`,
            );
            fetchExpenses();
            setOpenDialog(false);
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };
    const handleDeleteButtonClick = (expenseId: number | undefined) => {
        setExpenseToDelete(
            expenses.find((expense) => expense.getId() === expenseId),
        );
        setOpenDialog(true);
    };
    const handleDetail = (expenseId: number | undefined) => {
        setSelctedExpenseId(expenseId);
        navigate(`/expenses/${expenseId}`);
    };
    const rows = expenses || [];

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
                    onClick={() => handleOpen(params.row.getId())}
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
                    onClick={() => handleDeleteButtonClick(params.row.getId())}
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
                    onClick={() => handleDetail(params.row.getId())}
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
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                {' '}
                {/* Dialog component for confirmation */}
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
                    {/* Pass the expense id to handleDelete */}
                </DialogActions>
            </Dialog>
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
