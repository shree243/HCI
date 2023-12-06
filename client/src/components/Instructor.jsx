import * as React from 'react';
import Layout from './Layout';
import { Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


export default function Instructor() {
    const [instructor, setInstructor] = useState([]);
    // const userName = localStorage.getItem('userName');
    // const userRole = localStorage.getItem('role');
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const email = localStorage.getItem("email");
    const instructorName = localStorage.getItem("instructor");
    const profilePicture = localStorage.getItem("profilePicture");
    const phoneNumber = localStorage.getItem("phoneNumber");
    useEffect(() => {
        instrctorData();
    }, []);
    const serverURL = 'http://localhost:5001/';
    const instrctorData = async (e) => {
        try {
            const url = "http://localhost:5001/api/users/findByName";
            const response = await axios.post(url, { name: instructorName });
            setInstructor(response.data);
        }
        catch (e) {
            console.log(e)
        }
    }
    const formattedURL = `${serverURL}${profilePicture}`;
    const accessibleURL = formattedURL.replace(/\\/g, '/');
    console.log(accessibleURL, "pictureeeeeeeeeeeeeeeeee")
    return (

        <Layout>
            <Stack style={{ padding: '150px' }}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}
            >
                <Stack spacing={2}>
                    <h1>User</h1>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia style={{ height: '70vh' }}
                            sx={{ height: 140 }}
                            image={accessibleURL}
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {firstName}  {lastName}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                This User has Enrolled with {instructorName}for Driving training
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                All the Best for the Journey.... I hope {instructorName} can help you teach you driving smoothly...
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                size="small"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'lightgrey', // Change this to the desired highlight color
                                    },
                                }}
                            >
                                Edit Profile
                            </Button>
                            <Button
                                size="small"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'lightgrey', // Change this to the desired highlight color
                                    },
                                }}
                            >
                                Delete Profile
                            </Button>

                        </CardActions>
                    </Card>
                </Stack>
                <Stack spacing={2}>
                    <h1>Instructor</h1>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia style={{ height: '70vh' }}
                            sx={{ height: 140 }}
                            image="person3.jpg"
                            title="green iguana"
                        />
                        {instructor.map((inst, index) => (
                            <Card key={index} sx={{ maxWidth: 345 }}>
                                {/* Card content for each instructor */}
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {inst.firstName} {inst.lastName}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {inst.email}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        This User has Enrolled with {inst.firstName} for Driving training
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        All the Best for the Journey.... I hope {inst.firstName} can help you teach you driving smoothly...
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'lightgrey',
                                            },
                                        }}
                                    >
                                        Edit Profile
                                    </Button>
                                    <Button
                                        size="small"
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'lightgrey',
                                            },
                                        }}
                                    >
                                        Delete Profile
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}

                    </Card>
                </Stack>
            </Stack>

        </Layout >
    );
}
