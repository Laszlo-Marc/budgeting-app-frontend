/* eslint-disable @typescript-eslint/no-explicit-any */
import {Suspense, lazy} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';

const AppRouter = () => {
    const Overview = lazy(() => import('./components/Overview'));
    const Detail = lazy(() => import('./components/Details'));
    const BasicPie = lazy(() => import('./components/Chart'));

    return (
        <BrowserRouter>
            <Suspense fallback={<></>}>
                <Routes>
                    <Route
                        path='/'
                        element={<Navigate replace to='/expenses' />}
                    />
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
