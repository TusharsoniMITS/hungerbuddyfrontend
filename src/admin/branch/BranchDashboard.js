import { NavigationType, useNavigate } from "react-router-dom"
import { Grid, Button, AppBar, Toolbar, Avatar, ListItem, Divider } from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import cutlery from '../../assets/cutlery.png';
import fooditems from '../../assets/masala-dosa.png';
import Logout from '../../assets/check-out.png';
import Order from '../../assets/order.png';
import pictures from '../../assets/pictures.png'

import dashboard from '../../assets/dashboard.png';
import Category from "../category/Category";
import { Route, Routes } from "react-router-dom";
import FoodItem from "../fooditem/FoodItem";
import Picture from "../morePicture/Picture";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";

export default function BranchDashboard() {
    
    var navigate = useNavigate()
    const Swal = require('sweetalert2')
    const handleClick = () => {
        navigate('/category')
    }
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const local = localStorage.getItem('BRANCH')
            if (local) {
                try {
                    const user = JSON.parse(local)
                    const data = Object.values(user)[0]
                    setUserData(data)
                } catch (error) {
                    console.log(error)
                    setUserData(null)
                }
            }else{
            navigate('/')
            }
        }else{
            navigate('/')
        }
    }, [])
    const handleLogout = () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: "Logout",
            denyButtonText: `Cancel`
        }).then((userData) => {
            /* Read more about isConfirmed, isDenied below */
            if (userData.isConfirmed) {
                navigate('/branchlogin')
                localStorage.removeItem('BRANCH')
            }
            else if (userData.isDenied) {
                window.location.reload()
            }
        });
    }

    const sideBar = () => {
        return (<div style={{ background: "hsla(324, 48%, 94%, 1.00)", margin: 10, borderRadius: 5, height: '70%' }}>
            <List sx={{ width: '100%', maxWidth: 360 }}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={dashboard} sx={{ width: 28, height: 28 }} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText primary={<div style={{ fontFamily: 'Quicksand' }}>Branch Dashboard</div>} />


                </ListItem>
                <Divider />
                <ListItemButton onClick={() => navigate('/branchdashboard/category')}>
                    <ListItemAvatar>
                        <Avatar src={cutlery} sx={{ width: 28, height: 28 }} variant="rounded" />

                    </ListItemAvatar>
                    <ListItemText primary={<div style={{ fontFamily: 'Quicksand' }}>Food Category</div>} />
                </ListItemButton>

                <ListItemButton onClick={() => navigate('/branchdashboard/fooditem')}>
                    <ListItemAvatar>
                        <Avatar src={fooditems} sx={{ width: 28, height: 28 }} variant="rounded" />

                    </ListItemAvatar>
                    <ListItemText primary={<div style={{ fontFamily: 'Quicksand' }}>Food Items</div>} />
                </ListItemButton>

                <ListItemButton onClick={() => navigate('/branchdashboard/pictures')}>
                    <ListItemAvatar>
                        <Avatar src={pictures} sx={{ width: 28, height: 28 }} variant="rounded" />

                    </ListItemAvatar>
                    <ListItemText primary={<div style={{ fontFamily: 'Quicksand' }}>More Picture</div>} />
                </ListItemButton>


                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar src={Order} sx={{ width: 28, height: 28 }} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText primary={<div style={{ fontFamily: 'Quicksand' }}>Orders</div>} />
                </ListItemButton>


                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar src={Logout} sx={{ width: 28, height: 28 }} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText onClick={(handleLogout)} primary={<div style={{ fontFamily: 'Quicksand' }}>Logout</div>} />
                </ListItemButton>
            </List>
        </div>)


    }
    return (<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <AppBar position="static" style={{ background: "hsla(321, 32%, 37%, 1.00)" }}>
            <Toolbar>
                <div style={{ fontSize: 24 }}>
                    HungerBuddy

                </div>
                <Avatar
                    style={{ width: 50, height: 50, marginLeft: 'auto' }}
                    alt="Remy Sharp"
                    src={`${serverURL}/images/1.jpg`} />

            </Toolbar>
        </AppBar>
        <Grid container spacing={1}>
            <Grid size={2} style={{ height: '100vh' }}>
                {sideBar()}
            </Grid>
            <Grid size={10}>
                <Routes>
                    <Route element={<Category />} path="/category" />
                    <Route element={<FoodItem />} path="/fooditem" />
                    <Route element={<Picture />} path="/pictures" />
                </Routes>
            </Grid>

        </Grid>
    </div>)
}
