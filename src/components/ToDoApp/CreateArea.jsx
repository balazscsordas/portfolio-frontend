import React, {useState} from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {

  const [text, setText] = useState({
    title: "",
    content: ""
  });
  const [errorMessage, setErrorMessage] = useState("")

  const [showContent, setVisibility] = useState(false); // Ezt használom a Content block eltüntetéséhez, mutatásához kattintás esetén


  function textChange(event) {
    const {name, value} = event.target;

    setText(prevText => {
      return {
        ...prevText,
        [name]: value // Azért kell [], mert Spread-nél csak így ismeri fel, hogy változó
      }
    })
  };

  function addPost(event){
    event.preventDefault();
    if (text.title && text.content) {
      setErrorMessage("");
      props.setPosts(previousPosts => [...props.posts, text]); // Hozzáadja a posts tömbhöz a jelenlegi Post-ot
      setText({
        title: "",
        content: ""
      })
    } else {
      setErrorMessage("Please fill out both fields.");
    }
  }

  return (
    <div>
      <form className="create-note">
        <input onClick={() => setVisibility(true)} onChange={textChange} value={text.title} name="title" placeholder="Title" maxLength="25"/>
        {showContent && (
          <textarea onChange={textChange} value={text.content} name="content" placeholder="Take a note..." rows={showContent ? "4" : "1"} maxLength="120"/>
        )}
        <Zoom in={showContent && true}>
          <Fab onClick={addPost}><AddCircleIcon /></Fab>
        </Zoom>
      </form>
      <Zoom in={errorMessage}>
        <div className="error-div">
          <p className="error-text">{errorMessage}</p>
        </div>
      </Zoom>
    </div>
  );
}

export default CreateArea;
