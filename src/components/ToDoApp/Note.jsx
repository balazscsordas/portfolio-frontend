import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Col from 'react-bootstrap/Col'
import Zoom from '@mui/material/Zoom';

function Note(props) {

  return (
    <Col md={4} className="note-block">
      <Zoom in={props.title && true}>
        <div className="note">
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={() => props.deletePost(props.id)} ><DeleteIcon /></button>
        </div>
      </Zoom>
    </Col>
    
  );
}

export default Note;
