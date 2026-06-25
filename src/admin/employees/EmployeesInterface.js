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
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from "@mui/material";

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
export default function EmployeesInterface({ refresh, setRefresh }) {
    const [branchId, setBranchId] = useState('')
    const [branchList, setBranchList] = useState([])
        const [employeeName, setEmployeeName] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [emailId, setEmailId] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [otherNo, setOtherNo] = useState('')
    const [department, setDepartment] = useState('')
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
    const [aadharNo, setAadharNo] = useState('')
    const [employeePicture, setemployeePicture] = useState({ bytes: '', fileName: icon })


    const [error, setError] = useState({ imgError: null })
    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    useEffect(function () {
        fetchAllBranch();
    }, []);

    const fetchAllBranch = async () => {
        var res = await getData('employee/fetch_branch');
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

    const handleimage = (e) => {
        setemployeePicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
        setError((prev) => ({ ...prev, 'imgError': '' }))
    }

    const validation = () => {
        var isError = false
        if (branchId.length == 0) {
            setError((prev) => ({ ...prev, 'branchId': 'pls input Branch..' }))
            isError = true
        }
        if (employeeName.length == 0) {
            setError((prev) => ({ ...prev, 'employeeName': 'pls employeeName..' }))
            isError = true
        }

        return isError
    }
    const handleclick = async () => {
        if (!validation()) {
            var formData = new FormData()
            formData.append('branchid', branchId);
            formData.append('employeename', employeeName);
            formData.append('dob', dob);
            formData.append('gender', gender);
            formData.append('emailid', emailId);
            formData.append('mobileno', mobileNo);
            formData.append('otherno', otherNo);
            formData.append('department', department);
            formData.append('current_address', currentAddress);
            formData.append('current_state', currentState);
            formData.append('current_city', currentCity);
            formData.append('current_pincode', currentPin);
            formData.append('parmanent_address', parmenentAddress);
            formData.append('parmanent_state', parmanentState);
            formData.append('parmanent_city', parmanentCity);
            formData.append('parmanent_pincode', parmanentPin);
            formData.append('employee_picture', employeePicture.bytes);
            formData.append('aadharno', aadharNo);
            formData.append('createddate', getDate());
            formData.append('createdtime', getTime());
            formData.append('userid', 'tushar');
            var response = await postData('employee/submit_employee', formData);
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
        setEmployeeName('')
        setDob('')
        setGender('')
        setEmailId('')
        setMobileNo('')
        setOtherNo('')
        setDepartment('')
        setCurrentAddress('')
        setCurrentState('')
        setCurrentCity('')
        setCurrentPin('')
        setParmenentAddress('')
        setParmanentState('')
        setParmanentCity('')
        setParmanentPin('')
        setAadharNo('')
        setemployeePicture({ bytes: '', fileName: icon })
    }

    var classes = useStyle()
    return (<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 20 }}>
                            <div className={classes.subTitleStyle}>New Employees</div>
                        </div>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={() => handleError('branchId', '')}><InputLabel>Branch</InputLabel><Select label='Branch' value={branchId} onChange={(e) => setBranchId(e.target.value)}><MenuItem>-Select Branch-</MenuItem>{fillbranch()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setEmployeeName(e.target.value)} label='Employee Name' fullWidth helperText={error?.employeeName} error={error?.employeeName} onFocus={() => handleError('employeeName', '')} value={employeeName} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setDob(e.target.value)} placeholder="YY/MM/DD" label='Date of Birth' fullWidth helperText={error?.dob} error={error?.dob} onFocus={() => handleError('dob', '')} value={dob} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: "0px 5px 0px 5px" }}>
                        <FormControl size="small">
                            <FormLabel typeof="legend" id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                            <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" onChange={(e) => setGender(e.target.value)} >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setEmailId(e.target.value)} label='Email Id' fullWidth helperText={error?.emailId} error={error?.emailId} onFocus={() => handleError('emailId', '')} value={emailId} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setMobileNo(e.target.value)} label='Mobile No' fullWidth helperText={error?.mobileNo} error={error?.mobileNo} onFocus={() => handleError('mobileNo', '')} value={mobileNo} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setOtherNo(e.target.value)} label='Other Contact No' fullWidth helperText={error?.otherNo} error={error?.otherNo} onFocus={() => handleError('otherNo', '')} value={otherNo} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl
                            size="small"
                            fullWidth
                            helperText={error?.fdepartment}
                            error={error?.department}
                            onFocus={() => handleError("department", null)}
                        >
                            <InputLabel>Department</InputLabel>
                            <Select
                                label="Department"
                                onChange={(e) => setDepartment(e.target.value)}
                            >
                                <MenuItem>-Select Department-</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                                <MenuItem value="Faculty">Faculty</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setCurrentAddress(e.target.value)} label='Current Address' fullWidth helperText={error?.currentAddress} error={error?.currentAddress} onFocus={() => handleError('currentAddress', '')} value={currentAddress} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.currentState} error={error?.currentState} onFocus={() => handleError('currentState', '')}><InputLabel>Current State</InputLabel><Select label='Current state' value={currentState} onChange={handleCurrentStateChange}><MenuItem>-Select State-</MenuItem>{fillCurrentState()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.currentCity} error={error?.currentCity} onFocus={() => handleError('currentCity', '')}><InputLabel>Current City</InputLabel><Select label='Current city' value={currentCity} onChange={(e) => setCurrentCity(e.target.value)}><MenuItem>-Select City-</MenuItem>{fillCurrentCity()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setCurrentPin(e.target.value)} label='Current Pincode' fullWidth helperText={error?.currentPin} error={error?.currentPin} onFocus={() => handleError('currentPin', '')} value={currentPin} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setParmenentAddress(e.target.value)} label='Parmanent Address' fullWidth helperText={error?.parmenentAddress} error={error?.parmenentAddress} onFocus={() => handleError('parmenentAddress', '')} value={parmenentAddress} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.parmanentState} error={error?.parmanentState} onFocus={() => handleError('parmanentState', '')}><InputLabel>Parmanent State</InputLabel><Select label='Parmanent state' value={parmanentState} onChange={handleParmanentStateChange}><MenuItem>-Select State-</MenuItem>{fillParmanentState()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.parmanentCity} error={error?.parmanentCity} onFocus={() => handleError('parmanentCity', '')}><InputLabel>Parmanent City</InputLabel><Select label='Parmanent city' value={parmanentCity} onChange={(e) => setParmanentCity(e.target.value)}><MenuItem>-Select City-</MenuItem>{fillParmanentCity()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setParmanentPin(e.target.value)} label='Parmanent Pincode' fullWidth helperText={error?.parmanentPin} error={error?.parmanentPin} onFocus={() => handleError('parmanentPin', '')} value={parmanentPin} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setAadharNo(e.target.value)} label='Aadhar No' fullWidth helperText={error?.aadharNo} error={error?.aadharNo} onFocus={() => handleError('aadharNo', '')} value={aadharNo} />
                    </div>
                </Grid>
                <Grid size={2}></Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <Button style={{ backgroundColor: '#572445', height: '5vh' }} endIcon={<CloudUploadIcon />} variant='contained' fullWidth component='label'>Upload File
                            <input onChange={handleimage} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={employeePicture.fileName} style={{ width: 50 }} alt={employeePicture} ></img>
                    </div>
                    <div style={{ color: 'red', fontFamily: 'Roboto,Helvetica,Arial,sans-serif', fontSize: '0.75rem', fontWeight: 400, lineHeight: '1.66rem' }}>{error?.imgError == null ? '' : error.imgError}</div>
                </Grid>
                <Grid size={4}>
                    <div style={{ padding: 10 }}>
                        <Button onClick={handleReset} variant="contained" color='error' fullWidth style={{ height: '5vh' }}>
                            Reset
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