import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getDate, getTime, postData, getData, serverURL } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";
import { IconButton, Dialog, DialogContent, Button, Grid } from "@mui/material";
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';
import LoadingOverlay from "../../components/LoadingOverlay";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const useStyle = makeStyles(() => ({
    root: {
        display: 'flex',
        background: 'iceblue',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    box: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        margin: 10,
        padding: 0,
        background: 'white',
    },
    heading: {
        width: '100%',
        height: 'auto',
        background: '#572445',
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        display: "flex"
    },
    titleStyle: {
        fontWeight: 'bold',
        fontSize: 32,
        color: '#fff',
        marginTop: 0,
    },
    subTitleStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
        padding: 0
    }
}));

export default function PictureDisplay({ refresh }) {
    const classes = useStyle();
    const [pictureId, setPictureId] = useState('')
    const [pictureList, setPictureList] = useState([]);
    const [masterCategoryList, setMasterCategoryList] = useState([]); // <-- 1. New Master Category State
    const [open, setOpen] = useState(false);

    const [categoryId, setCategoryId] = useState('');
    const [foodItemId, setFoodItemId] = useState('');
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [foodItemList, setFoodItemList] = useState([]);

    useEffect(() => {
        fetchAllPictures();
        fetchMasterCategories(); // <-- Fetch master data on refresh
    }, [refresh]);

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }));
    };

    const validation = () => {
        var isError = false;
        if (!categoryId) {
            setError((prev) => ({ ...prev, 'categoryId': 'pls select category Name..' }));
            isError = true;
        }
        if (!foodItemId) {
            setError((prev) => ({ ...prev, 'foodItemId': 'pls select food item..' }));
            isError = true;
        }
        return isError;
    };

    const handleclick = async () => {
        if (!validation()) {
            setLoading(true);
            var body = {
                'categoryid': categoryId,
                'fooditemid': foodItemId,
                'createddate': getDate(),
                'createdtime': getTime(),
                'userid': 'tushar',
                'pictureid': pictureId,
            };
            var response = await postData('morepicture/edit_morepicture_data', body);
            setLoading(false);
            if (response.status) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true
                });
                setOpen(false);
                fetchAllPictures();
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: response.message,
                    showConfirmButton: false,
                    timer: 2000,
                    toast: true
                });
            }
        }
    };

    const fetchAllFoodItem = async (sid) => {
        var res = await postData('morepicture/fetch_all_fooditem', { 'categoryid': sid });
        if (res && res.data) {
            setFoodItemList(res.data);
        }
    };

    const fillFoodItem = () => {
        return foodItemList.map((item, index) => {
            return (<MenuItem key={index} value={item.fooditemid}>{item.fooditemname}</MenuItem>);
        });
    };

    // <-- 2. Updated to map master lists instead of picture variations
    const fillcategory = () => {
        return masterCategoryList.map((item, index) => {
            return <MenuItem key={index} value={item.categoryid}>{item.categoryname}</MenuItem>;
        });
    };

    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
        setFoodItemId('');
        fetchAllFoodItem(e.target.value);
    };

    const showCategoryInterface = () => {
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <div className={classes.heading}>
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 10 }}>
                                <div className={classes.titleStyle}>HungerBuddy</div>
                                <div className={classes.subTitleStyle}>Edit More Picture</div>
                            </div>
                            <div style={{ display: "flex", marginLeft: 'auto', marginTop: '-30px' }}>
                                <IconButton onClick={handleCloseDialog} aria-label="close">
                                    <CloseIcon style={{ color: 'white' }} />
                                </IconButton>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={12}>
                        <div style={{ padding: 10, }}>
                            <FormControl fullWidth error={!!error?.categoryId} onFocus={() => handleError('categoryId', '')}>
                                <InputLabel>Category Name</InputLabel>
                                <Select label='Category Name' value={categoryId} onChange={handleCategoryChange}>
                                    <MenuItem value="">-Select Category-</MenuItem>
                                    {fillcategory()}
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid size={12}>
                        <div style={{ padding: 10 }}>
                            <FormControl fullWidth error={!!error?.foodItemId} onFocus={() => handleError('foodItemId', '')}>
                                <InputLabel>Food Name</InputLabel>
                                <Select label='Food Name' value={foodItemId} onChange={(e) => setFoodItemId(e.target.value)}>
                                    <MenuItem value="">-Select FoodItem-</MenuItem>
                                    {fillFoodItem()}
                                </Select>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <Button onClick={handleCloseDialog} variant="contained" color='error' fullWidth>
                                Close
                            </Button>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <Button onClick={handleclick} variant="contained" style={{ backgroundColor: '#572445' }} fullWidth>
                                Submit
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    };

    const fetchAllPictures = async () => {
        setLoading(true);
        var response = await getData('morepicture/fetch_all_picture');
        if (response && response.data) {
            setPictureList(response.data);
        }
        setLoading(false);
    };

    // <-- 3. New Function to fetch all base categories
    const fetchMasterCategories = async () => {
        var response = await getData('category/fetch_all_category');
        if (response && response.data) {
            setMasterCategoryList(response.data);
        }
    };

    useEffect(() => {
        fetchAllPictures();
        fetchMasterCategories();
    }, []);

    const handleOpenDialog = (rowData) => {
        setPictureId(rowData.pictureid || '')
        setCategoryId(rowData.categoryid || '');
        setFoodItemId(rowData.fooditemid || '');
        setOpen(true);
        if (rowData.categoryid) {
            fetchAllFoodItem(rowData.categoryid);
        }
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleDelete = async (cid) => {
        Swal.fire({
            title: "Do you want to Delete the Data ?",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                var response = await postData('morepicture/delete_morepicture', { pictureid: cid });
                Swal.fire(response.message);
                fetchAllPictures();
            }
        });
    };

    const displayCategory = () => {
        return (
            <div>
                <MaterialTable
                    title="Food Picture List"
                    columns={[
                        { title: 'Picture Id', field: 'pictureid' },
                        { title: 'Category Name', field: 'categoryname' },
                        { title: 'FoodItem Name', field: 'fooditemname' },
                        {
                            title: "FoodItem Images",
                            render: (rowData) => (
                                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                                    {rowData.picture && rowData.picture.split(",").map((item, index) => (
                                        <img
                                            key={index}
                                            src={`${serverURL}/images/${item.trim()}`}
                                            alt="food"
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 5,
                                                objectFit: "cover",
                                            }}
                                        />
                                    ))}
                                </div>
                            ),
                        }
                    ]}
                    data={pictureList}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit Category Info',
                            onClick: (event, rowData) => handleOpenDialog(rowData)
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete Data',
                            onClick: (event, rowData) => handleDelete(rowData.pictureid)
                        }
                    ]}
                />
            </div>
        );
    };

    return (
        <>
            <LoadingOverlay open={loading} />
            <div className={classes.root}>
                <div className={classes.box}>
                    {displayCategory()}
                </div>
                <Dialog open={open} onClose={handleCloseDialog}>
                    <DialogContent>
                        {showCategoryInterface()}
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}