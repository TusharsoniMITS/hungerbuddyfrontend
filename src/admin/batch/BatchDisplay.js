import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getDate, getTime, postData, getData, serverURL } from "../../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";
import { IconButton, Dialog, DialogTitle, DialogContent, Button, Grid, TextField } from "@mui/material";
import Swal from "sweetalert2";
import icon from '../../assets/icon.png'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import EditIconComponent from "../../components/EditIconComponent";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import LoadingOverlay from "../../components/LoadingOverlay";




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

export default function BatchDisplay({ refresh, setRefresh }) {
    const classes = useStyle()
    const [batchList, setBatchList] = useState([]);
    const [open, setOpen] = useState(false)
    /*****************category view************/

    const [error, setError] = useState({ imgError: null })
    const [batchId, setBatchId] = useState('')
    const [branchId, setBranchId] = useState('')
    const [branchList, setBranchList] = useState([])
    const [session, setSession] = useState('')
    const [batchName, setBatchName] = useState('')
          const [loading, setLoading] = useState(false);
    

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

    useEffect(() => {
        fetchAllBatch()
    }, [refresh])

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

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
            setLoading(true)

            var body = {
                'batchid': batchId,
                'branchid': branchId, 'session': session,
                'batchname': batchName, 'createddate': getDate(),
                'createdtime': getTime(), 'userid': 'tushar'
            }
            var response = await postData('batch/edit_batch', body);
                        setLoading(false)
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
                fetchAllBatch()
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
    }

    const showCategoryInterface = () => {
        return (
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <div className={classes.heading}>
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 20 }}>
                                <div className={classes.subTitleStyle}>Edit Batch</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <FormControl size="small" fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={() => handleError('branchId', '')}><InputLabel>Branch</InputLabel><Select label='Branch' value={branchId} onChange={(e) => setBranchId(e.target.value)}><MenuItem>-Select State-</MenuItem>{fillbranch()}</Select></FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setBatchName(e.target.value)} label='Batch Name' fullWidth helperText={error?.batchName} error={error?.batchName} onFocus={() => handleError('batchName', '')} value={batchName} />
                        </div>
                    </Grid>
                    <Grid size={4}>
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
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <Button onClick={handleCloseDialog} variant="contained" color='error' fullWidth style={{ height: '5vh' }}>
                                Close
                            </Button>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <Button onClick={handleclick} variant="contained" style={{ backgroundColor: '#572445', height: '5vh' }} fullWidth >
                                Submit
                            </Button>
                        </div>
                    </Grid>
                </Grid>
        )
    }

    /***************************************/
    const fetchAllBatch = async () => {
        var response = await getData('batch/fetch_all_batch');
        setBatchList(response.data);
    }
    useEffect(function () {
        fetchAllBatch();
    }, []);

    const handleOpenDialog = (rowData) => {
        setBatchId(rowData.batchid)
        setBranchId(rowData.branchid)
        setBatchName(rowData.batchname)
        setSession(rowData.session)
        setOpen(true)
    }
    const handleCloseDialog = () => {
        setOpen(false)
    }

    const showDialog = () => {
        return (<div>
            <Dialog open={open}>
                <DialogTitle>
                </DialogTitle>
                <DialogContent>
                    {showCategoryInterface()}
                </DialogContent>
            </Dialog>
        </div>)
    }
    const handleDelete = async (cid) => {
            setLoading(true)
        
        Swal.fire({
            title: "Do you want to Delete the Data ?",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var response = await postData('batch/delete_batch', { batchid: cid })
                Swal.fire(response.message);
                fetchAllBatch()
            }
            else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
            setLoading(false)

    }

    const displayBatch = () => {
        return (<div>
            <MaterialTable
                title="Batch List"
                columns={[
                    { title: 'Batch Id', field: 'batchid' },
                    { title: 'Branch Name', field: 'branchname' },
                    { title: 'Batch Name', field: 'batchname' },
                    { title: 'Session', field: 'session' },
                ]}
                data={batchList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Data',
                        onClick: (event, rowData) => handleOpenDialog(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'delete Data',
                        onClick: (event, rowData) => handleDelete(rowData.batchid)
                    }
                ]}
            />
        </div>)
    };

    return (<>
    <LoadingOverlay open={loading} />
    <div className={classes.root}>
        <div className={classes.box}>
            {displayBatch()}
        </div>
        {showDialog()}
    </div></>);
}