/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import {Suspense, lazy, useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout';
import {Expense} from './model/Expenses';

const AppRouter = () => {
    const Overview = lazy(() => import('./components/Overview'));
    const Detail = lazy(() => import('./components/Details'));
    const BasicPie = lazy(() => import('./components/Chart'));
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const fetchExpenses = () => {
        axios
            .get('http://localhost:3001/api/expenses')
            .then((response) => {
                const expenses = response.data.map(
                    (expense: any) =>
                        new Expense(
                            expense.id,
                            expense.category,
                            expense.amount,
                            expense.date,
                            expense.description,
                            expense.account,
                            expense.receiver,
                        ),
                );
                setExpenses(expenses);
            })
            .catch((error) => {
                console.error('Error fetching expenses:', error);
            });
    };
    useEffect(() => {
        fetchExpenses();
    }, []);

    useEffect(() => {
        console.log(expenses);
    }, [expenses]);
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
