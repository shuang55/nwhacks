import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Email, Face, Fingerprint } from '@material-ui/icons';
import styled from 'styled-components';
import { useState } from 'react';

const StyledPaper = styled(Paper)`
    padding-top: 50px;
    padding-right: 50px;
    padding-left: 50px;
    padding-bottom: 50px;
`

const Login = ({}) => {
    const { email, setEmail } = useState(null)
    const { password, setPassword } = useState(null)

    return (
        <StyledPaper elevation={3}>
            <Box>
                <form autoComplete="off">
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item>
                            <TextField id="outlined-basic" label="Email" type="email" variant="outlined" required />
                        </Grid> 
                    </Grid>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item>
                            <TextField id="outlined-basic" label="Password" type="password" variant="outlined" required />
                        </Grid>
                    </Grid>
                
                    <Button variant="contained" color="primary" size="large" style={{ "margin-top": "30px", textTransform: "none" }}>Login</Button>
                </form>
            </Box>
        </StyledPaper>
    )
}

export default Login;

