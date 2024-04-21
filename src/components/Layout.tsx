import ExpenseDialog from './expenseComponents/Dialog';

interface LayoutProps {
    children: React.ReactNode;
}
const Layout = ({children}: LayoutProps) => {
    return (
        <>
            <ExpenseDialog />
            {children}
        </>
    );
};
export default Layout;
