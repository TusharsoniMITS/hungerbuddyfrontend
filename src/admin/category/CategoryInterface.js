import { makeStyles } from "@mui/styles"
import Grid from '@mui/material/Grid'
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import icon from '../../assets/icon.png'
import { useState, useEffect } from "react";
import { getData, getDate, getTime, postData } from "../../services/FetchNodeServices";
import { red } from "@mui/material/colors";
import Swal from "sweetalert2";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";
import { Backdrop, CircularProgress } from "@mui/material";
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
export default function CategoyInterface({ refresh, setRefresh }) {
    const [branchId, setBranchId] = useState('')
    const [branchList, setBranchList] = useState([])
    const [categoryName, setcategoryName] = useState('')
    const [categoryIcon, setCategoryIcon] = useState({ bytes: '', fileName: icon })
    const [error, setError] = useState({ imgError: null })
    const [loading, setLoading] = useState(false);
    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }
    const validation = () => {
        var isError = false
        if (categoryName.length == 0) {
            setError((prev) => ({ ...prev, 'categoryName': 'pls input category Name..' }))
            isError = true
        }
        if (categoryIcon.bytes.length == 0) {
            setError((prev) => ({ ...prev, 'imgError': 'pls input category Icon..' }))
            isError = true
        }
        return isError
    }
    const handleclick = async () => {
        if (!validation()) {
            setLoading(true)
            var formData = new FormData();
            formData.append('branchid', branchId);
            formData.append('categoryname', categoryName);
            formData.append('categoryicon', categoryIcon.bytes);
            formData.append('createddate', getDate());
            formData.append('createdtime', getTime());
            formData.append('userid', 'tushar');
            var response = await postData('category/submit_category', formData);
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
        setLoading(false)

    }
    const handleimage = (e) => {
        setCategoryIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
        setError((prev) => ({ ...prev, 'imgError': '' }))
    }

    const handleReset = () => {
        setBranchId('')
        setcategoryName('')
        setCategoryIcon({
            bytes: '',
            fileName: icon
        });
    }

    useEffect(function () {
        fetchAllBranch();
    }, []);

    const fetchAllBranch = async () => {
        setLoading(true)
        var res = await getData('category/fetch_branch');
        setBranchList(res.data);
        setLoading(false)
    };

    const fillbranch = () => {
        return branchList.map((item) => {
            return <MenuItem value={item.branchid}>{item.branchname}</MenuItem>;
        });
    };

    var classes = useStyle()
    return (<>
        <LoadingOverlay open={loading} />
        <div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <div className={classes.heading}>
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 20 }}>
                                <div className={classes.subTitleStyle}>New Food Category</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={2.5}>
                        <div style={{ padding: 10 }}>
                            <FormControl size="small" fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={() => handleError('branchId', '')}><InputLabel>Branch</InputLabel><Select label='Branch' value={branchId} onChange={(e) => setBranchId(e.target.value)}><MenuItem>-Select State-</MenuItem>{fillbranch()}</Select></FormControl>
                        </div>
                        {/* <div style={{ padding: 10 }}>
                        <TextField onChange={(e) => setBranchId(e.target.value)} label='Branch Name' fullWidth value={branchId} />
                    </div> */}
                    </Grid>
                    <Grid size={2.5}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setcategoryName(e.target.value)} label='Category Name' fullWidth helperText={error?.categoryName} error={error?.categoryName} onFocus={() => handleError('categoryName', '')} value={categoryName} />
                        </div>
                    </Grid>
                    <Grid size={2}>
                        <div style={{ padding: 10 }}>
                            <Button style={{ backgroundColor: '#572445', height: '6vh' }} endIcon={<CloudUploadIcon />} variant='contained' fullWidth component='label'>Upload File
                                <input onChange={handleimage} type="file" hidden multiple />
                            </Button>
                        </div>
                    </Grid>
                    <Grid size={2}>
                        <div style={{ padding: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <img src={categoryIcon.fileName} style={{ width: 50 }} alt={categoryIcon} ></img>
                        </div>
                        <div style={{ color: 'red', fontFamily: 'Roboto,Helvetica,Arial,sans-serif', fontSize: '0.75rem', fontWeight: 400, lineHeight: '1.66rem' }}>{error?.imgError == null ? '' : error.imgError}</div>
                    </Grid>
                    <Grid size={1.5}>
                        <div style={{ padding: 10 }}>
                            <Button onClick={handleReset} variant="contained" color='error' fullWidth style={{ height: '6vh' }}>
                                Reset
                            </Button>
                        </div>
                    </Grid>
                    <Grid size={1.5}>
                        <div style={{ padding: 10 }}>
                            <Button onClick={handleclick} variant="contained" style={{ backgroundColor: '#572445', height: '6vh' }} fullWidth >
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