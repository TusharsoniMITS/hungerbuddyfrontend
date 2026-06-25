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

export default function StudentDisplay({ refresh, setRefresh }) {
    const classes = useStyle()
    const [studentList, setStudentList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [open, setOpen] = useState(false)
    /*****************category view************/
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
    const [studentPicture, setStudentPicture] = useState({ bytes: '', fileName: icon })


    const [error, setError] = useState({ imgError: null })
    const [dialogState, setDialogState] = useState('')
    const [pictureStatusButton, setPictureStatusButton] = useState(false)
    const [tempPicture, setTempPicture] = useState('')

    useEffect(() => {
        fetchAllStudent()
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
        // if (studentPicture.bytes.length == 0) {
        //   setError((prev) => ({ ...prev, 'imgError': 'pls input category Icon..' }))
        //   isError = true
        // }
        return isError
    }
    const handleclick = async () => {
        if (!validation()) {
            var body = {
                'enrollmentno': enrollment, 'branchid': branchId,
                'batchid': batchId,
                'sectionid': sectionId,
                'studentname': studentName,
                'dob': dob.split('T')[0],
                'gender': gender,
                'fathername': fatherName,
                'mothername': motherName,
                'emailid': emailId,
                'mobileno': mobileNo,
                'fathercontactno': fatherNo,
                'mothercontactno': motherNo,
                'current_address': currentAddress,
                'current_state': currentState,
                'current_city': currentCity,
                'current_pincode': currentPin,
                'permanent_address': parmenentAddress,
                'parmanent_state': parmanentState,
                'parmanent_city': parmanentCity,
                'parmanent_pincode': parmanentPin,
                'addharno': aadharNo,
                'createddate': getDate(),
                'createdtime': getTime(),
                'userid': 'tushar',
            }
            var response = await postData('student/edit_student', body);
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
                fetchAllStudent()
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
    const handleimage = (e) => {
        setStudentPicture((prev) => ({ ...prev, bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) }))
        setError((prev) => ({ ...prev, 'imgError': '' }))
        setPictureStatusButton(true)
    }

    const handleCancel = () => {
        setStudentPicture({ fileName: tempPicture, bytes: '' })
        setPictureStatusButton(false)
    }

    const handleEditPicture = async () => {
        var formData = new FormData();
        formData.append('enrollmentno', enrollment);
        formData.append('student_picture', studentPicture.bytes);
        formData.append('createddate', getDate());
        formData.append('createdtime', getTime());
        formData.append('userid', 'tushar');

        var response = await postData('student/edit_picture_student', formData);

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
            fetchAllStudent();

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
        fetchAllBatch();
        fetchAllSection()
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

    const fetchAllBatch = async () => {
        var res = await getData('student/fetch_batch');
        setBatchList(res.data);
    };

    const fillbatch = () => {
        return batchList.map((item) => {
            return <MenuItem value={item.batchid}>{item.batchname}</MenuItem>;
        });
    };

    const fetchAllSection = async () => {
        var res = await getData('student/fetch_section');
        setSectionList(res.data);
    };

    const fillsection = () => {
        return sectionList.map((item) => {
            return <MenuItem value={item.sectionid}>{item.sectionname}</MenuItem>;
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
                            src={studentPicture.fileName}
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

    const showStudentInterface = () => {
        return (<div className={classes.root}>
            <div className={classes.box}>
                <Grid container spacing={1}>
                    <Grid size={12}>
                        <div className={classes.heading}>
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 20 }}>
                                <div className={classes.subTitleStyle}>Edit Student</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setEnrollment(e.target.value)} label='Enrollment Number' fullWidth helperText={error?.enrollment} error={error?.enrollment} onFocus={() => handleError('enrollment', '')} value={enrollment} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <FormControl size="small" fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={() => handleError('branchId', '')}><InputLabel>Branch</InputLabel><Select label='Branch' value={branchId} onChange={(e) => setBranchId(e.target.value)}><MenuItem>-Select Branch-</MenuItem>{fillbranch()}</Select></FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <FormControl size="small" fullWidth helperText={error?.batchId} error={error?.batchId} onFocus={() => handleError('batchid', '')}><InputLabel>Batch</InputLabel><Select label='batch' value={batchId} onChange={(e) => setBatchId(e.target.value)}><MenuItem>-Select Batch-</MenuItem>{fillbatch()}</Select></FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <FormControl size="small" fullWidth helperText={error?.sectionId} error={error?.sectionId} onFocus={() => handleError('sectionId', '')}><InputLabel>Section</InputLabel><Select label='Section' value={sectionId} onChange={(e) => setSectionId(e.target.value)}><MenuItem>-Select Section-</MenuItem>{fillsection()}</Select></FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setStudentName(e.target.value)} label='Student Name' fullWidth helperText={error?.studentName} error={error?.studentName} onFocus={() => handleError('studentName', '')} value={studentName} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setDob(e.target.value)} placeholder="YY/MM/DD" label='D.O.B' fullWidth helperText={error?.dob} error={error?.dob} onFocus={() => handleError('dob', '')} value={dob.split('T')[0]} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: "0px 5px 0px 5px" }}>
                            <FormControl size="small">
                                <FormLabel typeof="legend" id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={(e) => setGender(e.target.value)}  value={gender}>
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setFatherName(e.target.value)} label='Father Name' fullWidth helperText={error?.fatherName} error={error?.fatherName} onFocus={() => handleError('fatherName', '')} value={fatherName} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setMotherName(e.target.value)} label='Mother Name' fullWidth helperText={error?.motherName} error={error?.motherName} onFocus={() => handleError('motherName', '')} value={motherName} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setEmailId(e.target.value)} label='Email Id' fullWidth helperText={error?.emailId} error={error?.emailId} onFocus={() => handleError('emailId', '')} value={emailId} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setMobileNo(e.target.value)} label='Mobile No' fullWidth helperText={error?.mobileNo} error={error?.mobileNo} onFocus={() => handleError('mobileNo', '')} value={mobileNo} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setAadharNo(e.target.value)} label='Aadhar No' fullWidth helperText={error?.aadharNo} error={error?.aadharNo} onFocus={() => handleError('aadharNo', '')} value={aadharNo} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setFatherNo(e.target.value)} label='Father contact No' fullWidth helperText={error?.fatherNo} error={error?.fatherNo} onFocus={() => handleError('fatherNo', '')} value={fatherNo} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setMotherNo(e.target.value)} label='Mother contact No' fullWidth helperText={error?.motherNo} error={error?.motherNo} onFocus={() => handleError('motherNo', '')} value={motherNo} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setCurrentAddress(e.target.value)} label='Current Address' fullWidth helperText={error?.currentAddress} error={error?.currentAddress} onFocus={() => handleError('currentAddress', '')} value={currentAddress} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <FormControl size="small" fullWidth helperText={error?.currentState} error={error?.currentState} onFocus={() => handleError('currentState', '')}><InputLabel>Current State</InputLabel><Select label='Current state' value={currentState} onChange={handleCurrentStateChange}><MenuItem>-Select State-</MenuItem>{fillCurrentState()}</Select></FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <FormControl size="small" fullWidth helperText={error?.currentCity} error={error?.currentCity} onFocus={() => handleError('currentCity', '')}><InputLabel>Current City</InputLabel><Select label='Current city' value={currentCity} onChange={(e) => setCurrentCity(e.target.value)}><MenuItem>-Select City-</MenuItem>{fillCurrentCity()}</Select></FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setCurrentPin(e.target.value)} label='Current Pincode' fullWidth helperText={error?.currentPin} error={error?.currentPin} onFocus={() => handleError('currentPin', '')} value={currentPin} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setParmenentAddress(e.target.value)} label='Parmanent Address' fullWidth helperText={error?.parmenentAddress} error={error?.parmenentAddress} onFocus={() => handleError('parmenentAddress', '')} value={parmenentAddress} />
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <FormControl size="small" fullWidth helperText={error?.parmanentState} error={error?.parmanentState} onFocus={() => handleError('parmanentState', '')}><InputLabel>Parmanent State</InputLabel><Select label='Parmanent state' value={parmanentState} onChange={handleParmanentStateChange}><MenuItem>-Select State-</MenuItem>{fillParmanentState()}</Select></FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <FormControl size="small" fullWidth helperText={error?.parmanentCity} error={error?.parmanentCity} onFocus={() => handleError('parmanentCity', '')}><InputLabel>Parmanent City</InputLabel><Select label='Parmanent city' value={parmanentCity} onChange={(e) => setParmanentCity(e.target.value)}><MenuItem>-Select City-</MenuItem>{fillParmanentCity()}</Select></FormControl>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div style={{ padding: 10 }}>
                            <TextField size="small" onChange={(e) => setParmanentPin(e.target.value)} label='Parmanent Pincode' fullWidth helperText={error?.parmanentPin} error={error?.parmanentPin} onFocus={() => handleError('parmanentPin', '')} value={parmanentPin} />
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
            </div>
        </div>)
    }

    /***************************************/
    const fetchAllStudent = async () => {
        var response = await getData('student/fetch_all_student');
        setStudentList(response.data);
    }
    useEffect(function () {
        fetchAllStudent();
    }, []);

    const handleOpenDialog = async (rowData, status) => {

        setDialogState(status)


    await fetchAllCurrentCity(rowData.current_state)
    await fetchAllParmanentCity(rowData.parmanent_state)

        setEnrollment(rowData.enrollmentno)
        setBranchId(rowData.branchid)
        setBatchId(rowData.batchid)
        setSectionId(rowData.sectionid)

        setStudentName(rowData.studentname)
        setDob(rowData.dob)
        setGender(rowData.gender)

        setFatherName(rowData.fathername)
        setMotherName(rowData.mothername)

        setEmailId(rowData.emailid)
        setMobileNo(rowData.mobileno)
        setAadharNo(rowData.addharno)

        setFatherNo(rowData.fathercontactno)
        setMotherNo(rowData.mothercontactno)

        setCurrentAddress(rowData.current_address)
        setCurrentState(rowData.current_state)
        setCurrentCity(rowData.current_city)
        setCurrentPin(rowData.current_pincode)

        setParmenentAddress(rowData.permanent_address)
        setParmanentState(rowData.parmanent_state)
        setParmanentCity(rowData.parmanent_city)
        setParmanentPin(rowData.parmanent_pincode)

        setStudentPicture({
            fileName: `${serverURL}/images/${rowData.student_picture}`,
            bytes: ''
        })

        setTempPicture(
            `${serverURL}/images/${rowData.student_picture}`
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
                    {dialogState == 'Data' ? showStudentInterface() : showPictureInterface()}
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
                var response = await postData('student/delete_student', { enrollmentno: cid })
                Swal.fire(response.message);
                fetchAllStudent()
            }
            else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const displayStudent = () => {
        return (<div>
            <MaterialTable
                title="Student List"
                columns={[
                    { title: 'Enrollment No', field: 'enrollmentno' },
                    { title: 'Branch Name', field: 'branchname' },
                    { title: 'Batch Name', field: 'batchname' },
                    { title: 'Section Name', field: 'sectionname' },
                    { title: 'Student Name', field: 'studentname' },
                    { title: 'D.O.B', render: (rowData) =>(rowData.dob.split('T')[0]) },
                    { title: 'Gender', field: 'gender' },
                    { title: 'Father Name', field: 'fathername' },
                    { title: 'Mother Name', field: 'mothername' },
                    { title: 'Email ID', field: 'emailid' },
                    { title: 'Mobile No', field: 'mobileno' },
                    { title: 'Aadhar No', field: 'addharno' },
                    { title: 'Father NO', field: 'fathercontactno' },
                    { title: 'Mother No', field: 'mothercontactno' },
                    { title: 'Current Address', field: 'current_address' },
                    { title: 'Current State', field: 'current_state' },
                    { title: 'Current City', field: 'current_city' },
                    { title: 'Current Pincode', field: 'current_pincode' },
                    { title: 'Parmanent Address', field: 'permanent_address' },
                    { title: 'Parmanent State', field: 'parmanent_state' },
                    { title: 'Parmanent City', field: 'parmanent_city' },
                    { title: 'Parmanent Pincode', field: 'parmanent_pincode' },
                    { title: 'Picture', render: (rowData) => (<div onClick={() => handleOpenDialog(rowData, 'picture')}><EditIconComponent image={rowData.student_picture} /></div>) },
                ]}
                data={studentList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Data',
                        onClick: (event, rowData) => handleOpenDialog(rowData, 'Data')
                    },
                    {
                        icon: 'delete',
                        tooltip: 'delete Data',
                        onClick: (event, rowData) => handleDelete(rowData.enrollmentno)
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