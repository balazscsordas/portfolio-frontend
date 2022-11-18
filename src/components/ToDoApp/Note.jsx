import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Col from 'react-bootstrap/Col'
import Zoom from '@mui/material/Zoom';

function Note(props) {

 // Delete-nél visszaküldöm az ID-t az App-ba + ez ugyan olyan mintha return-on kívül hívnék meg egy saját függvényt ami meghívja a beküldött delete függvényt //

  return (
    <Col md={4} className="note-block">
      <Zoom in={props.title}>
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
