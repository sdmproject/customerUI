import React from "react";
import { useGoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
// refresh token
import { refreshTokenSetup } from "../Functions/refreshToken";
import { FormattedMessage } from "react-intl";
import { ReactSession } from 'react-client-session';

const clientId =
  "513189472543-7auhhvn57gdsetv10fpg3chs7s3kgq8i.apps.googleusercontent.com";

function Login({ setAuthed, setLoginUserProfile }) {
  let navigate = useNavigate();

  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    alert(`Logged in successfully welcome ${res.profileObj.name} 😍.`);
    refreshTokenSetup(res);
    setAuthed(true);
    // setLoginUserProfile(res.currentUser.get().getBasicProfile());
    setLoginUserProfile(res.profileObj);
    ReactSession.set("username", res.profileObj.name);
    ReactSession.set("image_URL", res.profileObj.imageUrl);
    ReactSession.set("email", res.profileObj.email);
    ReactSession.set("google_ID", res.profileObj.googleId);
    navigate("/customerUI", { replace: true });
    // if (res.isSignedIn.get()) {
    //   var profile = res.currentUser.get().getBasicProfile();
    //   console.log('ID: ' + profile.getId());
    //   console.log('Full Name: ' + profile.getName());
    //   console.log('Given Name: ' + profile.getGivenName());
    //   console.log('Family Name: ' + profile.getFamilyName());
    //   console.log('Image URL: ' + profile.getImageUrl());
    //   console.log('Email: ' + profile.getEmail());
    // }
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login. 😢`);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    // isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <Button variant="contained" startIcon={<GoogleIcon />} onClick={signIn}>
      <FormattedMessage
        id="login.button"
        defaultMessage="Sign in with Google"
      />
    </Button>
  );
}

export default Login;
