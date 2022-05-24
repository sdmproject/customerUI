import React from "react";
import { useGoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { FormattedMessage } from "react-intl";
import { ReactSession } from 'react-client-session';


const clientId =
  "513189472543-7auhhvn57gdsetv10fpg3chs7s3kgq8i.apps.googleusercontent.com";

function Logout({ setAuthed }) {
  let navigate = useNavigate();

  const onLogoutSuccess = (res) => {
    // console.log("Logged out Success");
    alert("Logged out Successfully ✌");
    setAuthed(false);
    ReactSession.set("username", "--anonymous");
    ReactSession.set("image_URL", "");
    ReactSession.set("email", "");
    ReactSession.set("google_ID", "");
    navigate("../../", { replace: true });
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <Button variant="contained" startIcon={<GoogleIcon />} onClick={signOut}>
      <FormattedMessage id="logout.button" defaultMessage="Log out" />
    </Button>
  );
}

export default Logout;
