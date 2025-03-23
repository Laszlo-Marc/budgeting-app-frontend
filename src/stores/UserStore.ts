import axios from 'axios';
import {create} from 'zustand';
import {User} from '../model/User';

interface useUserStoreProps {
    userOpened: boolean;
    handleOpenUser: (user?: User) => void;
    handleCloseUser: () => void;
    selectedUser: User;
    token: string;
    setToken: (token: string) => void;

    handleExpenses: (user?: User) => void;
    addUser: (user: unknown) => void;
    deleteUser: (uid: number) => void;
    editUser: (user: User) => void;
    fetchMoreUsers: (page: number) => void;
    users: User[];
}

const fetchUsers = async () => {
    try {
        const response = await axios.get<User[]>(
            'http://localhost:3001/api/users',
        );
        console.log(response.data);
        useUserStore.setState({users: response.data});
        localStorage.setItem('users', JSON.stringify(response.data));
    } catch (error) {
        console.error('Error fetching users', error);
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        useUserStore.setState({users: storedUsers});
    }
};

export const useUserStore = create<useUserStoreProps>((set) => ({
    userOpened: false,
    users: [],
    token: '',
    setToken: (token: string) => set({token}),
    selectedUser: JSON.parse(localStorage.getItem('selectedUser') || '{}'),
    fetchMoreUsers: async (page: number) => {
        try {
            const response = await axios.get<User[]>(
                'http://localhost:3001/api/users',
                {params: {page}},
            );
            console.log(response.data);
            set((state) => ({users: [...state.users, ...response.data]}));
        } catch (error) {
            console.error('Error fetching more users', error);
        }
    },
    handleOpenUser: (user?: User) =>
        set({userOpened: true, selectedUser: user}),
    handleExpenses: (user?: User) => {
        set({selectedUser: user});
        localStorage.setItem('selectedUser', JSON.stringify(user));
    },
    handleCloseUser: () => set({userOpened: false, selectedUser: {} as User}),
    editUser: async (user: User) => {
        try {
            await axios.put(
                `https://budgeting-app-backend-bmfh.onrender.com/api/users/${user.uid}`,
                user,
            );
            fetchUsers();
        } catch (error) {
            console.error('Error editing user', error);
            const pendingApiCalls = JSON.parse(
                localStorage.getItem('pendingApiCalls') || '[]',
            );
            pendingApiCalls.push({
                method: 'PUT',
                url: 'https://budgeting-app-backend-bmfh.onrender.com/api/users/:id',
                data: user,
            });
            localStorage.setItem(
                'pendingApiCalls',
                JSON.stringify(pendingApiCalls),
            );
        }
        set((state) => ({
            users: state.users.map((u) => (u.uid === user.uid ? user : u)),
        }));
        //fetchUsers();
    },
    addUser: async (user: unknown) => {
        try {
            await axios.post('http://localhost:3001/api/users', user);
            fetchUsers();
        } catch (error) {
            console.error('Error adding user', error);
            const pendingApiCalls = JSON.parse(
                localStorage.getItem('pendingApiCalls') || '[]',
            );
            pendingApiCalls.push({
                method: 'POST',
                url: 'http://localhost:3001/api/users',
                data: user,
            });
            localStorage.setItem(
                'pendingApiCalls',
                JSON.stringify(pendingApiCalls),
            );
        }
    },
    deleteUser: async (uid: number) => {
        try {
            await axios.delete(`http://localhost:3001/api/users/${uid}`, {
                params: {id: uid},
            });
            fetchUsers();
        } catch (error) {
            const pendingApiCalls = JSON.parse(
                localStorage.getItem('pendingApiCalls') || '[]',
            );
            pendingApiCalls.push({
                method: 'DELETE',
                url: 'http://localhost:3001/api/users/:id',
                data: uid,
            });
            localStorage.setItem(
                'pendingApiCalls',
                JSON.stringify(pendingApiCalls),
            );
            console.error('Error deleting user', error);
        }
        set((state) => ({
            users: state.users.filter((u) => u.uid !== uid),
        }));
    },
}));
