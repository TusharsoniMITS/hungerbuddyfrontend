import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getDate, getTime, postData, getData, serverURL } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";
import { IconButton, Dialog, DialogTitle, DialogContent, Button, Grid, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import Swal from "sweetalert2";
import icon from '../../assets/icon.png'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EditIconComponent from "../../components/EditIconComponent";



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
        height: '9vh',
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
}))

export default function FoodItemDisplay() {
    const classes = useStyle()
    const [foodItemList, setFoodItemList] = useState([]);
    const [open, setOpen] = useState(false)
    /*****************category view************/
    const [foodItemId, setFoodItemId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [branchId, setBranchId] = useState('')
    const [branchList, setBranchList] = useState([])
    const [foodItemName, setFoodItemName] = useState('')
    const [foodItemType, setFoodItemType] = useState('')
    const [foodItemTaste, setFoodItemTaste] = useState('')
    const [ingridients, setIngridients] = useState('')
    const [fullPrice, setFullPrice] = useState('')
    const [halfPrice, setHalfPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [picture, setPicture] = useState({ bytes: '', fileName: icon })
    const [rating, setRating] = useState('')
    const [status, setStatus] = useState('')

    const [categoryName, setcategoryName] = useState('')
    const [categoryIcon, setCategoryIcon] = useState({ bytes: '', fileName: icon })
    const [error, setError] = useState({ imgError: null })
    const [dialogState, setDialogState] = useState('')
    const [pictureStatusButton, setPictureStatusButton] = useState(false)
    const [tempPicture, setTempPicture] = useState('')

    //   useEffect(()=>{
    //     fetchAllFoodItem()
    //   },[refresh])


    useEffect(function () {
        fetchCategory()
        fetchBranch()
    }, [])

    const fetchCategory = async () => {
        try {
            var response = await getData('fooditem/fetch_category')

            console.log("Category Response:", response)

            setCategoryList(response.data || response || [])
        }
        catch (error) {
            console.log(error)
            setCategoryList([])
        }
    }

    const fetchBranch = async () => {
        try {
            var response = await getData('fooditem/fetch_branch')

            console.log("Branch Response:", response)

            setBranchList(response.data || response || [])
        }
        catch (error) {
            console.log(error)
            setBranchList([])
        }
    }

    const fillCategory = () => {
        return categoryList.map((item) => (
            <MenuItem
                key={item.categoryid}
                value={item.categoryid}
            >
                {item.categoryname}
            </MenuItem>
        ))
    }

    const fillBranch = () => {
        if (!Array.isArray(branchList)) return []

        return branchList.map((item) => (
            <MenuItem
                key={item.branchid}
                value={item.branchid}
            >
                {item.branchname}
            </MenuItem>
        ))
    }
    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    const validation = () => {
        var isError = false
        if (categoryName.length == 0) {
            setError((prev) => ({ ...prev, 'categoryName': 'pls input category Name..' }))
            isError = true
        }
        // if (categoryIcon.bytes.length == 0) {
        //   setError((prev) => ({ ...prev, 'imgError': 'pls input category Icon..' }))
        //   isError = true
        // }
        return isError
    }
    const handleclick = async () => {
        var body = {
            'fooditemid': foodItemId, 'categoryid': categoryId,
            'branchid': branchId, 'fooditemname': foodItemName,
            'fooditemtype': foodItemType, 'fooditemtaste': foodItemTaste,
            'ingridients': ingridients, 'fullprice': fullPrice,
            'halfprice': halfPrice, 'offerprice': offerPrice,
            'rating': rating, 'status': status, 'picture': picture.bytes,
            'updatedtime': getTime(), 'userid': 'tushar'
        }
        var response = await postData('fooditem/edit_fooditem', body);
        if (response.status) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 2000,
                toast: true
            });
            setOpen(false)
            fetchAllFoodItem()
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
    const handleimage = (e) => {
        setPicture((prev) => ({ ...prev, bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) }))
        setError((prev) => ({ ...prev, 'imgError': '' }))
        setPictureStatusButton(true)
    }

    const handleCancel = () => {
        setPicture({ fileName: tempPicture, bytes: '' })
        setPictureStatusButton(false)
    }

    const handleEditPicture = async () => {
        var formData = new FormData();
        formData.append('fooditemid', foodItemId);
        formData.append('picture', picture.bytes);
        formData.append('createddate', getDate());
        formData.append('createdtime', getTime());
        formData.append('userid', 'tushar');

        var response = await postData(
            'fooditem/edit_fooditem_picture',
            formData
        );

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
            fetchAllFoodItem();

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

    const saveAndCancelButton = () => {
        return (<div style={{ display: "flex", justifyContent: 'space-evenly', width: '100%' }}>
            <Button onClick={handleEditPicture} variant="contained" style={{ backgroundColor: '#572445' }} >Save</Button>
            <Button onClick={handleCancel} variant="contained" color="error" >Cancel</Button>
        </div>)
    }

    const showPictureInterface = () => {
        return (<div style={{ display: "flex", justifyContent: "center", padding: 0 }}>
            <Grid container spacing={0.5}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 10 }}>
                            <div className={classes.titleStyle}>HungerBuddy</div>
                            <div className={classes.subTitleStyle}>Edit Food Category Picture</div>
                        </div>
                        <div style={{ display: "flex", marginLeft: 'auto', marginTop: '-30px' }}>
                            <IconButton
                                onClick={handleCloseDialog}
                                aria-label="delete"
                                style={{
                                    position: "absolute",
                                    top: 40,
                                    left: 530,
                                    zIndex: 1,
                                    background: "rgba(0,0,0,0.5)"
                                }}
                            >
                                <CloseIcon style={{ color: "white" }} />
                            </IconButton>
                        </div>
                    </div>
                </Grid>
                <Grid size={12}>
                    <div style={{ position: "relative" }}>
                        <IconButton
                            onClick={handleCloseDialog}
                            aria-label="delete"
                            style={{
                                position: "absolute",
                                top: 10,
                                left: 500,
                                zIndex: 1,
                                background: "rgba(0,0,0,0.5)"
                            }}
                        >
                            <CloseIcon style={{ color: "white" }} />
                        </IconButton>

                        <img
                            src={picture.fileName}
                            style={{ width: "100%", height: "auto" }}
                        />
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: 10 }}>
                        <Button style={{ backgroundColor: '#572445' }} endIcon={<CloudUploadIcon />} variant='contained' fullWidth component='label'>Upload File
                            <input onChange={handleimage} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: 10 }}>
                        {pictureStatusButton ? saveAndCancelButton() : <></>}
                    </div>
                </Grid>
            </Grid>
        </div>)
    }

    const showFoodItemInterface = () => {
        return (<div >
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 10 }}>
                            <div className={classes.titleStyle}>HungerBuddy</div>
                            <div className={classes.subTitleStyle}>Edit Food Items</div>
                        </div>
                        <div style={{ display: "flex", marginLeft: 'auto', marginTop: '-30px' }}>
                            <IconButton onClick={handleCloseDialog} aria-label="close">
                                <CloseIcon style={{ color: 'white' }} />
                            </IconButton>
                        </div>
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Category</InputLabel>

                            <Select
                                label="Category"
                                value={categoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <MenuItem value="">
                                    -Select Category-
                                </MenuItem>

                                {fillCategory()}
                            </Select>
                        </FormControl>
                        {/*<TextField onChange={(e) => setCategoryId(e.target.value)} label='Category Id' fullWidth value={categoryId} helperText={error?.categoryId} error={error?.categoryId} onFocus={() => handleError('categoryId', '')} />*/}
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Branch</InputLabel>

                            <Select
                                label="Branch"
                                value={branchId}
                                onChange={(e) => setBranchId(e.target.value)}
                            >
                                <MenuItem value="">
                                    -Select Branch-
                                </MenuItem>

                                {fillBranch()}
                            </Select>
                        </FormControl>
                        {/*<TextField onChange={(e) => setBranchId(e.target.value)} label='branch Id' fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={() => handleError('branchId', '')} value={branchId} />*/}
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField onChange={(e) => setFoodItemName(e.target.value)} label='FoodItem Name' fullWidth value={foodItemName} helperText={error?.foodItemName} error={error?.foodItemName} onFocus={() => handleError('foodItemName', '')} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth>
    <InputLabel>Food Type</InputLabel>

    <Select
        label="Food Type"
        value={foodItemType}
        onChange={(e) => setFoodItemType(e.target.value)}
    >
        <MenuItem value="">
            -Select Food Type-
        </MenuItem>

        <MenuItem value="Veg">
            Veg
        </MenuItem>

        <MenuItem value="Non-Veg">
            Non-Veg
        </MenuItem>
    </Select>
</FormControl>
                        {/*<TextField onChange={(e) => setFoodItemType(e.target.value)} label='fooditem type' fullWidth helperText={error?.foodItemType} error={error?.foodItemType} onFocus={() => handleError('foodItemType', '')} value={foodItemType} />*/}
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth>
    <InputLabel>Food Taste</InputLabel>

    <Select
        label="Food Taste"
        value={foodItemTaste}
        onChange={(e) => setFoodItemTaste(e.target.value)}
    >
        <MenuItem value="">
            -Select Food Taste-
        </MenuItem>

        <MenuItem value="Spicy">
            Spicy
        </MenuItem>

        <MenuItem value="Non Spicy">
            Non Spicy
        </MenuItem>
    </Select>
</FormControl>
                        {/*<TextField onChange={(e) => setFoodItemTaste(e.target.value)} label='FoodItem taste' fullWidth value={foodItemTaste} helperText={error?.foodItemTaste} error={error?.foodItemTaste} onFocus={() => handleError('foodItemTaste', '')} />*/}
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField onChange={(e) => setIngridients(e.target.value)} label='fooditem Ingridients' fullWidth helperText={error?.ingridients} error={error?.ingridients} onFocus={() => handleError('ingridients', '')} value={ingridients} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField onChange={(e) => setFullPrice(e.target.value)} label='full price' fullWidth value={fullPrice} helperText={error?.fullPrice} error={error?.fullPrice} onFocus={() => handleError('fullPrice', '')} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField onChange={(e) => setHalfPrice(e.target.value)} label='halfPrice' fullWidth helperText={error?.halfPrice} error={error?.halfPrice} onFocus={() => handleError('halfPrice', '')} value={halfPrice} />
                    </div>
                </Grid>

                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField onChange={(e) => setOfferPrice(e.target.value)} label='offer price' fullWidth value={offerPrice} helperText={error?.offerPrice} error={error?.offerPrice} onFocus={() => handleError('offerPrice', '')} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField onChange={(e) => setRating(e.target.value)} label='rating' fullWidth helperText={error?.rating} error={error?.rating} onFocus={() => handleError('rating', '')} value={rating} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth>
    <InputLabel>Status</InputLabel>

    <Select
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
    >
        <MenuItem value="">
            -Select Status-
        </MenuItem>

        <MenuItem value="Available">
            Available
        </MenuItem>

        <MenuItem value="Unavailable">
            Not-Available
        </MenuItem>
    </Select>
</FormControl>
                        {/*<TextField onChange={(e) => setStatus(e.target.value)} label='status' fullWidth helperText={error?.status} error={error?.status} onFocus={() => handleError('status', '')} value={status} />*/}
                    </div>
                </Grid>
                <Grid size={3}>
                    <></>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: 10 }}>
                        <Button onClick={handleCloseDialog} variant="contained" color='error' fullWidth style={{ height: '7vh' }}>
                            Close
                        </Button>
                    </div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: 10 }}>
                        <Button onClick={handleclick} variant="contained" style={{ backgroundColor: '#572445', height: '7vh' }} fullWidth >
                            Submit
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>)
    }

    /***************************************/
    const fetchAllFoodItem = async () => {
        var response = await getData('fooditem/fetch_all_fooditem');
        setFoodItemList(response.data);
    }
    useEffect(function () {
        fetchAllFoodItem();
    }, []);

    const handleOpenDialog = (rowData, status) => {
        setDialogState(status)
        setFoodItemId(rowData.fooditemid)
        setCategoryId(rowData.categoryid)
        setBranchId(rowData.branchid)
        setFoodItemName(rowData.fooditemname)
        setFoodItemType(rowData.fooditemtype)
        setFoodItemTaste(rowData.fooditemtaste)
        setIngridients(rowData.ingridients)
        setFullPrice(rowData.fullprice)
        setHalfPrice(rowData.halfprice)
        setOfferPrice(rowData.offerprice)
        setRating(rowData.rating)
        setStatus(rowData.status)
        setPicture({ fileName: `${serverURL}/images/${rowData.picture}`, bytes: '' })
        setOpen(true)
        setTempPicture(`${serverURL}/images/${rowData.picture}`)
    }
    const handleCloseDialog = () => {
        setPictureStatusButton(false)
        setOpen(false)
    }

    const showDialog = () => {
        return (<div>
            <Dialog open={open}>
                <DialogTitle>
                </DialogTitle>
                <DialogContent>
                    {dialogState == 'Data' ? showFoodItemInterface() : showPictureInterface()}
                </DialogContent>
            </Dialog>
        </div>)
    }
    const handleDelete = async (cid) => {
        Swal.fire({
            title: "Do you want to Delete the Data ?",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var response = await postData('fooditem/delete_fooditem', { fooditemid: cid })
                Swal.fire(response.message);
                fetchAllFoodItem()
            }
            else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const displayCategory = () => {
        return (<div>
            <MaterialTable
                title="Food List"
                columns={[
                    { title: 'fooditem Id', field: 'fooditemid' },
                    { title: 'category', field: 'categoryname' },
                    { title: 'branch', field: 'branchname' },
                    { title: 'food',render:(rowData)=>(<div>{rowData.fooditemname}({rowData.fooditemtype})</div>) },
                    { title: 'type', field: 'fooditemtype' },
                    { title: 'taste', field: 'fooditemtaste' },
                    // { title: 'ingridients', field: 'ingridients' },
                    { title: 'full/half',render:(rowData)=>(<div>&#8377;{rowData.fullprice}/&#8377;{rowData.halfprice}</div>)},
                    { title: 'offer', render:(rowData)=>(<div>&#8377;{rowData.offerprice}</div>) },
                    { title: 'rating', field: 'rating' },
                    { title: 'status', field: 'status' },
                    { title: 'Picture', render: (rowData) => (<div onClick={() => handleOpenDialog(rowData, 'picture ')}><EditIconComponent image={rowData.picture} /></div>) },
                ]}
                data={foodItemList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Data',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'Data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'delete Data',
                        onClick: (event, rowData) => handleDelete(rowData.fooditemid)
                    }
                ]}
            />
        </div>)
    };

    return (<div className={classes.root}>
        <div className={classes.box}>
            {displayCategory()}
        </div>
        {showDialog()}
    </div>);
}