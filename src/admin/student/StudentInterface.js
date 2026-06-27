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
export default function StudentInteterface({ refresh, setRefresh }) {
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
    const [loading, setLoading] = useState(false);




    const [error, setError] = useState({ imgError: null })
    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }

    useEffect(function () {
        fetchAllBranch();
        fetchAllBatch();
        fetchAllSection()
    }, []);

    const fetchAllBranch = async () => {
            setLoading(true)

        var res = await getData('student/fetch_branch');
        setBranchList(res.data);
            setLoading(false)

    };

    const fillbranch = () => {
        return branchList.map((item) => {
            return <MenuItem value={item.branchid}>{item.branchname}</MenuItem>;
        });
    };

    const fetchAllBatch = async () => {
            setLoading(true)

        var res = await getData('student/fetch_batch');
        setBatchList(res.data);
            setLoading(false)

    };

    const fillbatch = () => {
        return batchList.map((item) => {
            return <MenuItem value={item.batchid}>{item.batchname}</MenuItem>;
        });
    };

    const fetchAllSection = async () => {
            setLoading(true)

        var res = await getData('student/fetch_section');
        setSectionList(res.data);
            setLoading(false)

    };

    const fillsection = () => {
        return sectionList.map((item) => {
            return <MenuItem value={item.sectionid}>{item.sectionname}</MenuItem>;
        });
    };

    /********************* current state or city fetch*********/
    const fetchAllCurrentState = async () => {
            setLoading(true)

        var res = await getData('statecity/fetch_state')
        setCurrentStateList(res.data)
            setLoading(false)

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
            setLoading(true)

        var res = await getData('statecity/fetch_state')
        setParmanentStateList(res.data)
            setLoading(false)

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
        setStudentPicture({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
        setError((prev) => ({ ...prev, 'imgError': '' }))
    }

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

        return isError
    }
    const handleclick = async () => {
        if (!validation()) {
            setLoading(true)
            var formData = new FormData()
            formData.append('enrollmentno', enrollment);
            formData.append('branchid', branchId);
            formData.append('batchid', batchId);
            formData.append('sectionid', sectionId);
            formData.append('studentname', studentName);
            formData.append('dob', dob);
            formData.append('gender', gender);
            formData.append('fathername', fatherName);
            formData.append('mothername', motherName);
            formData.append('emailid', emailId);
            formData.append('mobileno', mobileNo);
            formData.append('fathercontactno', fatherNo);
            formData.append('mothercontactno', motherNo);
            formData.append('current_address', currentAddress);
            formData.append('current_state', currentState);
            formData.append('current_city', currentCity);
            formData.append('current_pincode', currentPin);
            formData.append('permanent_address', parmenentAddress);
            formData.append('parmanent_state', parmanentState);
            formData.append('parmanent_city', parmanentCity);
            formData.append('parmanent_pincode', parmanentPin);
            formData.append('student_picture', studentPicture.bytes);
            formData.append('addharno', aadharNo);
            formData.append('createddate', getDate());
            formData.append('createdtime', getTime());
            formData.append('userid', 'tushar');
            var response = await postData('student/submit_student', formData);
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
        setEnrollment('')
        setBranchId('')
        setBatchId('')
        setSectionId('')
        setStudentName('')
        setDob('')
        setGender('')
        setFatherName('')
        setMotherName('')
        setEmailId('')
        setMobileNo('')
        setFatherNo('')
        setMotherNo('')
        setCurrentAddress('')
        setCurrentState('')
        setCurrentCity('')
        setCurrentPin('')
        setParmenentAddress('')
        setParmanentState('')
        setParmanentCity('')
        setParmanentPin('')
        setStudentPicture({ bytes: '', fileName: icon })
        setAadharNo('')
    }

    var classes = useStyle()
    return (
        <>
        <LoadingOverlay open={loading} />
    <div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={1}>
                <Grid size={12}>
                    <div className={classes.heading}>
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 20 }}>
                            <div className={classes.subTitleStyle}>New Student</div>
                        </div>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setEnrollment(e.target.value)} label='Enrollment Number' fullWidth helperText={error?.enrollment} error={error?.enrollment} onFocus={() => handleError('enrollment', '')} value={enrollment} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.branchId} error={error?.branchId} onFocus={() => handleError('branchId', '')}><InputLabel>Branch</InputLabel><Select label='Branch' value={branchId} onChange={(e) => setBranchId(e.target.value)}><MenuItem>-Select Branch-</MenuItem>{fillbranch()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.batchId} error={error?.batchId} onFocus={() => handleError('batchid', '')}><InputLabel>Batch</InputLabel><Select label='batch' value={batchId} onChange={(e) => setBatchId(e.target.value)}><MenuItem>-Select Batch-</MenuItem>{fillbatch()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth helperText={error?.sectionId} error={error?.sectionId} onFocus={() => handleError('sectionId', '')}><InputLabel>Section</InputLabel><Select label='Section' value={sectionId} onChange={(e) => setSectionId(e.target.value)}><MenuItem>-Select Section-</MenuItem>{fillsection()}</Select></FormControl>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setStudentName(e.target.value)} label='Student Name' fullWidth helperText={error?.studentName} error={error?.studentName} onFocus={() => handleError('studentName', '')} value={studentName} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setDob(e.target.value)} placeholder="YY/MM/DD" label='D.O.B' fullWidth helperText={error?.dob} error={error?.dob} onFocus={() => handleError('dob', '')} value={dob} />
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
                        <TextField size="small" onChange={(e) => setFatherName(e.target.value)} label='Father Name' fullWidth helperText={error?.fatherName} error={error?.fatherName} onFocus={() => handleError('fatherName', '')} value={fatherName} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setMotherName(e.target.value)} label='Mother Name' fullWidth helperText={error?.motherName} error={error?.motherName} onFocus={() => handleError('motherName', '')} value={motherName} />
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
                        <TextField size="small" onChange={(e) => setAadharNo(e.target.value)} label='Aadhar No' fullWidth helperText={error?.aadharNo} error={error?.aadharNo} onFocus={() => handleError('aadharNo', '')} value={aadharNo} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setFatherNo(e.target.value)} label='Father contact No' fullWidth helperText={error?.fatherNo} error={error?.fatherNo} onFocus={() => handleError('fatherNo', '')} value={fatherNo} />
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setMotherNo(e.target.value)} label='Mother contact No' fullWidth helperText={error?.motherNo} error={error?.motherNo} onFocus={() => handleError('motherNo', '')} value={motherNo} />
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
                        <Button style={{ backgroundColor: '#572445', height: '5vh' }} endIcon={<CloudUploadIcon />} variant='contained' fullWidth component='label'>Upload File
                            <input onChange={handleimage} type="file" hidden multiple />
                        </Button>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 0, display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <img src={studentPicture.fileName} style={{ width: 50 }} alt={studentPicture} ></img>
                    </div>
                    <div style={{ color: 'red', fontFamily: 'Roboto,Helvetica,Arial,sans-serif', fontSize: '0.75rem', fontWeight: 400, lineHeight: '1.66rem' }}>{error?.imgError == null ? '' : error.imgError}</div>
                </Grid>
                <Grid size={6}>
                    <div style={{ padding: 10 }}>
                        <Button onClick={handleReset} variant="contained" color='error' fullWidth style={{ height: '5vh' }}>
                            Reset
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
        </div>
    </div></>)
}