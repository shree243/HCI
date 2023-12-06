import React, { useEffect, useState } from "react";
import {
    AppBar,
    Avatar,
    Box,
    Divider,
    Drawer,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@mui/material";
import Logo from "../images/logo55.png"
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import "../styles/HeaderStyles.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
// const jwt = require('jsonwebtoken');

const Header = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);


    const handleClose = () => {
        const userName = localStorage.getItem('userName');
        const userRole = localStorage.getItem('userRole');
        if (userRole === 'user') {
            navigate("/user");
        }
        else if (userRole === 'admin') {
            navigate("/admin");
        }
        else {
            navigate("/instructor");
        }
    };
    const handleLogout = () => {
        // Clear token from localStorage
        localStorage.removeItem('token');
        // Redirect to the sign-in page by changing the URL
        navigate("/");
        // Reload the window to reset the application (optional)
        window.location.reload();
    };

    const [mobileOpen, setMobileOpen] = useState(false);
    // hndle menu click
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    //menu drawer
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography color={"goldenrod"} variant="h6" component="div" sx={{ flexGrow: 1, my: 2 }}>
                <span style={{ verticalAlign: 'middle' }}>
                    <img src={Logo} alt="logo" height="50" width="50" style={{ verticalAlign: 'middle' }} />
                    &nbsp;Eagle
                </span>
            </Typography>

            <Divider />
            <ul className="mobile-navigation">
                <li>
                    <NavLink activeClassName="active" to={"/"}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/menu"}>Menu</NavLink>
                </li>
                <li>
                    <NavLink to={"/about"}>About</NavLink>
                </li>
                <li>
                    <NavLink to={"/contact"}>Contact</NavLink>
                </li>
            </ul>
        </Box>
    );
    return (
        <>
            <Box>
                <AppBar component={"nav"} sx={{ bgcolor: "black" }} style={{ zIndex: 1000 }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{
                                mr: 2,
                                display: { sm: "none" },
                            }}
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            color={"goldenrod"}
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            <img src={Logo} alt="logo" height={"70"} width="250" />
                        </Typography>
                        <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            <ul className="navigation-menu">
                                <li>
                                    <NavLink activeClassName="active" to={"/"}>
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/instructorList"}>Instructors</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/about"}>About</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/contact"}>Contact</NavLink>
                                </li>
                                {!localStorage.getItem('token') ? (

                                    <><li>
                                        <NavLink to={"/SignUp"}>Sign Up</NavLink>
                                    </li><li>
                                            <NavLink to={"/SignIn"}>Sign In</NavLink>
                                        </li></>
                                ) : null}
                            </ul>
                        </Box>
                        <div>
                            {localStorage.getItem('token') ? (
                                <IconButton onClick={handleAvatarClick}>
                                    <Avatar alt="User Avatar" src="src/jpjh.gfif" />
                                </IconButton>
                            ) : null}

                            {localStorage.getItem('token') ? (
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <AccountCircleIcon fontSize="small" />
                                        </ListItemIcon>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <DashboardIcon fontSize="small" />
                                        </ListItemIcon>
                                        DashBoard
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <LogoutIcon fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            ) : null}
                        </div>
                    </Toolbar>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": {
                                boxSizing: "border-box",
                                width: "240px",
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box>
                    <Toolbar />
                </Box>
            </Box>
        </>
    );
};

export default Header;