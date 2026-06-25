import { makeStyles } from "@mui/styles"
import Grid from '@mui/material/Grid'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import icon from '../../assets/icon.png'
import { useState,useEffect } from "react";
import { getData, getDate, getTime, postData } from "../../services/FetchNodeServices";
import { red } from "@mui/material/colors";
import Swal from "sweetalert2";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";


const useStyle = makeStyles(() => ({
    root: {
        display: 'flex',
        background: 'iceblue',
        justifyContent: 'center',
        width: '100%',
        height: 'auto',
        alignItems: 'center',
    },
    box: {
        width: '100%',
        height: 'auto',
        border: '1px solid hsla(330, 53%, 77%, 1)',
        borderRadius: 10,
        margin: 10,
        padding: 0,
        background: 'white',
    },
    heading: {
        width: '100%',
        height: 'auto',
        paddingBottom: '10px',
        background: 'linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 53%, 77%, 1) 100%)',
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 'clamp(18px, 2.5vw, 28px)',
        color: '#fff',
        marginTop: 5,
    },
    subTitleStyle: {
        fontWeight: 'bold',
        fontSize: 'clamp(12px, 1.5vw, 18px)',
        color: '#fff',
        padding: 0,
        marginTop: 5,
        display: 'flex',
    }
}))
export default function PictureInterface({ refresh, setRefresh }) {
    const [categoryId, setCategoryId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [foodItemId, setFoodItemId] = useState('')
    const [foodItemList, setFoodItemList] = useState([])
    const [categoryName, setcategoryName] = useState('')
    const [pictures, setPictures] = useState([])
    const [error, setError] = useState({ imgError: null })
    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    const validation = () => {
        var isError = false
        if (categoryId.length == 0) {
            setError((prev) => ({ ...prev, 'categoryId': 'pls input category Name..' }))
            isError = true
        }
         if (foodItemId.length == 0) {
            setError((prev) => ({ ...prev, 'foodItemId': 'pls input foodItem Name..' }))
            isError = true
        }
        if (pictures.length == 0) {
            setError((prev) => ({ ...prev, 'imgError': 'pls input category Icon..' }))
            isError = true
        }
        return isError
    }
    const showPicture=()=>{
        return pictures?.map((item)=>{
            return <div style={{display:'inline',width:800,height:50,flexWrap:'wrap'}}>
                <div>
                    <img src={`${URL.createObjectURL(item)}`} style={{width:50,height:50}}/>
                </div>
            </div>
        })
    }
    const handleclick = async () => {
        if (!validation()) {
            var formData = new FormData();
            formData.append('categoryid', categoryId);
            formData.append('fooditemid', foodItemId);
            pictures.map((item,i)=>{
                formData.append(`f${i}`,item)
            })
            formData.append('createdate', getDate());
            formData.append('createtime', getTime());
            formData.append('userid', 'tushar');
            var response = await postData('morepicture/submit_morepicture', formData);
            if (response.status) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true
                });
            }
        }
        handleReset()
        setRefresh(!refresh)

    }
    const handleimage = (e) => {
        setPictures(Object.values(e.target.files))
        setError((prev) => ({ ...prev, 'imgError': '' }))
    }

    const handleReset = () => {

    }

    useEffect(function () {
        fetchAllCategory();
    }, []);

    const fetchAllCategory = async () => {
        var res = await getData('morepicture/fetch_all_category');
        setCategoryList(res.data);
    };

    const fillcategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
        });
    };
        const handleCategoryChange=(e)=>{
        setCategoryId(e.target.value)
        fetchAllFoodItem(e.target.value)
    }

    const fetchAllFoodItem=async(sid)=>{
        var res=await postData('morepicture/fetch_all_fooditem',{'categoryid':sid})
        setFoodItemList(res.data)
    }

    const fillFoodItem=()=>{
         return foodItemList.map((item)=>{
            return(<MenuItem value={item.fooditemid}>{item.fooditemname}</MenuItem>)
         })
    }
    

    var classes = useStyle()
    return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 20 }}>
                            <div className={classes.subTitleStyle}>New Food Picture</div>
                        </div>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.categoryId} error={error?.categoryId} onFocus={() => handleError('categoryId', '')}><InputLabel>Category Name</InputLabel><Select label='Branch' value={categoryId} onChange={handleCategoryChange}><MenuItem>-Select Category-</MenuItem>{fillcategory()}</Select></FormControl>
                    </div>
                    {/* <div style={{ padding: 10 }}>
                        <TextField onChange={(e) => setBranchId(e.target.value)} label='Branch Name' fullWidth value={branchId} />
                    </div> */}
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.foodItemId} error={error?.foodItemId} onFocus={() => handleError('foodItemId', '')}><InputLabel>Food Name</InputLabel><Select label='Branch' value={foodItemId} onChange={(e) => setFoodItemId(e.target.value)}><MenuItem>-Select FoodItem-</MenuItem>{fillFoodItem()}</Select></FormControl>
                    </div>
                    {/*<div style={{ padding: 10 }}>
                        <TextField onChange={(e) => setcategoryName(e.target.value)} label='Category Name' fullWidth helperText={error?.categoryName} error={error?.categoryName} onFocus={() => handleError('categoryName', '')} value={categoryName} />
                    </div>*/}
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <Button style={{ backgroundColor: '#572445', height: '5vh' }} endIcon={<CloudUploadIcon />} variant='contained' fullWidth component='label'>Upload File
                            <input onChange={handleimage} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {showPicture()}
                    </div>
                    <div style={{ color: 'red', fontFamily: 'Roboto,Helvetica,Arial,sans-serif', fontSize: '0.75rem', fontWeight: 400, lineHeight: '1.66rem' }}>{error?.imgError == null ? '' : error.imgError}</div>
                </Grid>
                <Grid size={1.5}>
                    <div style={{ padding: 10 }}>
                        <Button size="small" onClick={handleReset} variant="contained" color='error' fullWidth style={{ height: '5vh' }}>
                            Reset
                        </Button>
                    </div>
                </Grid>
                <Grid size={1.5}>
                    <div style={{ padding: 10 }}>
                        <Button size="small" onClick={handleclick} variant="contained" style={{ backgroundColor: '#572445', height: '5vh' }} fullWidth >
                            Submit
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    </div>)
}