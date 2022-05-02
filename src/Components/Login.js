import React from "react";
import { useGoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
// refresh token
import { refreshTokenSetup } from "../Functions/refreshToken";

const clientId =
  "513189472543-7auhhvn57gdsetv10fpg3chs7s3kgq8i.apps.googleusercontent.com";

function Login({ setAuthed }) {
  let navigate = useNavigate();

  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
    setAuthed(true);
    navigate("/customerUI", { replace: true });
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
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
      Sign in with Google
    </Button>
  );
}

export default Login;
