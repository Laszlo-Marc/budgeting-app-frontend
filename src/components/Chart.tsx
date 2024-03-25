import {Box} from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import {Category} from '../model/Expenses';
import useExpenseStore from '../stores/ExpenseStores';
function CalculateTotal(category: Category) {
    const {expenses} = useExpenseStore();
    const total = expenses.reduce((acc, curr) => {
        if (curr.category === category) {
            return acc + curr.amount;
        }
        return acc;
    }, 0);
    return total;
}

const BasicPie = () => {
    return (
        // <Box
        //     sx={{
        //         height: '100',
        //         width: '100%',
        //         display: 'flex',
        //         flexDirection: 'column',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //     }}
        // >

        <Box flexGrow={1}>
            <PieChart
                colors={['red', 'blue', 'green', 'yellow', 'purple', 'orange']}
                series={[
                    {
                        data: [
                            {
                                id: 0,
                                value: CalculateTotal(Category.FOOD),
                                label: 'FOOD',
                            },
                            {
                                id: 1,
                                value: CalculateTotal(Category.TRANSPORTATION),
                                label: 'TRANSPORTATION',
                            },
                            {
                                id: 2,
                                value: CalculateTotal(Category.ENTERTAIMENT),
                                label: 'ENTERTAINMENT',
                            },
                            {
                                id: 3,
                                value: CalculateTotal(Category.SERVICES),
                                label: 'SERVICES',
                            },
                            {
                                id: 4,
                                value: CalculateTotal(Category.HEALTH),
                                label: 'HEALTH',
                            },
                            {
                                id: 5,
                                value: CalculateTotal(Category.OTHER),
                                label: 'OTHER',
                            },
                        ],
                    },
                ]}
                width={400}
                height={400}
            />
        </Box>
    );
};

export default BasicPie;
