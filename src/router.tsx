/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import {Suspense, lazy} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import SignUp from './components/registerComponents/register';
import SignInSide from './components/signUpComponents/signIn';
import UserChart from './components/userComponents/UserChart';
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
                    <Route element={<AuthOutlet fallbackPath='/sign-in' />}>
                        <Route
                            path='/'
                            element={<Navigate replace to='/sign-in' />}
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
                        <Route element={<UserChart />} path={'/users/chart'} />
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
                    </Route>
                    <Route path='/sign-in' element={<SignInSide />} />
                    <Route path='/register' element={<SignUp />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
export default AppRouter;
