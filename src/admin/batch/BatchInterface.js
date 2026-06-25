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
export default function BatchInterface({ refresh, setRefresh }) {
    const [branchId, setBranchId] = useState('')
    const [branchList, setBranchList] = useState([])
    const [session, setSession] = useState('')
    const [batchName, setBatchName] = useState('')

    const [error, setError] = useState({ imgError: null })
    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    useEffect(function () {
        fetchAllBranch();
    }, []);

    const fetchAllBranch = async () => {
        var res = await getData('batch/fetch_branch');
        setBranchList(res.data);
    };

    const fillbranch = () => {
        return branchList.map((item) => {
            return <MenuItem value={item.branchid}>{item.branchname}</MenuItem>;
        });
    };

    const validation = () => {
        var isError = false
        if (branchId.length == 0) {
            setError((prev) => ({ ...prev, 'branchId': 'pls input Branch Id..' }))
            isError = true
        }
        if (session.length == 0) {
            setError((prev) => ({ ...prev, 'session': 'pls input session Name..' }))
            isError = true
        }
        if (batchName.length == 0) {
            setError((prev) => ({ ...prev, 'batchName': 'pls input Batch Name..' }))
            isError = true
        }
        return isError
    }
    const handleclick = async () => {
        if (!validation()) {
            var body = {
                'branchid': branchId, 'session': session,
                'batchname': batchName, 'createddate': getDate(),
                'createdtime': getTime(), 'userid': 'tushar'
            }
            var response = await postData('batch/submit_batch', body);
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

    const handleReset = () => {
        setBranchId('')
        setBatchName('')
        setSession('')
    }

    var classes = useStyle()
    return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 20 }}>
                            <div className={classes.subTitleStyle}>New Batch</div>
                        </div>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={() => handleError('branchId', '')}><InputLabel>Branch</InputLabel><Select label='Branch' value={branchId} onChange={(e) => setBranchId(e.target.value)}><MenuItem>-Select State-</MenuItem>{fillbranch()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setBatchName(e.target.value)} label='Batch Name' fullWidth helperText={error?.batchName} error={error?.batchName} onFocus={() => handleError('batchName', '')} value={batchName} />
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <FormControl
                            size="small"
                            fullWidth
                            helperText={error?.session}
                            error={error?.session}
                            onFocus={() => handleError("session", null)}
                        >
                            <InputLabel>Session</InputLabel>
                            <Select
                                label="Session"
                                onChange={(e) => setSession(e.target.value)}
                                value={session}
                            >
                                <MenuItem>-Select Session-</MenuItem>
                                <MenuItem value="2023">2023</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                                <MenuItem value="2025">2025</MenuItem>
                                <MenuItem value="2026">2026</MenuItem>
                                <MenuItem value="2027">2027</MenuItem>
                                <MenuItem value="2028">2028</MenuItem>
                                <MenuItem value="2029">2029</MenuItem>
                                <MenuItem value="2030">2030</MenuItem>
                                <MenuItem value="2031">2031</MenuItem>
                            </Select>
                        </FormControl>
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
    </div>)
}