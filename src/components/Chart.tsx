import {Box} from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import {useContext} from 'react';
import {ExpenseContext} from '../contexts/Context';
import {Category} from '../model/Expenses';
function CalculateTotal(category: Category) {
    const expenseContext = useContext(ExpenseContext);
    const total = expenseContext?.expenses.reduce((acc, curr) => {
        if (curr.getCategory() === category) {
            return acc + curr.getAmount();
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
                                value: CalculateTotal(Category.FOOD) ?? 0,
                                label: 'FOOD',
                            },
                            {
                                id: 1,
                                value:
                                    CalculateTotal(Category.TRANSPORTATION) ??
                                    0,
                                label: 'TRANSPORTATION',
                            },
                            {
                                id: 2,
                                value:
                                    CalculateTotal(Category.ENTERTAIMENT) ?? 0,
                                label: 'ENTERTAINMENT',
                            },
                            {
                                id: 3,
                                value: CalculateTotal(Category.SERVICES) ?? 0,
                                label: 'SERVICES',
                            },
                            {
                                id: 4,
                                value: CalculateTotal(Category.HEALTH) ?? 0,
                                label: 'HEALTH',
                            },
                            {
                                id: 5,
                                value: CalculateTotal(Category.OTHER) ?? 0,
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
