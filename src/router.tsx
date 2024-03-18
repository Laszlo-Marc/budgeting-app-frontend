import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    const Overview = lazy(() => import('./components/Overview'));
    const Detail = lazy(() => import('./components/Details'));
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
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};
export default AppRouter;
