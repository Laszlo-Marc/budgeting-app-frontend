import {ExpandMore} from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    TextField,
    Typography,
} from '@mui/material';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import Expense from '../model/Expenses';
import useExpenseStore from '../stores/ExpenseStores';

const Detail = () => {
    const params = useParams();
    const [expense, setExpense] = useState<Expense | undefined>(undefined);
    const {expenses} = useExpenseStore();
    React.useEffect(() => {
        if (params.id)
            setExpense(
                expenses.find((expense) => expense.id === parseInt(params.id!)),
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
                    <TextField
                        disabled={true}
                        value={expense?.category || ''}
                    />
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
                    <TextField disabled={true} value={expense?.amount || ''} />
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
                    <TextField disabled={true} value={expense?.date || ''} />
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
                    <TextField
                        disabled={true}
                        value={expense?.description || ''}
                    />
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
                    <TextField disabled={true} value={expense?.account || ''} />
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
                    <Typography
                        disabled={true}
                        value={expense?.receiver || ''}
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Detail;
