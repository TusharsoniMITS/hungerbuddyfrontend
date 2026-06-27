import { makeStyles } from "@mui/styles"
import Grid from '@mui/material/Grid'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import icon from '../../assets/icon.png'
import { useEffect, useState } from "react";
import { getData, getDate, getTime, postData } from "../../services/FetchNodeServices";
import { red } from "@mui/material/colors";
import Swal from "sweetalert2";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import LoadingOverlay from "../../components/LoadingOverlay";

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
export default function FoodItemInterface() {
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
    const [loading, setLoading] = useState(false);


    useEffect(function () {
        fetchCategory()
        fetchBranch()
    }, [])

    const fetchCategory = async () => {
        setLoading(true)
        var response = await getData('fooditem/fetch_category')
        setCategoryList(response.data)
        setLoading(false)
    }
    const fetchBranch = async () => {
        setLoading(true)
        var response = await getData('fooditem/fetch_branch')
        setBranchList(response.data)
        setLoading(false)
    }

    const fillCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }
    const fillBranch = () => {
        return branchList.map((item) => {
            return <MenuItem value={item.branchid}>{item.branchname}</MenuItem>
        })
    }

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
        if (branchId.length == 0) {
            setError((prev) => ({ ...prev, 'branchId': 'pls input category Name..' }))
            isError = true
        }
        if (foodItemName.length == 0) {
            setError((prev) => ({ ...prev, 'foodItemName': 'pls input category Name..' }))
            isError = true
        }
        if (foodItemType.length == 0) {
            setError((prev) => ({ ...prev, 'foodItemType': 'pls input category Name..' }))
            isError = true
        }
        if (foodItemTaste.length == 0) {
            setError((prev) => ({ ...prev, 'foodItemTaste': 'pls input category Name..' }))
            isError = true
        }
        if (ingridients.length == 0) {
            setError((prev) => ({ ...prev, 'ingridients': 'pls input category Name..' }))
            isError = true
        }
        if (fullPrice.length == 0) {
            setError((prev) => ({ ...prev, 'fullPrice': 'pls input category Name..' }))
            isError = true
        }
        if (halfPrice.length == 0) {
            setError((prev) => ({ ...prev, 'halfPrice': 'pls input category Name..' }))
            isError = true
        }
        if (offerPrice.length == 0) {
            setError((prev) => ({ ...prev, 'offerPrice': 'pls input category Name..' }))
            isError = true
        }
        if (rating.length == 0) {
            setError((prev) => ({ ...prev, 'rating': 'pls input category Name..' }))
            isError = true
        }
        if (status.length == 0) {
            setError((prev) => ({ ...prev, 'status': 'pls input category Name..' }))
            isError = true
        }
        if (picture.bytes.length == 0) {
            setError((prev) => ({ ...prev, 'imgError': 'pls input category Icon..' }))
            isError = true
        }
        return isError
    }
    const handleclick = async () => {
        if (!validation()) {
            setLoading(true)
            var formData = new FormData();
            formData.append('categoryid', categoryId);
            formData.append('branchid', branchId);
            formData.append('fooditemname', foodItemName);
            formData.append('fooditemtype', foodItemType);
            formData.append('fooditemtaste', foodItemTaste);
            formData.append('ingridients', ingridients);
            formData.append('fullprice', fullPrice);
            formData.append('halfprice', halfPrice);
            formData.append('offerprice', offerPrice);
            formData.append('rating', rating);
            formData.append('status', status);
            formData.append('picture', picture.bytes);
            formData.append('createddate', getDate());
            formData.append('updatedtime', getTime());
            formData.append('userid', 'tushar');
            var response = await postData('fooditem/submit_fooditem', formData);
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
        setLoading(false)
        // setRefresh(!refresh)

    }
    const handleimage = (e) => {
        setPicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
        setError((prev) => ({ ...prev, 'imgError': '' }))
    }

    const handleReset = () => {
        setFoodItemId('')
        setCategoryId('')
        setBranchId('')
        setFoodItemName('')
        setFoodItemType('')
        setFoodItemTaste('')
        setIngridients('')
        setFullPrice('')
        setHalfPrice('')
        setOfferPrice('')
        setRating('')
        setStatus('')
        setPicture({
            bytes: '',
            fileName: icon
        });
    }

    var classes = useStyle()
    return (<>
    <LoadingOverlay open={loading} />
    <div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 20 }}>
                            <div className={classes.subTitleStyle}>New Food Item</div>
                        </div>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select label="Food Type" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                <MenuItem>-Select Category-</MenuItem>
                                {fillCategory()}
                            </Select>
                        </FormControl>
                        {/*<TextField size="small" onChange={(e) => setCategoryId(e.target.value)} label='Category Id' fullWidth value={categoryId} helperText={error?.categoryId} error={error?.categoryId} onFocus={() => handleError('categoryId', '')} />*/}
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Branch</InputLabel>
                            <Select label="Food Type" value={branchId} onChange={(e) => setBranchId(e.target.value)}>
                                <MenuItem>-Select Branch-</MenuItem>
                                {fillBranch()}
                            </Select>
                        </FormControl>
                        {/*<TextField size="small" onChange={(e) => setBranchId(e.target.value)} label='branch Id' fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={() => handleError('branchId', '')} value={branchId} />*/}
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setFoodItemName(e.target.value)} label='FoodItem Name' fullWidth value={foodItemName} helperText={error?.foodItemName} error={error?.foodItemName} onFocus={() => handleError('foodItemName', '')} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Food Type</InputLabel>
                            <Select label="Food Type" value={foodItemType} onChange={(e) => setFoodItemType(e.target.value)}>
                                <MenuItem>-Select Food Type-</MenuItem>
                                <MenuItem value={'Veg'}>Veg</MenuItem>
                                <MenuItem value={'Non-Veg'}>Non-Veg</MenuItem>
                            </Select>
                        </FormControl>
                        {/*<TextField onChange={(e) => setFoodItemType(e.target.value)} label='fooditem type' fullWidth helperText={error?.foodItemType} error={error?.foodItemType} onFocus={() => handleError('foodItemType', '')} value={foodItemType} />*/}
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Food Taste</InputLabel>
                            <Select label="Food Taste" value={foodItemTaste} onChange={(e) => setFoodItemTaste(e.target.value)}>
                                <MenuItem>-Select Food Taste-</MenuItem>
                                <MenuItem value={'Spicy'}>Spicy</MenuItem>
                                <MenuItem value={'Non Spicy'}>Non Spicy</MenuItem>
                            </Select>
                        </FormControl>
                        {/*<TextField onChange={(e) => setFoodItemTaste(e.target.value)} label='FoodItem taste' fullWidth value={foodItemTaste} helperText={error?.foodItemTaste} error={error?.foodItemTaste} onFocus={() => handleError('foodItemTaste', '')} />*/}
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setIngridients(e.target.value)} label='fooditem Ingridients' fullWidth helperText={error?.ingridients} error={error?.ingridients} onFocus={() => handleError('ingridients', '')} value={ingridients} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setFullPrice(e.target.value)} label='full price' fullWidth value={fullPrice} helperText={error?.fullPrice} error={error?.fullPrice} onFocus={() => handleError('fullPrice', '')} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setHalfPrice(e.target.value)} label='halfPrice' fullWidth helperText={error?.halfPrice} error={error?.halfPrice} onFocus={() => handleError('halfPrice', '')} value={halfPrice} />
                    </div>
                </Grid>

                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setOfferPrice(e.target.value)} label='offer price' fullWidth value={offerPrice} helperText={error?.offerPrice} error={error?.offerPrice} onFocus={() => handleError('offerPrice', '')} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setRating(e.target.value)} label='rating' fullWidth helperText={error?.rating} error={error?.rating} onFocus={() => handleError('rating', '')} value={rating} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth>
                            <InputLabel>Status</InputLabel>
                            <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <MenuItem>-Select Status-</MenuItem>
                                <MenuItem value={'Available'}>Available</MenuItem>
                                <MenuItem value={'Unavailable'}>Not-Available</MenuItem>
                            </Select>
                        </FormControl>
                        {/*<TextField onChange={(e) => setStatus(e.target.value)} label='status' fullWidth helperText={error?.status} error={error?.status} onFocus={() => handleError('status', '')} value={status} />*/}
                    </div>
                </Grid>
                <Grid size={2}>
                    <></>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <Button style={{ backgroundColor: '#572445', height: '7vh' }} endIcon={<CloudUploadIcon />} variant='contained' fullWidth component='label'>Upload File
                            <input onChange={handleimage} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={picture.fileName} style={{ width: 50 }} alt={picture} ></img>
                    </div>
                    <div style={{ color: 'red', fontFamily: 'Roboto,Helvetica,Arial,sans-serif', fontSize: '0.75rem', fontWeight: 400, lineHeight: '1.66rem' }}>{error?.imgError == null ? '' : error.imgError}</div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <Button onClick={handleReset} variant="contained" color='error' fullWidth style={{ height: '7vh' }}>
                            Reset
                        </Button>
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <Button onClick={handleclick} variant="contained" style={{ backgroundColor: '#572445', height: '7vh' }} fullWidth >
                            Submit
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    </div>
    </>
    )
}