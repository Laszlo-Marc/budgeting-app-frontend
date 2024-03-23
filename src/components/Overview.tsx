import AddIcon from '@mui/icons-material/Add';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import useExpenseStore from '../stores/ExpenseStores';
const Overview = () => {
    const navigate = useNavigate();
    const {expenses, deleteExpense, handleOpen} = useExpenseStore();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} display={'flex'}>
                <Grid item xs={10}>
                    <Typography variant='h4'>Dog Overview</Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton onClick={() => handleOpen()} aria-label='add'>
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
            {expenses.map((expense) => (
                <Grid key={expense.id} item xs={12} md={3}>
                    <Card sx={{maxWidth: 345}}>
                        <CardActionArea
                            onClick={() => navigate(`/dogs/${expense.id}`)}
                        >
                            <Typography
                                gutterBottom
                                variant='h5'
                                component='div'
                            >
                                {`${expense.category}`}
                            </Typography>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='h5'
                                    component='div'
                                >
                                    {`${expense.amount} - ${expense.date}`}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                >
                                    {expense.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button
                                size='small'
                                onClick={() => deleteExpense(expense.id)}
                            >
                                Delete
                            </Button>
                            <Button
                                size='small'
                                onClick={() => handleOpen(expense)}
                            >
                                Edit
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default Overview;
