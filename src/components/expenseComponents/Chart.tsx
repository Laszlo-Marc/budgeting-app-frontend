import {Box} from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import {Category} from '../../model/Expenses';
import {useExpenseStore} from '../../stores/ExpenseStores';

const BasicPie = () => {
    const {expenses} = useExpenseStore();

    function calculateTotal(category: Category) {
        const total = expenses.reduce((acc, curr) => {
            if (curr.category === category) {
                return acc + curr.amount;
            }
            return acc;
        }, 0);
        return total;
    }

    const data = [
        {id: 0, value: calculateTotal(Category.FOOD), label: 'FOOD'},
        {
            id: 1,
            value: calculateTotal(Category.TRANSPORTATION),
            label: 'TRANSPORTATION',
        },
        {
            id: 2,
            value: calculateTotal(Category.ENTERTAIMENT),
            label: 'ENTERTAINMENT',
        },
        {id: 3, value: calculateTotal(Category.SERVICES), label: 'SERVICES'},
        {id: 4, value: calculateTotal(Category.HEALTH), label: 'HEALTH'},
        {id: 5, value: calculateTotal(Category.OTHER), label: 'OTHER'},
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',

                height: '100vh',
            }}
        >
            <PieChart
                series={[
                    {
                        data,
                        highlightScope: {faded: 'global', highlighted: 'item'},
                        faded: {
                            innerRadius: 30,
                            additionalRadius: -30,
                            color: 'gray',
                        },
                    },
                ]}
                height={500}
            />
        </Box>
    );
};

export default BasicPie;
