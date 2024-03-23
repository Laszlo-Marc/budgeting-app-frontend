import {Box, Button, ButtonGroup} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';

import useExpenseStore from '../stores/ExpenseStores';

const Overview = () => {
    const navigate = useNavigate();
    const {deleteExpense, expenses, handleOpen} = useExpenseStore();
    const rows = expenses;
    const columns: GridColDef<(typeof rows)[number]>[] = [
        {
            field: 'category',
            headerName: 'Category',
            width: 200,
            editable: true,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            width: 100,
            editable: true,
        },
        {
            field: 'date',
            headerName: 'Date',
            type: 'date',
            width: 100,
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            sortable: false,
            width: 300,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            display: 'flex',
            align: 'right',
            renderCell: (params) => (
                <ButtonGroup>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => handleOpen(params.row)}
                    >
                        Edit
                    </Button>

                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => deleteExpense(params.row.id)}
                    >
                        Delete
                    </Button>

                    <Button
                        variant='contained'
                        color='secondary'
                        onClick={() => navigate(`/expenses/${params.row.id}`)}
                    >
                        Details
                    </Button>
                </ButtonGroup>
            ),
        },
    ];

    return (
        <Box sx={{height: '100', width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 12,
                        },
                    },
                }}
                pageSizeOptions={[12]}
                disableRowSelectionOnClick
            />
        </Box>
    );
};

export default Overview;
