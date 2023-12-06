import React, { useState } from 'react'
import Layout from './Layout';
import { Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Button } from 'bootstrap';
const drawerWidth = 300;



export default function User() {

    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('role');
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const email = localStorage.getItem("email");
    const instructor = localStorage.getItem("instructor");
    const profilePicture = localStorage.getItem("profilePicture");
    const phoneNumber = localStorage.getItem("phoneNumber");
    console.log(firstName, lastName, email, instructor, phoneNumber, "dggfdggdgggggggggggggggggggggggggggggg")
    return (
        <Layout>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia style={{ height: '20px' }}
                    sx={{ height: 140 }}
                    image={profilePicture}
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {firstName}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {lastName}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                        {email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        This User has Enrolled with {instructor}for Driving training
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        All the Best for the Journey.... I hope {instructor} can help you teach you driving smoothly...
                    </Typography>
                </CardContent>
            </Card>
        </Layout>
    );
}