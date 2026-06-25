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

import branch from '../../assets/branch.png'
import batch from '../../assets/batch.png'
import student from '../../assets/students.png'
import employe from '../../assets/employes.png'
import delevery from '../../assets/deliveryboy.png'
import section from '../../assets/section.png'

import dashboard from '../../assets/dashboard.png';
import Category from "../category/Category";
import { Route, Routes } from "react-router-dom";
import FoodItem from "../fooditem/FoodItem";
import Branch from "../branch/Branch";
import Batch from "../batch/Batch";
import Section from "../section/Section";
import Student from "../student/Student";
import Employees from "../employees/Employees";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";

export default function AdminDashboard() {
    var navigate = useNavigate()
    const handleClick = () => {
        navigate('/category')
    }
    const [userData,setUserData]=useState(null)
     useEffect(() => {
            if (typeof window !== 'undefined') {
                const local = localStorage.getItem('ADMIN')
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
                navigate('/admin')
                }
            }else{
                navigate('/admin')
            }
        }, [])

    const handleLogout = () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: "Logout",
            denyButtonText: `Cancel`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                navigate('/admin')
                localStorage.removeItem('ADMIN')
            }
            else if (result.isDenied) {

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
                    <ListItemText primary={<div style={{ fontFamily: 'Quicksand' }}>Admin Dashboard</div>} />
                </ListItem>
                <Divider />
                <ListItemButton onClick={() => navigate('/admindashboard/branch')}>
                    <ListItemAvatar>
                        <Avatar src={branch} sx={{ width: 28, height: 28 }} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText primary={<div style={{ fontFamily: 'Quicksand' }}>Branch</div>} />
                </ListItemButton>
                <ListItemButton onClick={() => navigate('/admindashboard/batch')}>
                    <ListItemAvatar>
                        <Avatar src={batch} sx={{ width: 28, height: 28 }} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText primary={<div style={{ fontFamily: 'Quicksand' }}>Batch</div>} />
                </ListItemButton>
                <ListItemButton onClick={() => navigate('/admindashboard/section')}>
                    <ListItemAvatar>
                        <Avatar src={section} sx={{ width: 28, height: 28 }} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText primary={<div style={{ fontFamily: 'Quicksand' }}>Sections</div>} />
                </ListItemButton>
                <ListItemButton onClick={() => navigate('/admindashboard/student')}>
                    <ListItemAvatar>
                        <Avatar src={student} sx={{ width: 28, height: 28 }} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText primary={<div style={{ fontFamily: 'Quicksand' }}>Student</div>} />
                </ListItemButton>
                <ListItemButton onClick={() => navigate('/admindashboard/employees')}>
                    <ListItemAvatar>
                        <Avatar src={employe} sx={{ width: 28, height: 28 }} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText primary={<div style={{ fontFamily: 'Quicksand' }}>Employees</div>} />
                </ListItemButton>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar src={delevery} sx={{ width: 28, height: 28 }} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText primary={<div style={{ fontFamily: 'Quicksand' }}>Delivery</div>} />
                </ListItemButton>
                <ListItemButton>
                    <ListItemAvatar>
                        <Avatar src={Logout} sx={{ width: 28, height: 28 }} variant="rounded" />
                    </ListItemAvatar>
                    <ListItemText onClick={handleLogout} primary={<div style={{ fontFamily: 'Quicksand' }}>Logout</div>} />
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
                    <Route element={<Branch />} path="/branch" />
                    <Route element={<Batch />} path="/batch" />
                    <Route element={<Section />} path="/section" />
                    <Route element={<Student />} path="/student" />
                    <Route element={<Employees />} path="/employees" />
                </Routes>
            </Grid>

        </Grid>
    </div>)
}
