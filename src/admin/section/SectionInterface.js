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
export default function SectionInterface({ refresh, setRefresh }) {
    const [branchId, setBranchId] = useState('')
    const [branchList, setBranchList] = useState([])
    const [batchId, setBatchId] = useState('')
    const [batchList, setBatchList] = useState([])
    const [sectionName, sectSectionName] = useState('')
              const [loading, setLoading] = useState(false);

    const [error, setError] = useState({ imgError: null })
    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    useEffect(function () {
        fetchAllBranch();
        fetchAllBatch();
    }, []);

    const fetchAllBranch = async () => {
        var res = await getData('section/fetch_branch');
        setBranchList(res.data);
    };

    const fillbranch = () => {
        return branchList.map((item) => {
            return <MenuItem value={item.branchid}>{item.branchname}</MenuItem>;
        });
    };

    const fetchAllBatch = async () => {
        var res = await getData('section/fetch_batch');
        setBatchList(res.data);
    };

    const fillbatch = () => {
        return batchList.map((item) => {
            return <MenuItem value={item.batchid}>{item.batchname}</MenuItem>;
        });
    };

    const validation = () => {
        var isError = false
        if (branchId.length == 0) {
            setError((prev) => ({ ...prev, 'branchId': 'pls input Branch..' }))
            isError = true
        }
        if (batchId.length == 0) {
            setError((prev) => ({ ...prev, 'batchId': 'pls input batch..' }))
            isError = true
        }
        if (sectionName.length == 0) {
            setError((prev) => ({ ...prev, 'sectionName': 'pls input section Name..' }))
            isError = true
        }
        return isError
    }
    const handleclick = async () => {
        if (!validation()) {
            setLoading(true)
            var body = {
                'branchid': branchId, 'batchid': batchId,
                'sectionname': sectionName, 'createddate': getDate(),
                'createdtime': getTime(), 'userid': 'tushar'
            }
            var response = await postData('section/submit_section', body);
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
            setLoading(false)
        handleReset()
        setRefresh(!refresh)

    }

    const handleReset = () => {
        setBranchId('')
        setBatchId('')
        sectSectionName('')
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
                            <div className={classes.subTitleStyle}>New Section</div>
                        </div>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={() => handleError('branchId', '')}><InputLabel>Branch</InputLabel><Select label='Branch' value={branchId} onChange={(e) => setBranchId(e.target.value)}><MenuItem>-Select Branch-</MenuItem>{fillbranch()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.batchId} error={error?.batchId} onFocus={() => handleError('batchid', '')}><InputLabel>Batch</InputLabel><Select label='batch' value={batchId} onChange={(e) => setBatchId(e.target.value)}><MenuItem>-Select Batch-</MenuItem>{fillbatch()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => sectSectionName(e.target.value)} label='Section Name' fullWidth helperText={error?.sectionName} error={error?.sectionName} onFocus={() => handleError('sectionName', '')} value={sectionName} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <Button onClick={handleReset} variant="contained" color='error' fullWidth style={{ height: '5vh' }}>
                            Reset
                        </Button>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <Button onClick={handleclick} variant="contained" style={{ backgroundColor: '#572445', height: '5vh' }} fullWidth >
                            Submit
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    </div></>)
}