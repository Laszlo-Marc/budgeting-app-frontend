/* eslint-disable @typescript-eslint/no-explicit-any */
import {Box, Button, Grid} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useNavigate} from 'react-router-dom';
import {User} from '../../model/User';
import {useUserStore} from '../../stores/UserStore';

const UserOverview = () => {
    const navigate = useNavigate();
    const {handleOpenUser, users, deleteUser, handleExpenses} = useUserStore();

    const rows = users;
    const handleSeeExpenses = (user: User) => {
        handleExpenses(user);
        navigate(`/expenses`);
    };
    const columns: GridColDef<(typeof rows)[number]>[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 200,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300,
            editable: false,
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
                    onClick={() => handleOpenUser(params.row)}
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
                    onClick={() => deleteUser(params.row)}
                >
                    Delete
                </Button>
            ),
        },
        {
            field: 'seeExpenses',
            headerName: 'Expenses',
            width: 150,
            display: 'flex',
            align: 'right',
            renderCell: (params) => (
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => handleSeeExpenses(params.row)}
                >
                    See Expenses
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
                    onClick={() => navigate(`/users/${params.row.id}`)}
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
                        onClick={() => handleOpenUser()}
                    >
                        Add User
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
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default UserOverview;
