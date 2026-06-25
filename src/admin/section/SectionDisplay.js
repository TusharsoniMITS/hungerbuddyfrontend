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

export default function SectionDisplay({ refresh, setRefresh }) {
    const classes = useStyle()
    const [sectionList, setSectionList] = useState([]);
    const [open, setOpen] = useState(false)
    /*****************category view************/

    const [error, setError] = useState({ imgError: null })
    const [branchId, setBranchId] = useState('')
    const [branchList, setBranchList] = useState([])
    const [batchId, setBatchId] = useState('')
    const [batchList, setBatchList] = useState([])
    const [sectionName, sectSectionName] = useState('')
    const [sectionId, setSectionId] = useState('')


    useEffect(() => {
        fetchAllSection()
    }, [refresh])

    useEffect(() => {
        fetchAllBranch();
        fetchAllBatch();
    }, []);

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    const validation = () => {
        var isError = false
        if (branchId.length == 0) {
            setError((prev) => ({ ...prev, 'branchId': 'pls input Branch Id..' }))
            isError = true
        }
        if (batchId.length == 0) {
            setError((prev) => ({ ...prev, 'batchId': 'pls input session Name..' }))
            isError = true
        }
        if (sectionName.length == 0) {
            setError((prev) => ({ ...prev, 'sectionName': 'pls input Batch Name..' }))
            isError = true
        }
        return isError
    }
    const handleclick = async () => {
        if (!validation()) {
            var body = {
                'sectionid': sectionId,
                'branchid': branchId, 'batchid': batchId,
                'sectionname': sectionName, 'createddate': getDate(),
                'createdtime': getTime(), 'userid': 'tushar'
            }
            var response = await postData('section/edit_section', body);
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
                fetchAllSection()
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

    const showSectionInterface = () => {
        return (
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 20 }}>
                            <div className={classes.subTitleStyle}>Edit Section</div>
                        </div>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={() => handleError('branchId', '')}><InputLabel>Branch</InputLabel><Select label='Branch' value={branchId} onChange={(e) => setBranchId(e.target.value)}><MenuItem >-Select Branch-</MenuItem>{fillbranch()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.batchId} error={error?.batchId} onFocus={() => handleError('batchid', '')}><InputLabel>Batch</InputLabel><Select label='batch' value={batchId} onChange={(e) => setBatchId(e.target.value)}><MenuItem >-Select Batch-</MenuItem>{fillbatch()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => sectSectionName(e.target.value)} label='Section Name' fullWidth helperText={error?.sectionName} error={error?.sectionName} onFocus={() => handleError('sectionName', '')} value={sectionName} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <Button onClick={handleCloseDialog} variant="contained" color='error' fullWidth style={{ height: '5vh' }}>
                            Close
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
        )
    }

    /***************************************/
    const fetchAllSection = async () => {
        var response = await getData('section/fetch_all_section');
        setSectionList(response.data);
    }
    useEffect(function () {
        fetchAllSection();
    }, []);

    const handleOpenDialog = (rowData) => {
        setSectionId(rowData.sectionid)
        setBranchId(rowData.branchid)
        setBatchId(rowData.batchid)
        sectSectionName(rowData.sectionname)
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
                    {showSectionInterface()}
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
                var response = await postData('section/delete_section', { sectionid: cid })
                Swal.fire(response.message);
                fetchAllSection()
            }
            else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const displayBatch = () => {
        return (<div>
            <MaterialTable
                title="Section List"
                columns={[
                    { title: 'Section Id', field: 'sectionid' },
                    { title: 'Branch Name', field: 'branchname' },
                    { title: 'Batch Name', field: 'batchname' },
                    { title: 'Section Name', field: 'sectionname' },
                ]}
                data={sectionList}
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

    return (<div className={classes.root}>
        <div className={classes.box}>
            {displayBatch()}
        </div>
        {showDialog()}
    </div>);
}