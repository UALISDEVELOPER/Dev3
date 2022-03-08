import React, { useEffect, useState } from 'react';
import axios from 'axios';


//mui
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

//mui table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//mui accordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

//style
import "./style/userlog.scss"



const UserLog = () => {
    //================= accordion ======================
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    //================= accordion ======================
    
    //========loading=======================
    const [loading, setLoading] = useState(false);
    //========loading=======================

    //================= filter data ====================

    const [filterData, setFilterData] = useState({
        appName : "",
        userID : "" ,
        url : ""
    })


    const handleChangeValue = (event) => {
        setFilterData({
            ...filterData,
            [event.target.name] : event.target.value 
        });
      };

      const handleChangeSelectForm = (event) => {
        setFilterData({
            ...filterData,
            url : event.target.value
        });
      };

      const submitFilter = () =>{
            setLoading(true);
            const URL = `https://dev3.satpay.ir/log/read?SDate=&EDate=&appName=${filterData.appName}&skip=&url=${filterData.url}&userID=`;
            const config = {
                headers: {
                    "Content-type": 'application/json; charset=UTF-8' ,
                    "Authorization" : `bearer ${localStorage.getItem("refreshToken")}`,
                }
            }
            axios.get(URL, config)
                .then(response =>{
                    console.log(response);
                    setTookenData(response.data.output.data);
                    setLoading(false); 
                })
                .catch(error =>{
                    setLoading(false);
                    console.log(error.response);
                })

                console.log(URL);
      }

      //================= filter data ====================
      

    const [tookenData, setTookenData] = useState(false)

    useEffect(()=>{
        setLoading(true);
        const URL = `https://dev3.satpay.ir/log/read?SDate=&EDate=&appName=${filterData.appName}&skip=&url=${filterData.url}&userID=`;
        const config = {
            headers: {
                "Content-type": 'application/json; charset=UTF-8' ,
                "Authorization" : `bearer ${localStorage.getItem("refreshToken")}`,
            }
        }
        axios.get(URL, config)
            .then(response =>{
                console.log(response);
                setTookenData(response.data.output.data);
                setLoading(false);
            })
            .catch(error =>{
                console.log(error.response);
                setLoading(false)
            })
    },[])
      
    


    return(

        <>
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
                        <p>لطفا منتظر بمانید</p>
                    </div>
                </Box>
            
            }
            <Grid container spacing={2}>
                <Grid xs={12} className='headerGrid'>
                    <h2>لیست لاگ کاربران</h2>
                </Grid>
                <Grid item xs={1} sm={1} md={2}></Grid>
                <Grid item xs={10} sm={10} md={8}>
                    <Grid container className='filterBox' component={Paper}>
                        <Grid xs={12} sm={4} md={3} className='filter-input-Grid'>
                            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} fullWidth className='form-control'>
                                <InputLabel id="demo-simple-select-filled-label" >URL</InputLabel>
                                <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={filterData.url}
                                onChange={handleChangeSelectForm}
                                name="url"
                                fullWidth
                                >
                                <MenuItem value={""}>All</MenuItem>
                                <MenuItem value={"/signup"}>Signup</MenuItem>
                                <MenuItem value={"/login"}>Login</MenuItem>
                                <MenuItem value={"/create-app"}>Create app</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={12} sm={4} md={3} className='filter-input-Grid'>
                            <TextField
                                id="filled-basic"
                                label="نام برنامه(disabled)"
                                variant="filled"
                                onChange={handleChangeValue}
                                name="appName"
                                value={filterData.appName}
                                fullWidth
                                className='inputs'
                                disabled
                            />
                        </Grid>
                        <Grid xs={12} sm={4} md={3} className='filter-input-Grid'>
                            <TextField
                                id="filled-basic"
                                label="User ID(disabled)"
                                variant="filled"
                                // onChange={handleChangeValue}
                                name="appName"
                                // value={filterData.appName}
                                fullWidth
                                className='inputs'
                                disabled
                            />
                        </Grid>
                        <Grid xs={12}>
                            <button onClick={submitFilter}>
                                اعمال فیلتر
                            </button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} sm={1} md={2}></Grid>

            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={1} sm={1} md={2}></Grid>
                <Grid item xs={10} sm={10} md={8}>
                    <TableContainer className='userlog-table'  component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">URL</TableCell>
                                    <TableCell align="left">اطلاعات</TableCell>
                                </TableRow>
                            </TableHead>
                                {tookenData && 
                                    <TableBody>
                                        {tookenData.map(item => {
                                            return(
                                                <TableRow>
                                                    <TableCell align="left">
                                                        {item.url}
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <Accordion className="accordin"expanded={expanded === item._id} onChange={handleChange(item._id)}>
                                                            <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                            >
                                                                <p className='accordionTitle'>id = {item._id} </p>
                                                            </AccordionSummary>
                                                            <AccordionDetails className="AccordionDetails">
                                                                <div>
                                                                    <p>: Input</p>
                                                                    <span>{item.input}</span>
                                                                </div>
                                                                <div>
                                                                    <p>: Output</p>
                                                                    <span>{item.output}</span>
                                                                </div>
                                                                <div>
                                                                    <p>: CreatedAt</p>
                                                                    <span>{item.createdAt}</span>
                                                                </div>
                                                                <div>
                                                                    <p>: Header</p>
                                                                    <span>{item.header}</span>
                                                                </div>
                                                                <div>
                                                                    <p>: StatusCode</p>
                                                                    <span>{item.statusCode}</span>
                                                                </div>
                                                                <div>
                                                                    <p>: TrackId</p>
                                                                    <span>{item.trackId}</span>
                                                                </div>
                                                                <div>
                                                                    <p>: UpdatedAt</p>
                                                                    <span>{item.updatedAt}</span>
                                                                </div>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                }
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={1} sm={1} md={2}></Grid>
            </Grid>
        </>
    )
};

export default UserLog;