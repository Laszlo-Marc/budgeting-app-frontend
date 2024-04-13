import {ExpandMore} from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material';
import React, {useContext, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ExpenseContext} from '../contexts/Context';
import {Expense} from '../model/Expenses';

const Detail = () => {
    const params = useParams();
    const [expense, setExpense] = useState<Expense | undefined>(undefined);
    const expenseContext = useContext(ExpenseContext);
    React.useEffect(() => {
        if (params.id)
            setExpense(
                expenseContext?.expenses.find(
                    (expense) => expense.getId() === parseInt(params.id!),
                ),
            );
    }, []);
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel1-content'
                    id='panel1-header'
                >
                    <Typography>Category</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {expense?.getCategory()}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel2-content'
                    id='panel2-header'
                >
                    <Typography>Amount</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {expense?.getAmount()}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel2-content'
                    id='panel2-header'
                >
                    <Typography>Date</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {expense?.getDate()?.toString()}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel2-content'
                    id='panel2-header'
                >
                    <Typography>Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {expense?.getDescription()}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel2-content'
                    id='panel2-header'
                >
                    <Typography>Account</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {expense?.getAccount()}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel2-content'
                    id='panel2-header'
                >
                    <Typography>Receiver</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {expense?.getReceiver()}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Detail;
