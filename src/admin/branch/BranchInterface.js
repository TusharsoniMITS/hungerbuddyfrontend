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
import { FormControl,InputLabel,Select,MenuItem } from "@mui/material";
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

export default function BranchInterface({refresh,setRefresh }) {
    const [branchName, setBranchName] = useState('')
    const [address, setAddress] = useState('')
    const [latlong, setLatlong] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [stateList, setStateList] = useState([])
    const [cityList, setCityList] = useState([])
    const [emailId, setEmailId] = useState('')
    const [contact, setContact] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [error, setError] = useState({ imgError: null })
  const [loading, setLoading] = useState(false);
    const handleError = (label, message) => {
        setError((prev) => ({ ...prev, [label]: message }))
    }
        useEffect(function(){
        fetchAllState()
    },[])
    const fetchAllState=async()=>{
        setLoading(true)
        var res=await getData('statecity/fetch_state')
        setStateList(res.data)
        setLoading(false)
    }
    const fillState=()=>{
         return stateList.map((item)=>{
            return(<MenuItem value={item.stateid}>{item.statename}</MenuItem>)
         })
    }
    const handleStateChange=(e)=>{
        setState(e.target.value)
        fetchAllCity(e.target.value)
    }

    const fetchAllCity=async(sid)=>{
        var res=await postData('statecity/fetch_cities',{'stateid':sid})
        setCityList(res.data)
    }

    const fillCity=()=>{
         return cityList.map((item)=>{
            return(<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)
         })
    }

    const validation = () => {
        var isError = false
        if (branchName.length == 0) {
            setError((prev) => ({ ...prev, 'branchName': 'pls input category Name..' }))
            isError = true
        }
        if (address.length == 0) {
            setError((prev) => ({ ...prev, 'address': 'pls input category Name..' }))
            isError = true
        }
        if (latlong.length == 0) {
            setError((prev) => ({ ...prev, 'latlong': 'pls input category Name..' }))
            isError = true
        }
        if (emailId.length == 0) {
            setError((prev) => ({ ...prev, 'emailId': 'pls input category Name..' }))
            isError = true
        }
        if (contact.length == 0) {
            setError((prev) => ({ ...prev, 'contact': 'pls input category Name..' }))
            isError = true
        }
        if (contactPerson.length == 0) {
            setError((prev) => ({ ...prev, 'contactPerson': 'pls input category Name..' }))
            isError = true
        }
        return isError
    }

    const genratePassword=()=>{
        var sp=['@','#','$','!','&','1','2','3','4','5','6','7','8','9','0']
        var pwd=''
        for(var i=1;i<=8;i++)
        {
            var j=sp[parseInt(Math.random()*14)]
            pwd+=j
        }
        return pwd
    }
    const handleclick = async () => {
        if (!validation()) {
        setLoading(true)
            var body = {
                'branchname': branchName, 'address': address,
                'latlong': latlong, 'stateid': state,
                'cityid': city, 'emailid': emailId,
                'contactnumber': contact, 'contactperson': contactPerson,
                'createddate': getDate(), 'createdtime': getTime(),
                'userid': 'tushar','password': genratePassword(),
            }
            var response = await postData('branch/submit_branch', body);
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
        setBranchName('')
        setAddress('')
        setLatlong('');
        setState('')
        setCity('')
        setEmailId('');
        setContact('')
        setContactPerson('')
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
                            <div className={classes.subTitleStyle}>New Branch</div>
                        </div>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setBranchName(e.target.value)} label='Branch Name' fullWidth value={branchName} helperText={error?.branchName} error={error?.branchName} onFocus={() => handleError('branchName', '')}/>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setAddress(e.target.value)} label='Address' fullWidth value={address} helperText={error?.address} error={error?.address} onFocus={() => handleError('address', '')}/>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setLatlong(e.target.value)} label='Latlong' fullWidth value={latlong} helperText={error?.latlong} error={error?.latlong} onFocus={() => handleError('latlong', '')}/>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth><InputLabel>State</InputLabel><Select label='state' value={state} onChange={handleStateChange}><MenuItem>-Select State-</MenuItem>{fillState()}</Select></FormControl>
                        {/*<TextField onChange={(e) => setState(e.target.value)} label='State' fullWidth value={state} helperText={error?.state} error={error?.state} onFocus={() => handleError('state', '')}/>*/}
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <Button onClick={handleclick} variant="contained" style={{ backgroundColor: '#572445', height: '5vh' }} fullWidth >
                            Submit
                        </Button>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <FormControl size="small" fullWidth><InputLabel>City</InputLabel><Select label='City' value={city} onChange={(e)=>setCity(e.target.value)}><MenuItem>-Select City-</MenuItem>{fillCity()}</Select></FormControl>
                        {/*<TextField onChange={(e) => setCity(e.target.value)} label='City' fullWidth value={city} helperText={error?.city} error={error?.city} onFocus={() => handleError('city', '')}/>*/}
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setEmailId(e.target.value)} label='EmailId' fullWidth value={emailId} helperText={error?.emailId} error={error?.emailId} onFocus={() => handleError('emailId', '')}/>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setContact(e.target.value)} label='Contact Number' fullWidth value={contact} helperText={error?.contact} error={error?.contact} onFocus={() => handleError('contact', '')}/>
                    </div>
                </Grid>
                <Grid size={2.5}>
                    <div style={{ padding: 10 }}>
                        <TextField size="small" onChange={(e) => setContactPerson(e.target.value)} label='Contact Person' fullWidth value={contactPerson} helperText={error?.contactPerson} error={error?.contactPerson} onFocus={() => handleError('contactPerson', '')}/>
                    </div>
                </Grid>
                <Grid size={2}>
                    <div style={{ padding: 10 }}>
                        <Button onClick={handleReset} variant="contained" color='error' fullWidth style={{ height: '5vh' }}>
                            Clear
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </div>
    </div></>)
}