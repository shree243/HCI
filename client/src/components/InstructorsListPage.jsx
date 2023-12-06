import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Layout from './Layout';

const InstructorsListPage = () => {
    const [instructor, setInstructor] = useState([]);
    const userRole = 'instructor'
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    useEffect(() => {
        instrctorData();
    }, []);

    const instrctorData = async (e) => {
        try {
            const url = "http://localhost:5001/api/users/findByRole";
            const response = await axios.post(url, { userRole });
            setInstructor(response.data);
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <Layout>
            <div>
                <div>
                    <Stack direction="row" spacing={2} style={{ padding: '150px' }}>
                        {instructor.map((inst) => (
                            <Card sx={{ maxWidth: 345 }} style={{ padding: '50px' }}>
                                <CardMedia style={{ height: '40vh' }}
                                    sx={{ height: 140 }}
                                    image="person2.jpg"
                                    title="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {inst.firstName}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {inst.lastName}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {inst.number}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {inst.email}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        ))}

                    </Stack>
                </div>
            </div>
        </Layout>
    )
}

export default InstructorsListPage
