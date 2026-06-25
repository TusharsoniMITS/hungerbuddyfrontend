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
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";




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
        height: '5vh',
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

export default function EmployeesDisplay({ refresh, setRefresh }) {
    const classes = useStyle()
    const [employeeList, setEmployeeList] = useState([]);

    const [categoryList, setCategoryList] = useState([]);
    const [open, setOpen] = useState(false)
    /*****************category view************/
    const [employeeId, setEmployeeId] = useState('')

    const [employeeName, setEmployeeName] = useState('')
    const [otherNo, setOtherNo] = useState('')
    const [department, setDepartment] = useState('')
    const [employeePicture, setEmployeePicture] = useState({ bytes: '', fileName: icon })


    const [enrollment, setEnrollment] = useState('')
    const [branchId, setBranchId] = useState('')
    const [branchList, setBranchList] = useState([])
    const [batchId, setBatchId] = useState('')
    const [batchList, setBatchList] = useState([])
    const [sectionId, setSectionId] = useState('')
    const [sectionList, setSectionList] = useState([])
    const [studentName, setStudentName] = useState('')
    const [dob, setDob] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [aadharNo, setAadharNo] = useState('')
    const [fatherNo, setFatherNo] = useState('')
    const [motherNo, setMotherNo] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [currentState, setCurrentState] = useState('')
    const [currentStateList, setCurrentStateList] = useState([])
    const [currentCity, setCurrentCity] = useState('')
    const [currentCityList, setCurrentCityList] = useState([])
    const [currentPin, setCurrentPin] = useState('')
    const [parmenentAddress, setParmenentAddress] = useState('')
    const [parmanentState, setParmanentState] = useState('')
    const [parmanentStateList, setParmanentStateList] = useState([])
    const [parmanentCity, setParmanentCity] = useState('')
    const [parmanentCityList, setParmanentCityList] = useState([])
    const [parmanentPin, setParmanentPin] = useState('')
    const [gender, setGender] = useState('')


    const [error, setError] = useState({ imgError: null })
    const [dialogState, setDialogState] = useState('')
    const [pictureStatusButton, setPictureStatusButton] = useState(false)
    const [tempPicture, setTempPicture] = useState('')

    useEffect(() => {
        fetchAllEmployee()
    }, [refresh])

    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    const validation = () => {
        var isError = false
        if (enrollment.length == 0) {
            setError((prev) => ({ ...prev, 'enrollment': 'pls input enrollment Name..' }))
            isError = true
        }
        // if (employeePicture.bytes.length == 0) {
        //   setError((prev) => ({ ...prev, 'imgError': 'pls input category Icon..' }))
        //   isError = true
        // }
        return isError
    }
    const handleclick = async () => {
        var body = {
            'employeeid': employeeId,
            'employeename': employeeName,
            'branchid': branchId,
            'dob': dob.split('T')[0],
            'gender': gender,
            'emailid': emailId,
            'mobileno': mobileNo,
            'otherno': otherNo,
            'department': department,
            'current_address': currentAddress,
            'current_state': currentState,
            'current_city': currentCity,
            'current_pincode': currentPin,
            'parmanent_address': parmenentAddress,
            'parmanent_state': parmanentState,
            'parmanent_city': parmanentCity,
            'parmanent_pincode': parmanentPin,
            'aadharno': aadharNo,
            'createddate': getDate(),
            'createdtime': getTime(),
            'userid': 'tushar'
        };
        var response = await postData('employee/edit_employee', body);
        if (response.status) {
            Swal.fire({
                position: 'center',
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 2000,
                toast: true
            });

            setOpen(false);
            fetchAllEmployee();

        } else {

            Swal.fire({
                position: 'center',
                icon: "error",
                title: response.message,
                showConfirmButton: false,
                timer: 2000,
                toast: true
            });

        }
    }

    const handleimage = (e) => {
        setEmployeePicture((prev) => ({ ...prev, bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) }))
        setError((prev) => ({ ...prev, 'imgError': '' }))
        setPictureStatusButton(true)
    }

    const handleCancel = () => {
        setEmployeePicture({ fileName: tempPicture, bytes: '' })
        setPictureStatusButton(false)
    }

    const handleEditPicture = async () => {
        var formData = new FormData();
        formData.append('employeeid', employeeId);
        formData.append('employee_picture', employeePicture.bytes);
        formData.append('createddate', getDate());
        formData.append('createdtime', getTime());
        formData.append('userid', 'tushar');

        var response = await postData('employee/edit_picture_employee', formData);

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
            fetchAllEmployee();

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

    useEffect(function () {
        fetchAllBranch();
    }, []);

    const fetchAllBranch = async () => {
        var res = await getData('student/fetch_branch');
        setBranchList(res.data);
    };

    const fillbranch = () => {
        return branchList.map((item) => {
            return <MenuItem value={item.branchid}>{item.branchname}</MenuItem>;
        });
    };


    /********************* current state or city fetch*********/
    const fetchAllCurrentState = async () => {
        var res = await getData('statecity/fetch_state')
        setCurrentStateList(res.data)
    }

    useEffect(function () {
        fetchAllCurrentState()
    }, [])

    const fillCurrentState = () => {
        return currentStateList.map((item) => {
            return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
        })
    }
    const handleCurrentStateChange = (e) => {
        setCurrentState(e.target.value)
        fetchAllCurrentCity(e.target.value)
    }

    const fetchAllCurrentCity = async (sid) => {
        var res = await postData('statecity/fetch_cities', { 'stateid': sid })
        setCurrentCityList(res.data)
    }

    const fillCurrentCity = () => {
        return currentCityList.map((item) => {
            return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
        })
    }
    /*************************************************/

    /************** parmanent state and city fetch ******/
    const fetchAllParmanentState = async () => {
        var res = await getData('statecity/fetch_state')
        setParmanentStateList(res.data)
    }

    useEffect(function () {
        fetchAllParmanentState()
    }, [])

    const fillParmanentState = () => {
        return parmanentStateList.map((item) => {
            return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
        })
    }
    const handleParmanentStateChange = (e) => {
        setParmanentState(e.target.value)
        fetchAllParmanentCity(e.target.value)
    }

    const fetchAllParmanentCity = async (sid) => {
        var res = await postData('statecity/fetch_cities', { 'stateid': sid })
        setParmanentCityList(res.data)
    }

    const fillParmanentCity = () => {
        return parmanentCityList.map((item) => {
            return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
        })
    }
    /**************************************************/


    const showPictureInterface = () => {
        return (<div style={{ display: "flex", justifyContent: "center", padding: 0 }}>
            <Grid container spacing={0.5}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 10 }}>
                            <div className={classes.subTitleStyle}>Edit Student Picture</div>
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
                            src={employeePicture.fileName}
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

    const showEmployeeInterface = () => {
        return (
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 20 }}>
                            <div className={classes.subTitleStyle}>Edit Employees</div>
                        </div>
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={() => handleError('branchId', '')}><InputLabel>Branch</InputLabel><Select label='Branch' value={branchId} onChange={(e) => setBranchId(e.target.value)}><MenuItem>-Select Branch-</MenuItem>{fillbranch()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setEmployeeName(e.target.value)} label='Employee Name' fullWidth helperText={error?.employeeName} error={error?.employeeName} onFocus={() => handleError('employeeName', '')} value={employeeName} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setDob(e.target.value)} placeholder="YY/MM/DD" label='Date of Birth' fullWidth helperText={error?.dob} error={error?.dob} onFocus={() => handleError('dob', '')} value={dob} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                        <FormControl size="small">
                            <FormLabel typeof="legend" id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup value={gender} row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={(e) => setGender(e.target.value)} >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setEmailId(e.target.value)} label='Email Id' fullWidth helperText={error?.emailId} error={error?.emailId} onFocus={() => handleError('emailId', '')} value={emailId} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setMobileNo(e.target.value)} label='Mobile No' fullWidth helperText={error?.mobileNo} error={error?.mobileNo} onFocus={() => handleError('mobileNo', '')} value={mobileNo} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setOtherNo(e.target.value)} label='Other Contact No' fullWidth helperText={error?.otherNo} error={error?.otherNo} onFocus={() => handleError('otherNo', '')} value={otherNo} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.fdepartment} error={error?.department} onFocus={() => handleError("department", null)}>
                            <InputLabel>Department</InputLabel>
                            <Select
                                label="Department"
                                onChange={(e) => setDepartment(e.target.value)}
                                value={department}
                            >
                                <MenuItem>-Select Department-</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Faculty">Faculty</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setCurrentAddress(e.target.value)} label='Current Address' fullWidth helperText={error?.currentAddress} error={error?.currentAddress} onFocus={() => handleError('currentAddress', '')} value={currentAddress} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.currentState} error={error?.currentState} onFocus={() => handleError('currentState', '')}><InputLabel>Current State</InputLabel><Select label='Current state' value={currentState} onChange={handleCurrentStateChange}><MenuItem>-Select State-</MenuItem>{fillCurrentState()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.currentCity} error={error?.currentCity} onFocus={() => handleError('currentCity', '')}><InputLabel>Current City</InputLabel><Select label='Current city' value={currentCity} onChange={(e) => setCurrentCity(e.target.value)}><MenuItem>-Select City-</MenuItem>{fillCurrentCity()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setCurrentPin(e.target.value)} label='Current Pincode' fullWidth helperText={error?.currentPin} error={error?.currentPin} onFocus={() => handleError('currentPin', '')} value={currentPin} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setParmenentAddress(e.target.value)} label='Parmanent Address' fullWidth helperText={error?.parmenentAddress} error={error?.parmenentAddress} onFocus={() => handleError('parmenentAddress', '')} value={parmenentAddress} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.parmanentState} error={error?.parmanentState} onFocus={() => handleError('parmanentState', '')}><InputLabel>Parmanent State</InputLabel><Select label='Parmanent state' value={parmanentState} onChange={handleParmanentStateChange}><MenuItem>-Select State-</MenuItem>{fillParmanentState()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.parmanentCity} error={error?.parmanentCity} onFocus={() => handleError('parmanentCity', '')}><InputLabel>Parmanent City</InputLabel><Select label='Parmanent city' value={parmanentCity} onChange={(e) => setParmanentCity(e.target.value)}><MenuItem>-Select City-</MenuItem>{fillParmanentCity()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setParmanentPin(e.target.value)} label='Parmanent Pincode' fullWidth helperText={error?.parmanentPin} error={error?.parmanentPin} onFocus={() => handleError('parmanentPin', '')} value={parmanentPin} />
                    </div>
                </Grid>
                <Grid size={3}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setAadharNo(e.target.value)} label='Aadhar No' fullWidth helperText={error?.aadharNo} error={error?.aadharNo} onFocus={() => handleError('aadharNo', '')} value={aadharNo} />
                    </div>
                </Grid>
                <Grid size={4}>
                    <div style={{ padding: 10 }}>
                        <Button onClick={handleCloseDialog} variant="contained" color='error' fullWidth style={{ height: '5vh' }}>
                            Close
                        </Button>
                    </div>
                </Grid>
                <Grid size={4}>
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
    const fetchAllEmployee = async () => {
        var response = await getData('employee/fetch_all_employee');
        setEmployeeList(response.data);
    }
    useEffect(function () {
        fetchAllEmployee();
    }, []);

    const handleOpenDialog = async (rowData, status) => {

        setDialogState(status)
        await fetchAllCurrentCity(rowData.current_state)
        await fetchAllParmanentCity(rowData.parmanent_state)

        setEmployeeId(rowData.employeeid)
        setEmployeeName(rowData.employeename)
        setBranchId(rowData.branchid)
        setDob(rowData.dob)
        setGender(rowData.gender)

        setEmailId(rowData.emailid)
        setMobileNo(rowData.mobileno)
        setOtherNo(rowData.otherno)
        setDepartment(rowData.department)
        setAadharNo(rowData.aadharno)
        setCurrentAddress(rowData.current_address)
        setCurrentState(rowData.current_state)
        setCurrentCity(rowData.current_city)
        setCurrentPin(rowData.current_pincode)

        setParmenentAddress(rowData.parmanent_address)
        setParmanentState(rowData.parmanent_state)
        setParmanentCity(rowData.parmanent_city)
        setParmanentPin(rowData.parmanent_pincode)

        setEmployeePicture({
            fileName: `${serverURL}/images/${rowData.employee_picture}`,
            bytes: ''
        })

        setTempPicture(
            `${serverURL}/images/${rowData.employee_picture}`
        )

        setOpen(true)
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
                    {dialogState == 'Data' ? showEmployeeInterface() : showPictureInterface()}
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
                var response = await postData('employee/delete_employee', { employeeid: cid })
                Swal.fire(response.message);
                fetchAllEmployee()
            }
            else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const displayStudent = () => {
        return (<div>
            <MaterialTable
                title="Employees List"
                columns={[
                    { title: 'Branch Name', field: 'branchname' },
                    { title: 'Employe Name', field: 'employeename' },
                    { title: 'D.O.B', render: (rowData) => (rowData.dob.split('T')[0]) },
                    { title: 'Gender', field: 'gender' },
                    { title: 'Email ID', field: 'emailid' },
                    { title: 'Mobile No', field: 'mobileno' },
                    { title: 'Other No', field: 'otherno' },
                    { title: 'Department', field: 'department' },
                    { title: 'Current Address', field: 'current_address' },
                    { title: 'Current State', field: 'current_state' },
                    { title: 'Current City', field: 'current_city' },
                    { title: 'Current Pincode', field: 'current_pincode' },
                    { title: 'Parmanent Address', field: 'parmanent_address' },
                    { title: 'Parmanent State', field: 'parmanent_state' },
                    { title: 'Parmanent City', field: 'parmanent_city' },
                    { title: 'Parmanent Pincode', field: 'parmanent_pincode' },
                    { title: 'Aadhar No', field: 'aadharno' },
                    { title: 'Picture', render: (rowData) => (<div onClick={() => handleOpenDialog(rowData, 'picture')}><EditIconComponent image={rowData.employee_picture} /></div>) },
                ]}
                data={employeeList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Data',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'Data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'delete Data',
                        onClick: (event, rowData) => handleDelete(rowData.employeeid)
                    }
                ]}
            />
        </div>)
    };

    return (<div className={classes.root}>
        <div className={classes.box}>
            {displayStudent()}
        </div>
        {showDialog()}
    </div>);
}