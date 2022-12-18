import React, {useContext, useState} from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

type Posts = {
  title: string;
  content: string;
}

type Props = {
  posts: {
    title: string,
    content: string,
  }[];
  setPosts: React.Dispatch<React.SetStateAction<Posts[]>>;
}

const CreateArea = ({ posts, setPosts }: Props) => {

  const { auth } = useContext(AuthContext);
  const [text, setText] = useState({
    title: "",
    content: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showContent, setVisibility] = useState(false);
  
  const textChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const {name, value} = event.target;
    setText(prevText => {
      return {
        ...prevText,
        [name]: value // spread
      }
    })
  };

  const addPost = () => {
    if (text.title && text.content) {
      auth.firstName && addPostToDatabase(text);
      setErrorMessage("");
      setPosts(() => [...posts, text]);
      setText({
        title: "",
        content: ""
      })
    } else {
      setErrorMessage("Please fill out both fields.");
    }
  }

  type Post = {
    title: string;
    content: string;
  }

  const addPostToDatabase = async (post: Post) => {
    try {
      const url = process.env.REACT_APP_BASEURL + "/api/toDoApplication/addPost";
      const params = {postData: post, user: auth};
      const response = await axios.post(url, params);
      console.log(response.data.message);
    }
    catch (err) {
      err instanceof Error && console.log(err.message);
    }
  }

  return (
    <div>
      <form className="create-note">
        <input 
          onClick={() => setVisibility(true)} 
          onChange={textChange}
          value={text.title}
          name="title"
          placeholder="Title"
          maxLength={25}
        />
        {showContent && (
          <textarea 
            onChange={textChange} 
            value={text.content} 
            name="content" 
            placeholder="Take a note..." 
            rows={showContent ? 4 : 1} 
            maxLength={120}
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