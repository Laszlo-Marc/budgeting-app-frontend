import {PieChart, pieArcLabelClasses} from '@mui/x-charts/PieChart';
import {useUserStore} from '../../stores/UserStore';

const UserChart = () => {
    interface AgeRange {
        min: number;
        max: number;
    }

    function CalculateTotalUsersInAgeRange(ageRange: AgeRange) {
        const {users} = useUserStore(); // Assuming useUserStore returns the list of users

        const totalUsers = users.reduce((total, user) => {
            if (user.age >= ageRange.min && user.age <= ageRange.max) {
                return total + 1;
            }
            return total;
        }, 0);

        return totalUsers;
    }

    const ageRanges = [
        {min: 18, max: 30},
        {min: 30, max: 60},
        {min: 60, max: 90},
    ];

    const data = [
        {
            id: 0,
            value: CalculateTotalUsersInAgeRange(ageRanges[0]) ?? 0,
            label: '18-30',
        },
        {
            id: 1,
            value: CalculateTotalUsersInAgeRange(ageRanges[1]) ?? 0,
            label: '30-60',
        },
        {
            id: 2,
            value: CalculateTotalUsersInAgeRange(ageRanges[2]) ?? 0,
            label: '60-90',
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

export default UserChart;
