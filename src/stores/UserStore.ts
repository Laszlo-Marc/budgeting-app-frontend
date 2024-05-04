import axios from 'axios';
import {create} from 'zustand';
import {User} from '../model/User';

interface useUserStoreProps {
    userOpened: boolean;
    handleOpenUser: (user?: User) => void;
    handleCloseUser: () => void;
    selectedUser: User;
    handleExpenses: (user?: User) => void;
    addUser: (user: unknown) => void;
    deleteUser: (uid: number) => void;
    editUser: (user: User) => void;
    users: User[];
}
axios.get<User[]>('http://localhost:3001/api/users').then((response) => {
    useUserStore.setState({users: response.data});
});
const fetchUsers = async () => {
    try {
        const response = await axios.get<User[]>(
            'http://localhost:3001/api/users',
        );
        console.log(response.data);
        useUserStore.setState({users: response.data});
    } catch (error) {
        console.error('Error fetching users', error);
    }
};

export const useUserStore = create<useUserStoreProps>((set) => ({
    userOpened: false,
    users: [],
    selectedUser: {} as User,
    handleOpenUser: (user?: User) =>
        set({userOpened: true, selectedUser: user}),
    handleExpenses: (user?: User) => set({selectedUser: user}),
    handleCloseUser: () => set({userOpened: false, selectedUser: {} as User}),
    editUser: async (user: User) => {
        try {
            await axios.put(
                `http://localhost:3001/api/users/${user.uid}`,
                user,
            );
            fetchUsers();
        } catch (error) {
            console.error('Error editing user', error);
        }
        set((state) => ({
            users: state.users.map((u) => (u.uid === user.uid ? user : u)),
        }));
        fetchUsers();
    },
    addUser: async (user: unknown) => {
        try {
            await axios.post('http://localhost:3001/api/users', user);
            fetchUsers();
        } catch (error) {
            console.error('Error adding user', error);
        }
        //set((state) => ({
        //  users: [...state.users, user],
        //}));
    },
    deleteUser: async (uid: number) => {
        try {
            await axios.delete(`http://localhost:3001/api/users/${uid}`, {
                params: {id: uid},
            });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user', error);
        }
        set((state) => ({
            users: state.users.filter((u) => u.uid !== uid),
        }));
    },
}));
