/* eslint-disable react-hooks/exhaustive-deps */
import {ExpandMore} from '@mui/icons-material';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {User} from '../../model/User';
import {useUserStore} from '../../stores/UserStore';

const Detail = () => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const {users} = useUserStore();
    const params = useParams();
    useEffect(() => {
        console.log(params.id);
        if (params.id)
            setUser(users.find((user) => user.uid === parseInt(params.id!)));
        console.log(user);
    }, [params.id]);
    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel1-content'
                    id='panel1-header'
                >
                    <Typography>Name</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {user?.name}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel2-content'
                    id='panel2-header'
                >
                    <Typography>Email</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {user?.email}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel2-content'
                    id='panel2-header'
                >
                    <Typography>Password</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {user?.password}
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='panel2-content'
                    id='panel2-header'
                >
                    <Typography>Age</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        {user?.age}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default Detail;
