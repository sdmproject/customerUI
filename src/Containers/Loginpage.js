import Login from "../Components/Login";
import Logout from "../Components/Logout";
import { Grid } from "@mui/material";

export const Loginpage = ({ authed, setAuthed, setLoginUserProfile }) => {
  return (
    <Grid
      container
      spacing={6}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      {authed ? (
        <Grid item xs={3}>
          <Logout setAuthed={setAuthed} setLoginUserProfile={setLoginUserProfile} />
        </Grid>
      ) : (
        <Grid item xs={3}>
          <Login setAuthed={setAuthed} setLoginUserProfile={setLoginUserProfile} />
        </Grid>
      )}
    </Grid>
  );
};
