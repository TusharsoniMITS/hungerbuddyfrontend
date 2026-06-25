// import Card from "@mui/material/Card";
import { postData } from "../../services/FetchNodeServices";
import { Grid, FormControl, FormLabel, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100vw",
    height: "100vh",
  },
  box: {
    width: 400,
    height: "auto",
    border: "1px solid hsla(330, 53%, 77%, 1)",
    borderRadius: 10,
    

    margin: 5,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
   titleStyle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#fff",
    flexDirection:'column',
    display:'flex'

  },
  subTitleStyle: {
    fontWeight: 700,
    fontSize: 16,
    color: "#fff",
  },
  titleBox: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    padding: 10,
  },
   heading: {
    width: "100%",
    height: "auto",
    background:
      "linear-gradient(90deg, hsla(321, 41%, 24%, 1) 0%, hsla(330, 53%, 77%, 1) 100%)",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
 
}));

export default function AdminLogin() {
  const classes = useStyles();
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');
  const handleSubmit = async () => {
    var body = { emailid:emailId, password:password };
    var res = await postData("admin/chk_Admin_login", body);
    if (res.status===true) {
      navigate("/admindashboard");
      localStorage.setItem("ADMIN", JSON.stringify(res.data));
    } else {
      Swal.fire({
        icon: "error",
        title: res.message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
         position: "center",
      });
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.box} >
        <Grid container spacing={1}>
          <Grid size={12}>
        
            <div className={classes.heading}>
              <div className={classes.titleBox}>
                <div style={{fontWeight:'bolder',fontSize:30,color:'#ffff'}}>HungerBuddy</div>
                <div style={{fontSize:16,color:'#ffff'}}>Sign In <b>Administrator</b></div>
              </div>
            </div>
          </Grid>

          <Grid size={12} style={{padding:'10px 10px 0px 10px'}} >
            <FormControl fullWidth>
              <FormLabel>Email</FormLabel>
              <TextField
                placeholder="your@email.com"
                autoFocus
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                variant="outlined"
              />
            </FormControl>
          </Grid>

          <Grid size={12} style={{padding:10}}>
            <FormControl fullWidth>
              <FormLabel>Password</FormLabel>
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                type="password"
                value={password}
              />
            </FormControl>
          </Grid>

          <Grid size={12} style={{padding:10}}>
            <Button
              fullWidth
              style={{ color: "#ffff", background: "hsla(321, 32%, 37%, 1.00)"  }}
              variant="contained"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
