import {PieChart, pieArcLabelClasses} from '@mui/x-charts/PieChart';
import {Category} from '../../model/Expenses';
import {useExpenseStore} from '../../stores/ExpenseStores';

const BasicPie = () => {
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
    const data = [
        {
            id: 0,
            value: CalculateTotal(Category.FOOD) ?? 0,
            label: 'FOOD',
        },
        {
            id: 1,
            value: CalculateTotal(Category.TRANSPORTATION) ?? 0,
            label: 'TRANSPORTATION',
        },
        {
            id: 2,
            value: CalculateTotal(Category.ENTERTAIMENT) ?? 0,
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
    ];
    const size = {
        width: 400,
        height: 400,
    };

    return (
        <PieChart
            series={[
                {
                    arcLabel: (item) => `${item.label} (${item.value})`,
                    arcLabelMinAngle: 45,
                    data,
                },
            ]}
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fill: 'white',
                    fontWeight: 'bold',
                },
            }}
            {...size}
        />
    );
};

export default BasicPie;
