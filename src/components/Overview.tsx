import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import axios from 'axios';
import {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ExpenseContext} from '../contexts/Context';
import {useExpenseStore} from '../stores/ExpenseStores';

const Overview = () => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false); // State variable to control the visibility of the dialog
    const expenseContext = useContext(ExpenseContext);
    const {handleOpen} = useExpenseStore();

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog when the close button is clicked
    };
    const handleDelete = (expenseId: number) => {
        console.log('Deleting expense');
        axios.delete(`http://localhost:3001/api/expenses/${expenseId}`);
        expenseContext?.deleteExpense(expenseId);
        console.log('Expense deleted');
        console.log('Closing dialog');
        setOpenDialog(false);
    };
    const handleDeleteButtonClick = () => {
        console.log('Delete button clicked');
        setOpenDialog(true);
    };

    const rows = expenseContext?.expenses || [];

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
            renderCell: () => (
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => handleDeleteButtonClick()}
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
                    onClick={() => navigate(`/expenses/${params.row.getId()}`)}
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
                    <Button onClick={handleCloseDialog}>Disagree</Button>
                    <Button onClick={() => handleDelete(rows[0]?.getId())}>
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
