import { Dialog, Box, Typography, Button, Grid, TextField, createTheme, ThemeProvider } from "@mui/material";
import { qrImage } from "../../constants/data";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { AccountContext } from "../../context/AccountProvider";
import styled from "@emotion/styled";
import { addUser } from "../../api/api";
import { DEMO_MODE } from "../../config";
import { DEMO_ACCOUNT } from "../../demo/demoBackend";

// Define a custom theme with purple button color
const theme = createTheme({
  palette: {
    primary: {
      main: "#32349C",
    },
  },
});

export default function LoginBox() {
  const { setAccount } = useContext(AccountContext);

  const handleSuccess = async (res) => {
    const credential = res.credential;
    const decoded = jwt_decode(credential);
    setAccount(decoded);

    // An API is called here, so use async
    await addUser(decoded);
  };

  const startDemo = () => setAccount(DEMO_ACCOUNT);

  const handleError = (res) => {
    console.log(res);
    // console.log("Error");
  };

  const AppTitle = styled(Typography)`
  font-family: 'Shadows Into Light', cursive;
  `;

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={true} maxWidth="xs">
        <Box p={4}>
          <AppTitle variant="h4" align="center" mb={4}>
            Vibe
          </AppTitle>
          {DEMO_MODE ? (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="body2" align="center">
                  This is an offline demo. There is no server, so Google sign-in is
                  turned off. You will chat with scripted bot contacts, and
                  messages stay in this browser tab.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth onClick={startDemo}>
                  Enter demo
                </Button>
              </Grid>
            </Grid>
          ) : (
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  sx: {
                    borderBottom: "1px solid #000",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                size="small"
                type="password"
                InputProps={{
                  sx: {
                    borderBottom: "1px solid #000",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="body2">
                Don't have an account? <a href="#">Sign Up</a>
              </Typography>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="body2">Or sign in with:</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center">
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleError}
                  render={({ onClick }) => (
                    <Button variant="contained" fullWidth onClick={onClick}>
                      Sign in with Google
                    </Button>
                  )}
                />
              </Box>
            </Grid>
          </Grid>
          )}
          <Box mt={4} textAlign="center">
            <img src="/qr-code.png" alt="QR Code" style={{ height: "10rem" }} />
            <Typography variant="body2" mt={2}>
              Scan to open my Github profile
            </Typography>
          </Box>
        </Box>
      </Dialog>
    </ThemeProvider>
  );
}
