/* eslint-disable @typescript-eslint/no-explicit-any */
import {Box} from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Category, Expense} from '../model/Expenses';
function CalculateTotal(category: Category) {
    const [expenses, setExpenses] = useState<Expense[]>([]);
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
    const total = expenses.reduce((acc, curr) => {
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
