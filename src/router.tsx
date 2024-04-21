/* eslint-disable @typescript-eslint/no-explicit-any */
import {Suspense, lazy} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import UserLayout from './components/userComponents/UserLayout';

const AppRouter = () => {
    const Overview = lazy(
        () => import('./components/expenseComponents/Overview'),
    );
    const Detail = lazy(() => import('./components/expenseComponents/Details'));
    const BasicPie = lazy(() => import('./components/expenseComponents/Chart'));
    const UserOverview = lazy(
        () => import('./components/userComponents/UserOverview'),
    );
    const UserDetails = lazy(
        () => import('./components/userComponents/UserDetails'),
    );
    return (
        <BrowserRouter>
            <Suspense fallback={<></>}>
                <Routes>
                    <Route
                        path='/'
                        element={<Navigate replace to='/users' />}
                    />
                    <Route
                        element={
                            <UserLayout>
                                <UserOverview />
                            </UserLayout>
                        }
                        path={'/users'}
                    />
                    <Route element={<UserDetails />} path={'/users/:id'} />
                    <Route element={<BasicPie />} path={'/chart'} />
                    <Route
                        element={
                            <Layout>
                                <Overview />
                            </Layout>
                        }
                        path={'/expenses'}
                    />
                    <Route element={<Detail />} path={'/expenses/:id'} />
                    <Route element={<BasicPie />} path={'/chart'} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
export default AppRouter;
