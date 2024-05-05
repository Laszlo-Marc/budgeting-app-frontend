/* eslint-disable @typescript-eslint/no-explicit-any */
import {Box, Button, Grid} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {User} from '../../model/User';
import {useUserStore} from '../../stores/UserStore';

const UserOverview = () => {
    const navigate = useNavigate();
    const {handleOpenUser, users, deleteUser, handleExpenses, fetchMoreUsers} =
        useUserStore();
    const [, setIsOnline] = useState<boolean>(true);
    const [page, setPage] = useState(1);

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

    const handleSeeExpenses = (user: User) => {
        handleExpenses(user);
        navigate(`/expenses`);
    };

    const columns: GridColDef<(typeof users)[number]>[] = [
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
                    onClick={() => deleteUser(params.row.uid)}
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
                    onClick={() => navigate(`/users/${params.row.uid}`)}
                >
                    Details
                </Button>
            ),
        },
    ];

    const handleLoadUsers = async () => {
        try {
            await fetchMoreUsers(page);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Error fetching more data:', error);
        }
    };

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
                        onClick={() => navigate('/users/chart')}
                    >
                        View Chart
                    </Button>
                    <br />
                    <Button
                        variant='contained'
                        color='primary'
                        size='large'
                        onClick={() => handleLoadUsers()}
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
                        rows={users}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10,
                                },
                            },
                        }}
                        pageSizeOptions={[10, 25, 50]}
                        disableRowSelectionOnClick
                        getRowId={(row) => row.uid}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default UserOverview;
