import React, { useState, useRef, useContext } from "react";
import Container from 'react-bootstrap/Container';
import { Button } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

type Clients = {
    name: string;
    age: string;
    basicInformation: string;
    allergies: string;
    injuries: string;
  }

type Props = {
    clients: {
        name: string;
        age: string;
        basicInformation: string;
        allergies: string;
        injuries: string;
    }[];
    setClients: React.Dispatch<React.SetStateAction<Clients[]>>;
  }

const AddClients = ({ clients, setClients }: Props) => {

    const { auth } = useContext(AuthContext);
    const [collapseState, setCollapseState] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const allergiesRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const injuriesRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const basicInformationRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [inputData, setInputData] = useState({
        name: "",
        age: ""
    })

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newClient: Clients = {
            name: nameRef.current.value,
            age: inputData.age,
            basicInformation: basicInformationRef.current.value,
            allergies: allergiesRef.current.value,
            injuries: injuriesRef.current.value
        }
        auth.id && addNewClientToDatabase(newClient);
        setClients(_previousClients => [newClient, ...clients]);
        nameRef.current.value = "";
        setInputData({
            name: "",
            age: ""
        })
        basicInformationRef.current.value = "";
        allergiesRef.current.value = "";
        injuriesRef.current.value = "";
        setCollapseState(false);
        setShowAlert(true);
    }

    const addNewClientToDatabase = async (data: Clients) => {
        try {
            const url = process.env.REACT_APP_BASEURL + "/api/trainer-app/add-new-client";
            const params = {clientData: data, trainerId: auth.id};
            const response = await axios.post(url, params);
            console.log(response.data.message);
        }
        catch (err) {
            console.log(err);
        }
    }

    const changeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if(!value || ( value[value.length-1].match('[0-9]') && value[0].match('[1-9]'))) {
            if (value.length < 3) {
                setInputData(prevData => {
                    return {
                        ...prevData,
                        [name]: value
                    }
                })
            }
        }
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
      };

    return (
        <section id="add-client-section" className="mt">
            <Snackbar 
                open={showAlert} 
                autoHideDuration={3000} 
                onClose={handleCloseAlert}
                >
                <MuiAlert 
                    onClose={handleCloseAlert} 
                    elevation={6}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    New client has been added!
                </MuiAlert>
            </Snackbar>

            <Container>
                <Collapse in={!collapseState}>
                    <Button onClick={() => {setCollapseState(!collapseState)}} variant="contained">add new client</Button>
                </Collapse>
                <Collapse in={collapseState} className="collapse-block">
                    <Box className="form" component="form" onSubmit={handleSubmit}>
                        <div className="form-header">
                            <TextField
                                margin="normal"
                                required
                                inputRef={nameRef}
                                id="name"
                                label="Name"
                                name="name"
                                autoFocus
                            />
                            <TextField
                                className="age-input"
                                margin="normal"
                                required
                                onChange={changeInputData}
                                value={inputData.age}
                                id="age"
                                label="Age"
                                name="age"
                            />
                            <IconButton onClick={() => {setCollapseState(!collapseState)}} aria-label="exit" className="exit-icon">
                                <CancelIcon/>
                            </IconButton>
                        </div>
                        <div className="form-body">
                            <TextField
                                margin="normal"
                                rows={2}
                                fullWidth
                                multiline
                                inputRef={basicInformationRef}
                                id="basicInformation"
                                label="Basic Information"
                                name="basicInformation"
                            />
                            <TextField
                                margin="normal"
                                rows={2}
                                fullWidth
                                multiline
                                inputRef={allergiesRef}
                                id="allergies"
                                label="Allergies"
                                name="allergies"
                            />
                            <TextField
                                margin="normal"
                                rows={2}
                                fullWidth
                                multiline
                                inputRef={injuriesRef}
                                id="injuries"
                                label="Injuries"
                                name="injuries"
                            />
                            <Button className="submit-button" type="submit" variant="contained" name="weatherAppButton">add new client</Button>
                        </div>
                    </Box>
                </Collapse>
            </Container>
        </section>
    )
}

export default AddClients;