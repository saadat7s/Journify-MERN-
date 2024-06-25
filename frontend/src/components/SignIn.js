import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Body from './Body';

const defaultTheme = createTheme();

export default function SignIn() {
  const [login, setLogin] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [redBox, setRedBox] = useState(false);

  async function fetchData() {
    const response = await fetch("http://localhost:12345/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    if (response.ok) {
      setLogin(true)
    }
    else {
      setRedBox(true)
    }

  }

  async function handleSubmit(e) {
    e.preventDefault()
    await fetchData();
  }

  return (
    <>
      {login ? <Body data={formData} />
        : 
        <ThemeProvider ThemeProvider theme={defaultTheme} >
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Grid container sx={{justifyContent: "center"}}>
                  {redBox ? <p className='m-0 text-danger'>Incorrect Credentials</p> : " "}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item sx={{display: "flex" ,gap: "10px", fontSize: 15}}>
                    <Link href="/signup" variant="body2">
                      Sign Up
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>

      }
    </>
  );
}
