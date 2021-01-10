import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import { MailOutline, Fingerprint } from '@material-ui/icons';
import styled from 'styled-components';
import { useState } from 'react';
import { login } from '../repository';
import { Redirect } from 'react-router-dom';

const StyledPaper = styled(Paper)`
    padding-top: 50px;
    padding-right: 50px;
    padding-left: 50px;
    padding-bottom: 50px;
    margin-top: 30vh;
`;

const StyledLink = styled(Link)`
    font-size: 10px;
    text-decoration: none;
`;

const Login = ({}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState({ email: '', password: '' });
    const [toastMessage, setToastMessage] = useState({
        status: '',
        message: '',
    });
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const validateForm = () => {
        let isValid = true;
        let formError = {};

        if (!email) {
            isValid = false;
            formError = { ...formError, email: 'Cannot be blank' };
        }

        if (!password) {
            isValid = false;
            formError = { ...formError, password: 'Cannot be blank' };
        }
        
        setError(formError);

        return isValid;
    };

    const handleSubmitForm = () => {
        if (!validateForm()) {
            return;
        }
        setToastMessage({ status: '', message: '' });

        login(email, password)
            .then((res) => {
                localStorage.setItem('user', res.data)
                setToastMessage({
                    status: true,
                    message: 'Successfully Logged In!',
                });
                setTimeout(() => {
                    setShouldRedirect(true);
                }, 1000);
            })
            .catch((err) => {
                setToastMessage({
                    status: false,
                    message: err.response.data.message,
                });
            });
    };

    return (
        <StyledPaper elevation={3}>
            <Box>
                <form autoComplete="off">
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <MailOutline />
                        </Grid>
                        <Grid item>
                            <TextField
                                size="small"
                                id="outlined-basic"
                                label="Email"
                                type="email"
                                variant="outlined"
                                error={!!error.email}
                                helperText={error.email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item>
                            <TextField
                                size="small"
                                id="outlined-basic"
                                label="Password"
                                type="password"
                                variant="outlined"
                                error={!!error.password}
                                helperText={error.password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>

                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        size="medium"
                        style={{
                            marginTop: '25px',
                            marginBottom: '10px',
                            textTransform: 'none',
                        }}
                        onClick={() => handleSubmitForm()}
                    >
                        Login
                    </Button>
                </form>
                <StyledLink to="/register">
                    Not registered? Click here to create an account.
                </StyledLink>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={!!toastMessage.message}
                autoHideDuration={5000}
                onClose={() => {
                    setToastMessage(false);
                }}
            >
                {toastMessage.status === true ? (
                    <Alert severity="success">{toastMessage.message}</Alert>
                ) : (
                    <Alert severity="error">{toastMessage.message}</Alert>
                )}
            </Snackbar>
            {shouldRedirect && <Redirect to="/dashboard" />}
        </StyledPaper>
    );
};

export default Login;
