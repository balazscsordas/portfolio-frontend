import React, {useState} from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import useAuth from "../../hooks/useAuth";
import axios from "axios";

function CreateArea(props) {

  const [text, setText] = useState({
    title: "",
    content: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showContent, setVisibility] = useState(false);
  const { auth } = useAuth();


  const textChange = (event) => {
    const {name, value} = event.target;
    setText(prevText => {
      return {
        ...prevText,
        [name]: value // spread
      }
    })
  };


  const addPost = (event) => {
    event.preventDefault();
    if (text.title && text.content) {
      auth.firstName && addPostToDatabase(text);
      setErrorMessage("");
      props.setPosts(previousPosts => [...props.posts, text]);
      setText({
        title: "",
        content: ""
      })
    } else {
      setErrorMessage("Please fill out both fields.");
    }
  }


  const addPostToDatabase = async (post) => {
    try {
      const url = process.env.REACT_APP_BASEURL + "/api/toDoApplication/addPost";
      const params = {postData: post, user: auth};
      const response = await axios.post(url, params);
      console.log(response.data.message);
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      <form className="create-note">
        <input 
          onClick={() => setVisibility(true)} onChange={textChange}
          value={text.title}
          name="title"
          placeholder="Title"
          maxLength="25"
        />
        {showContent && (
          <textarea 
            onChange={textChange} 
            value={text.content} 
            name="content" 
            placeholder="Take a note..." 
            rows={showContent ? "4" : "1"} 
            maxLength="120"
          />
        )}
        <Zoom in={showContent && true}>
          <Fab onClick={addPost}><AddCircleIcon /></Fab>
        </Zoom>
      </form>
      <Zoom in={errorMessage.length > 0}>
        <div className="error-div">
          <p className="error-text">{errorMessage}</p>
        </div>
      </Zoom>
    </div>
  );
}

export default CreateArea;