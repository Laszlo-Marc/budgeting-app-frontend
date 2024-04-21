import UserDialog from './UserDialog';

interface LayoutProps {
    children: React.ReactNode;
}
const UserLayout = ({children}: LayoutProps) => {
    return (
        <>
            <UserDialog />
            {children}
        </>
    );
};
export default UserLayout;
