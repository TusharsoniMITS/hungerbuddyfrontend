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

export default function DisplayAll({refresh,setRefresh }) {
  const classes = useStyle()
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(false)
  /*****************category view************/

  const [categoryId, setCategoryId] = useState('')
  const [branchId, setBranchId] = useState('')
  const [categoryName, setcategoryName] = useState('')
  const [categoryIcon, setCategoryIcon] = useState({ bytes: '', fileName: icon })
  const [error, setError] = useState({ imgError: null })
  const [dialogState, setDialogState] = useState('')
  const [pictureStatusButton, setPictureStatusButton] = useState(false)
  const [tempPicture, setTempPicture] = useState('')

  useEffect(()=>{
    fetchAllCategory()
  },[refresh])

  const handleError = (label, message) => {
    setError((prev) => ({ ...prev, [label]: message }))
  }

  const validation = () => {
    var isError = false
    if (categoryName.length == 0) {
      setError((prev) => ({ ...prev, 'categoryName': 'pls input category Name..' }))
      isError = true
    }
    // if (categoryIcon.bytes.length == 0) {
    //   setError((prev) => ({ ...prev, 'imgError': 'pls input category Icon..' }))
    //   isError = true
    // }
    return isError
  }
  const handleclick = async () => {
    if (!validation()) {
      var body = {
        'categoryid': categoryId,
        'categoryname': categoryName,
        'createddate': getDate(),
        'createdtime': getTime(),
        'userid': 'tushar'
      }
      var response = await postData('category/edit_category', body);
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
        fetchAllCategory()
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
    setCategoryIcon((prev) => ({ ...prev, bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) }))
    setError((prev) => ({ ...prev, 'imgError': '' }))
    setPictureStatusButton(true)
  }

  const handleCancel = () => {
    setCategoryIcon({ fileName: tempPicture, bytes: '' })
    setPictureStatusButton(false)
  }

  const handleEditPicture = async () => {
      var formData = new FormData();
      formData.append('categoryid', categoryId);
      formData.append('categoryicon', categoryIcon.bytes);
      formData.append('createddate', getDate());
      formData.append('createdtime', getTime());
      formData.append('userid', 'tushar');

      var response = await postData(
        'category/edit_picture_category',
        formData
      );

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
        fetchAllCategory();

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
      <Button onClick={handleEditPicture} variant="contained" style={{backgroundColor: '#572445'}} >Save</Button>
      <Button onClick={handleCancel} variant="contained" color="error" >Cancel</Button>
    </div>)
  }

  const showPictureInterface = () => {
    return (<div style={{ display: "flex", justifyContent: "center", padding: 0 }}>
      <Grid container spacing={0.5}>
        <Grid size={12}>
          <div className={classes.heading}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 10 }}>
              <div className={classes.titleStyle}>HungerBuddy</div>
              <div className={classes.subTitleStyle}>Edit Food Category Picture</div>
            </div>
            <div style={{ display: "flex", marginLeft: 'auto', marginTop: '-30px' }}>
              <IconButton
                onClick={handleCloseDialog}
                aria-label="delete"
                style={{
                  position: "absolute",
                  top: 40,
                  left: 530,
                  zIndex: 1,
                  background: "rgba(0,0,0,0.5)"
                }}
              >
                <CloseIcon style={{ color: "white" }} />
              </IconButton>
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
              src={categoryIcon.fileName}
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

  const showCategoryInterface = () => {
    return (<div >
      <Grid container spacing={1}>
        <Grid size={12}>
          <div className={classes.heading}>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '40%', marginLeft: 10 }}>
              <div className={classes.titleStyle}>HungerBuddy</div>
              <div className={classes.subTitleStyle}>Edit Food Category</div>
            </div>
            <div style={{ display: "flex", marginLeft: 'auto', marginTop: '-30px' }}>
              <IconButton onClick={handleCloseDialog} aria-label="close">
                <CloseIcon style={{ color: 'white' }} />
              </IconButton>
            </div>
          </div>
        </Grid>
        <Grid size={12}>
          <div style={{ padding: 10 }}>
            <TextField onChange={(e) => setBranchId(e.target.value)} label='Branch Name' fullWidth value={branchId} />
          </div>
        </Grid>
        <Grid size={12}>
          <div style={{ padding: 10 }}>
            <TextField onChange={(e) => setcategoryName(e.target.value)} label='Category Name' fullWidth value={categoryName} helperText={error?.categoryName} error={error?.categoryName} onFocus={() => handleError('categoryName', '')} />
          </div>
        </Grid>
        <Grid size={6}>
          <div style={{ padding: 10 }}>
            <Button onClick={handleCloseDialog} variant="contained" color='error' fullWidth>
              Close
            </Button>
          </div>
        </Grid>
        <Grid size={6}>
          <div style={{ padding: 10 }}>
            <Button onClick={handleclick} variant="contained" style={{ backgroundColor: '#572445' }} fullWidth>
              Submit
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>)
  }

  /***************************************/
  const fetchAllCategory = async () => {
    var response = await getData('category/fetch_all_category');
    setCategoryList(response.data);
  }
  useEffect(function () {
    fetchAllCategory();
  }, []);

  const handleOpenDialog = (rowData, status) => {
    setDialogState(status)
    setCategoryId(rowData.categoryid)
    setBranchId(rowData.branchid)
    setcategoryName(rowData.categoryname)
    setCategoryIcon({ fileName: `${serverURL}/images/${rowData.categoryicon}`, bytes: '' })
    setOpen(true)
    setTempPicture(`${serverURL}/images/${rowData.categoryicon}`)
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
          {dialogState == 'Data' ? showCategoryInterface() : showPictureInterface()}
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
        var response = await postData('category/delete_category', { categoryid: cid })
        Swal.fire(response.message);
        fetchAllCategory()
      }
      else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  const displayCategory = () => {
    return (<div>
      <MaterialTable
        title="Food Category List"
        columns={[
          { title: 'branch Id', field: 'branchid' },
          { title: 'Category Name', field: 'categoryname' },
          { title: 'Category Icon', render: (rowData) => (<div onClick={() => handleOpenDialog(rowData, 'picture ')}><EditIconComponent image={rowData.categoryicon} /></div>) },
        ]}
        data={categoryList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Data',
            onClick: (event, rowData) => handleOpenDialog(rowData, 'Data')
          },
          {
            icon: 'delete',
            tooltip: 'delete Data',
            onClick: (event, rowData) => handleDelete(rowData.categoryid)
          }
        ]}
      />
    </div>)
  };

  return (<div className={classes.root}>
    <div className={classes.box}>
      {displayCategory()}
    </div>
    {showDialog()}
  </div>);
}