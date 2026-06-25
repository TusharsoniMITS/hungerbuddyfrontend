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
import { FormControl,InputLabel,Select,MenuItem } from "@mui/material";



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

export default function BranchDisplay({ refresh, setRefresh }) {
    const classes = useStyle()
    const [branchList, setBranchList] = useState([]);

    const [open, setOpen] = useState(false)
    /*****************category view************/

    const [branchId, setBranchId] = useState('')

    const [branchName, setBranchName] = useState('')
    const [address, setAddress] = useState('')
    const [latlong, setLatlong] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [emailId, setEmailId] = useState('')
    const [contact, setContact] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [error, setError] = useState({ imgError: null })

    /******state city*********/

    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])

    const fetchAllState = async () => {
        var res = await getData('statecity/fetch_state')
        setStateList(res.data)
    }

    useEffect(function () {
        fetchAllState()
    }, [])

    const fillState = () => {
        return stateList.map((item) => {
            return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
        })
    }

    const handleStateChange = (e) => {
        setState(e.target.value)
        fetchAllCity(e.target.value)
    }

    const fetchAllCity = async (sid) => {
        var res = await postData('statecity/fetch_cities', { 'stateid': sid })
        setCityList(res.data)
    }

    const fillCity = () => {
        return cityList.map((item) => {
            return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
        })
    }

    /*************************/

    useEffect(() => {
        fetchAllBranch()
    }, [refresh])

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    const validation = () => {
        var isError = false
        // if (branchname.length == 0) {
        //     setError((prev) => ({ ...prev, 'branchname': 'pls input branch Name..' }))
        //     isError = true
        // }
        // if (categoryIcon.bytes.length == 0) {
        //   setError((prev) => ({ ...prev, 'imgError': 'pls input category Icon..' }))
        //   isError = true
        // }
        return isError
    }
    const handleclick = async () => {
        if (!validation()) {
            var body = {
                'branchid': branchId,
                'branchname': branchName, 'address': address,
                'latlong': latlong, 'stateid': state,
                'cityid': city, 'emailid': emailId,
                'contactnumber': contact, 'contactperson': contactPerson,
                'createddate': getDate(), 'createdtime': getTime(),
                'userid': 'tushar'
            }
            var response = await postData('branch/edit_branch', body);
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
        setOpen(false)
        fetchAllBranch()
        setRefresh(!refresh)
    }

    const showBranchInterface = () => {
        return (<div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <div className={classes.heading}>
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 20 }}>
                                <div className={classes.subTitleStyle}>New Food Category</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <TextField onChange={(e) => setBranchName(e.target.value)} label='Branch Name' fullWidth value={branchName} helperText={error?.branchName} error={error?.branchName} onFocus={() => handleError('branchName', '')} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <TextField onChange={(e) => setAddress(e.target.value)} label='Address' fullWidth value={address} helperText={error?.address} error={error?.address} onFocus={() => handleError('address', '')} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <TextField onChange={(e) => setLatlong(e.target.value)} label='Latlong' fullWidth value={latlong} helperText={error?.latlong} error={error?.latlong} onFocus={() => handleError('latlong', '')} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <FormControl fullWidth><InputLabel>State</InputLabel><Select label='state' value={state} onChange={handleStateChange}><MenuItem>-Select State-</MenuItem>{fillState()}</Select></FormControl>
                            {/*<TextField onChange={(e) => setState(e.target.value)} label='State' fullWidth value={state} helperText={error?.state} error={error?.state} onFocus={() => handleError('state', '')}/>*/}
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <FormControl fullWidth><InputLabel>City</InputLabel><Select label='City' value={city} onChange={(e) => setCity(e.target.value)}><MenuItem>-Select City-</MenuItem>{fillCity()}</Select></FormControl>

                            {/*<TextField onChange={(e) => setCity(e.target.value)} label='City' fullWidth value={city} helperText={error?.city} error={error?.city} onFocus={() => handleError('city', '')}/>*/}
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <TextField onChange={(e) => setEmailId(e.target.value)} label='EmailId' fullWidth value={emailId} helperText={error?.emailId} error={error?.emailId} onFocus={() => handleError('emailId', '')} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <TextField onChange={(e) => setContact(e.target.value)} label='Contact Number' fullWidth value={contact} helperText={error?.contact} error={error?.contact} onFocus={() => handleError('contact', '')} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <TextField onChange={(e) => setContactPerson(e.target.value)} label='Contact Person' fullWidth value={contactPerson} helperText={error?.contactPerson} error={error?.contactPerson} onFocus={() => handleError('contactPerson', '')} />
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <Button onClick={handleCloseDialog} variant="contained" color='error' fullWidth >
                                Close
                            </Button>
                        </div>
                    </Grid>
                    <Grid size={6}>
                        <div style={{ padding: 10 }}>
                            <Button onClick={handleclick} variant="contained" style={{ backgroundColor: '#572445' }} fullWidth >
                                Submit
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>)
    }

    /***************************************/
    const fetchAllBranch = async () => {
        var response = await getData('branch/fetch_all_branch');
        setBranchList(response.data);
    }
    useEffect(function () {
        fetchAllBranch();
    }, []);

    const handleOpenDialog = (rowData) => {
        fetchAllCity(rowData.stateid)
        setBranchId(rowData.branchid)
        setBranchName(rowData.branchname)
        setAddress(rowData.address)
        setLatlong(rowData.latlong)
        setEmailId(rowData.emailid)
        setState(rowData.stateid)
        setCity(rowData.cityid)
        setContact(rowData.contactnumber)
        setContactPerson(rowData.contactperson)
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
                    {showBranchInterface()}
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
                var response = await postData('branch/delete_branch', { branchid: cid })
                Swal.fire(response.message);
                fetchAllBranch()
            }
            else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const displayBranch = () => {
        return (<div>
            <MaterialTable
                title="Branch List"
                columns={[
                    { title: 'branch Id', field: 'branchid' },
                    { title: 'branchname', field: 'branchname' },
                    { title: 'address', field: 'address' },
                    { title: 'latlong', field: 'latlong' },
                    { title: 'stateid', field: 'statename' },
                    { title: 'cityid', field: 'cityname' },
                    { title: 'emailid', field: 'emailid' },
                    { title: 'contactnumber', field: 'contactnumber' },
                    { title: 'contactperson', field: 'contactperson' },
                ]}
                data={branchList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Data',
                        onClick: (event, rowData) => handleOpenDialog(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'delete Data',
                        onClick: (event, rowData) => handleDelete(rowData.branchid)
                    }
                ]}
            />
        </div>)
    };
    return (<div className={classes.root}>
        <div className={classes.box}>
            {displayBranch()}
        </div>
        {showDialog()}
    </div>);
}