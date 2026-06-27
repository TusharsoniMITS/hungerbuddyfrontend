import { Backdrop, CircularProgress } from "@mui/material";
export default function LoadingOverlay({open}){
    return (
  <>
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: 9999,
        backgroundColor: '#000000b6'
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 15,
        }}
      >
        <CircularProgress color="inherit" />
        <div><b>Loading, please wait...</b></div>
      </div>
    </Backdrop>
  </>
);
}