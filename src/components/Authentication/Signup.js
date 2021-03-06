import React,{ useState, useEffect }  from 'react';
import { Link } from "react-router-dom"
import axios from "axios";

//MUI components
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


//validation file
import { validate } from './SignupValidator';


//style
import "./style/signup.scss";


const Signup = () => {
    // =====================MUI snackBar================================

    const [snackBarDetails, setSnackBarDetails] = useState({
        message : "",
        severity : "",
        autoHideDuration : 11000
    })

    const [openSnackBar, setOpenSnackBar] = useState(false);

    const handleOpenSucceedSnackBar = (successMessage)=> {
        setOpenSnackBar(true);
        setSnackBarDetails({
            ...snackBarDetails,
            message : successMessage,
            severity : "success",
            autoHideDuration : 20000
        })
    };

    const handleOpenFailedSnackBar = (errorMessage) => {
        setOpenSnackBar(true);
        setSnackBarDetails({
            ...snackBarDetails,
            message : errorMessage,
            severity : "error",
            autoHideDuration : 7000
        })
    };

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenSnackBar(false);
    };

    // =====================MUI snackBar================================

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: '',
        companyName: '',
        email: '',
        nationalCode: '',
        postalCode: '',
        mobile: '',
        activity: '',
        address: '',
        password: '',
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(validate(data));
        //validation
        console.log(data);
    }, [data]);

    const valueHandler = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };
    //valueHandler fonction helps input to work properly

    const handleChange = (event) => {
        setData({
            ...data,
            activity : event.target.value
        });
    };

    const [touched , setTouched] = useState({})
    //use setTouched to know if client has clicked on any input
    const touchedHandler = event =>{
        setTouched({
            ...touched,
            [event.target.name] : true,
        })
    }
    //by using this eventHandler we can know if client has focused on an input

    const signUpHandler = (event) =>{
        event.preventDefault();

        setLoading(true)

        if(!(errors.name || errors.email || errors.password || errors.confirmPassword || errors.companyName || errors.nationalCode || errors.postalCode || errors.mobile || errors.activity || errors.address)){
            axios.post("https://dev3.satpay.ir/signup", data)
                .then(response => {
                    console.log(response);
                    if(response.data.output.data="Email has been sent"){
                        handleOpenSucceedSnackBar("?????? ?????? ?????? ???? ???????????? ?????????? ???? ???????? ?????????? ?????? ???? ?????????? ????????")
                    }
                    setLoading(false)
                })
                .catch((error)=> {
                    // error.response.data.status=422 && handleOpenFailedSnackBar("?????????? ???????? ?????? ?????? ??????")
                    console.log(error.response.data);
                    handleOpenFailedSnackBar(error.response.data.error)
                    // if(error.response.data.message=='This email address exsits, Please enter a valid one.'){
                    //     handleOpenFailedSnackBar("?????????? ???????? ?????? ?????? ??????")
                    // }else if (error.response.data.message=='This national Code already exsits, Please enter a valid one.'){
                    //     handleOpenFailedSnackBar("???? ?????? ???????? ?????? ?????? ??????")
                    // }else{
                    //     handleOpenFailedSnackBar(" ?????????? ?????? ???????? ?????? ?????????????? ???????? ?????? ???? ???????? ????????")
                    // }
                    setLoading(false)
                })
            console.log("succed")
        }else{
            handleOpenFailedSnackBar("?????? ???? ?????????? ????????");
            console.log("fail");
            setLoading(false)
        }
    }


    return (
        <>
            {/*=================== snackBar =================*/}

            <div>
                <Snackbar
                open={openSnackBar}
                autoHideDuration={snackBarDetails.autoHideDuration} 
                onClose={handleCloseSnackBar} 
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                TransitionComponent={Slide}
                >
                    <Alert onClose={handleCloseSnackBar} severity={snackBarDetails.severity} sx={{ width: '100%' }}>
                        {snackBarDetails.message}
                    </Alert>
                </Snackbar>
            </div>

            {/*=================== snackBar =================*/}

            {/* ==============loading Progress================ */}

            {loading &&
                <Box
                sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                borderRadius: 1,
                }}
                >
                    <div className='circularProgressDiv'>
                        <CircularProgress />
                        <p>???????? ?????????? ????????????</p>
                    </div>
                </Box>
            
            }

            {/* ==============loading Progress================ */}
            <div dir="rtl">
                <Grid container  className='signUp-container' >
                    <Grid xs={1} sm={3} md={4}></Grid>
                    <Grid xs={10} sm={6} md={4}>
                        <Grid container spacing={1} justifyContent="center" className='signUp-box'>
                            <Grid item xs={6} md={6} className="inputDiv">
                                <TextField
                                    id="filled-basic"
                                    label="?????? ????????"
                                    variant="filled"
                                    onChange={valueHandler}
                                    name="name"
                                    value={data.name}
                                    onBlur={touchedHandler}
                                    fullWidth
                                    />
                                <span>{errors.name && touched.name && <p>{errors.name}</p>} </span>
                            </Grid>
                            <Grid item xs={6} md={6} className="inputDiv">
                                <TextField
                                    id="filled-basic"
                                    label="?????? ????????"
                                    variant="filled"
                                    onChange={valueHandler}
                                    name="companyName"
                                    value={data.companyName}
                                    onBlur={touchedHandler}
                                    fullWidth
                                    />
                                <span>{errors.companyName && touched.companyName && <p>{errors.companyName}</p>} </span>
                            </Grid>
                            <Grid item xs={12} className="inputDiv">
                                <TextField
                                    type="email"
                                    id="filled-basic"
                                    label="??????????"
                                    variant="filled"
                                    onChange={valueHandler}
                                    name="email"
                                    value={data.email}
                                    onBlur={touchedHandler}
                                    fullWidth
                                    id="email-input"
                                    />
                                <span>{errors.email && touched.email && <p>{errors.email}</p>} </span>
                            </Grid>
                            <Grid item xs={12} className="inputDiv">
                                <TextField
                                    // id="filled-number"
                                    id="filled-basic"
                                    label="???? ??????"
                                    // type="number"
                                    variant="filled"
                                    fullWidth
                                    onChange={valueHandler}
                                    name="nationalCode"
                                    value={data.nationalCode}
                                    onBlur={touchedHandler}
                                    />
                                <span>{errors.nationalCode && touched.nationalCode && <p>{errors.nationalCode}</p>} </span>
                            </Grid>
                            <Grid item xs={12} className="inputDiv">
                                <TextField
                                    // id="filled-number"
                                    id="filled-basic"
                                    label="???? ????????"
                                    // type="number"
                                    variant="filled"
                                    fullWidth
                                    onChange={valueHandler}
                                    name="postalCode"
                                    value={data.postalCode}
                                    onBlur={touchedHandler}
                                    />
                                <span>{errors.postalCode && touched.postalCode && <p>{errors.postalCode}</p>} </span>
                            </Grid>
                            <Grid item xs={12} className="inputDiv">
                                <TextField
                                    // id="filled-number"
                                    id="filled-basic"
                                    label="????????????"
                                    // type="number"
                                    variant="filled"
                                    fullWidth
                                    onChange={valueHandler}
                                    name="mobile"
                                    value={data.mobile}
                                    onBlur={touchedHandler}
                                    />
                                <span>{errors.mobile && touched.mobile && <p>{errors.mobile}</p>} </span>
                            </Grid>
                            <Grid item xs={12} className="inputDiv">
                                    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} fullWidth className='formControl'>
                                        <InputLabel id="demo-simple-select-filled-label" fullWidth>?????? ????????????</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={data.activity}
                                        onChange={handleChange}
                                        fullWidth
                                        >
                                        <MenuItem value={"Blockchain"}>???????? ??????</MenuItem>
                                        <MenuItem value={"GOV"}>GOV</MenuItem>
                                        <MenuItem value={"City Services"}>?????????? ????????</MenuItem>
                                        <MenuItem value={"AI"}>AI</MenuItem>
                                        <MenuItem value={"Open Banking"}>???????????????? ??????</MenuItem>
                                        <MenuItem value={"IOT"}>IOT</MenuItem>
                                        <MenuItem value={"Tourism"}>??????????????</MenuItem>
                                        <MenuItem value={"Investment"}>???????????? ??????????</MenuItem>
                                        <MenuItem value={"Other"}>????????</MenuItem>
                                        </Select>
                                    </FormControl>
                                <span>{errors.activity && touched.activity && <p>{errors.activity}</p>} </span>
                            </Grid>
                            <Grid item xs={12} className="inputDiv">
                                <TextField
                                    id="filled-basic"
                                    label="????????"
                                    variant="filled"
                                    onChange={valueHandler}
                                    name="address"
                                    value={data.address}
                                    fullWidth
                                    onBlur={touchedHandler}
                                    />
                                <span>{errors.address && touched.address && <p>{errors.address}</p>} </span>
                            </Grid>
                            <Grid item xs={12} className="inputDiv">
                                <TextField
                                    id="filled-password-input"
                                    label="?????? ????????"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled"
                                    fullWidth
                                    onChange={valueHandler}
                                    name="password"
                                    value={data.password}
                                    onBlur={touchedHandler}
                                    />
                                <span>{errors.password && touched.password && <p>{errors.password}</p>} </span>
                            </Grid>
                            <Grid item xs={12} className="inputDiv">
                                <TextField
                                    id="filled-password-input"
                                    label="?????? ???????? ???? ?????????? ????????"
                                    type="password"
                                    autoComplete="current-password"
                                    variant="filled"
                                    fullWidth
                                    onChange={valueHandler}
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onBlur={touchedHandler}
                                    />
                                <span>{errors.confirmPassword && touched.confirmPassword && <p>{errors.confirmPassword}</p>} </span>
                            </Grid>
                            <Grid item xs={12} className="inputDiv">
                                <Button variant="contained" color="success" fullWidth onClick={signUpHandler}>
                                    ?????? ??????
                                </Button>
                            </Grid>
                            <Grid item xs={12} className="logininLink">
                                <Link to="/login/">
                                    ????????
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={1} sm={3} md={4}></Grid>
                </Grid>
            </div>
        </>
    );
};

export default Signup;