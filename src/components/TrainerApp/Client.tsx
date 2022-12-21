import React, { useState, useRef, useEffect, useContext } from "react";
import Container from 'react-bootstrap/Container';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Zoom from '@mui/material/Zoom';
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

interface Props {
    elementIndex: number;
    _id? : string;
    name: string;
    age: string;
    basicInformation: string;
    allergies: string;
    injuries: string;
    deleteClientLocally: (id: number) => void;
    deleteClientFromDatabase: (_id: string | undefined) => void;
    editClient: (n1: number, s1: string, s2: string, s3: string) => void;
}

interface CurrentData {
    basicInformation: string;
    allergies: string;
    injuries: string;
}

const Client = (props: Props) => {

    const { auth } = useContext(AuthContext);
    const [collapseState, setCollapseState] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editModeStateBasicInformation, setEditModeStateBasicInformation] = useState(true);
    const [editModeStateAllergies, setEditModeStateAllergies] = useState(true);
    const [editModeStateInjuries, setEditModeStateInjuries] = useState(true);
    const [showSavingAlert, setShowSavingAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const basicInformationRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const injuriesRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const allergiesRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    // Edit and save the client data

    const saveClient = () => {
        const currentData: CurrentData = {
            basicInformation: basicInformationRef.current.value,
            allergies: allergiesRef.current.value,
            injuries: injuriesRef.current.value
        };
        auth.id && sendNewClientDataToServer(props._id, currentData);
        setEditModeStateBasicInformation(true);
        setEditModeStateAllergies(true);
        setEditModeStateInjuries(true);
        props.editClient(props.elementIndex, basicInformationRef.current.value, allergiesRef.current.value, injuriesRef.current.value);
        setShowSavingAlert(true);
    }

    const sendNewClientDataToServer = async (_id: string | undefined, editedClientData: CurrentData) => {
        try {
            const url = process.env.REACT_APP_BASEURL + "/api/trainer-app/save-modified-client-data";
            const params = {_id: _id, editedClientData: editedClientData};
            const response = await axios.post(url, params);
            console.log(response.data.message);
        }
        catch(err) {
            err instanceof Error && console.log(err.message);
        }
    }

    // Delete client locally and from database

    const deleteClient = () => {
        setShowDeleteAlert(true);
        auth.id && props.deleteClientFromDatabase(props._id);
        props.deleteClientLocally(props.elementIndex);
        setDeleteDialogOpen(false);
    }

    // Dialogs + Alerts states

    const handleCloseSavingAlert = () => {
        setShowSavingAlert(false);
      };

    const handleCloseDeleteAlert = () => {
        setShowDeleteAlert(false);
      };

    const handleCloseDialog = () => {
        setDeleteDialogOpen(false);
    }

    const handleOpenDialog = () => {
        setDeleteDialogOpen(true);
    }

    // EditMode focus

    useEffect(() => {
        if (!editModeStateBasicInformation) {
            basicInformationRef.current.focus();
        }
    }, [editModeStateBasicInformation])

    useEffect(() => {
        if (!editModeStateAllergies) {
            allergiesRef.current.focus();
        }
    }, [editModeStateAllergies])

    useEffect(() => {
        if (!editModeStateInjuries) {
            injuriesRef.current.focus();
        }
    }, [editModeStateInjuries])

    return (
        <section id="client-section">
            <Snackbar 
                open={showSavingAlert} 
                autoHideDuration={3000} 
                onClose={handleCloseSavingAlert}
                >
                <MuiAlert 
                    onClose={handleCloseSavingAlert} 
                    elevation={6}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    Succesfully saved the changes!
                </MuiAlert>
            </Snackbar>
            
            <Snackbar 
                open={showDeleteAlert} 
                autoHideDuration={3000} 
                onClose={handleCloseDeleteAlert}
                >
                <MuiAlert 
                    onClose={handleCloseDeleteAlert} 
                    elevation={6}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    Succesfully removed {props.name} from your client list!
                </MuiAlert>
            </Snackbar>

            <Container>
                <div className="head-block">
                    <AccountCircleIcon className="account-icon" />
                    <h3 className="name-title">{props.name}</h3>
                    <IconButton className="hamburger-icon" onClick={() => {setCollapseState(!collapseState)}} aria-label="delete">
                        <MenuIcon />
                    </IconButton>
                </div>
                <Collapse in={collapseState}>
                    <div className="collapse-section">
                        <div className="information-block">
                            <div className="title-block">
                                <h3>Basic Information:</h3>
                                {editModeStateBasicInformation
                                    && <IconButton className="edit-icons" onClick={() => {setEditModeStateBasicInformation(false)}} aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                }
                                <p>Age: {props.age} years</p>
                            </div>
                            <TextField
                                variant="standard"
                                fullWidth
                                multiline
                                disabled={editModeStateBasicInformation}
                                inputRef={basicInformationRef}
                                defaultValue={props.basicInformation}
                            />
                        </div>
                        <div className="information-block">
                            <div className="title-block">
                                <h3>Allergies:</h3>
                                {editModeStateAllergies
                                    && <IconButton className="edit-icons" onClick={() => {setEditModeStateAllergies(false)}} aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                }
                            </div>
                            <TextField
                                variant="standard"
                                fullWidth
                                multiline
                                disabled={editModeStateAllergies}
                                inputRef={allergiesRef}
                                defaultValue={props.allergies}
                            />
                        </div>
                        <div className="information-block">
                            <div className="title-block">
                                <h3>Injuries:</h3>
                                {editModeStateInjuries
                                    && <IconButton className="edit-icons" onClick={() => {setEditModeStateInjuries(false)}} aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                }
                            </div>
                                <TextField
                                    variant="standard"
                                    fullWidth
                                    multiline
                                    disabled={editModeStateInjuries}
                                    inputRef={injuriesRef}
                                    defaultValue={props.injuries}
                                />
                        </div>
                        <div className="buttons-block">
                            <Zoom in={(!editModeStateBasicInformation || !editModeStateAllergies || !editModeStateInjuries) && true  }>
                                <Button onClick={saveClient} variant="outlined">Save</Button>
                            </Zoom>
                            <Button onClick={handleOpenDialog} variant="outlined">Delete</Button>
                            <Dialog
                                open={deleteDialogOpen}
                                onClose={handleCloseDialog}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                >
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                    Do you want to remove {props.name} from your client list?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog}>No</Button>
                                    <Button onClick={deleteClient} autoFocus>Yes</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </Collapse>
            </Container>
        </section>
    )
}

export default Client;