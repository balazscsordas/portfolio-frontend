import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Col from 'react-bootstrap/Col'
import Zoom from '@mui/material/Zoom';

type Props = {
  title: string,
  content: string,
  id: number,
  deletePost: (id: number) => void
}

const Note = ({ title, content, id, deletePost }: Props) => {

  const [zoomIn, setZoomIn] = useState(false);

  useEffect(() => {
    title? setZoomIn(true) : setZoomIn(false);
  }, [title])

  return (
    <Col md={4} className="note-block">
      <Zoom in={zoomIn}>
        <div className="note">
          <h1>{title}</h1>
          <p>{content}</p>
          <button onClick={() => deletePost(id)} ><DeleteIcon /></button>
        </div>
      </Zoom>
    </Col>
    
  );
}

export default Note;
