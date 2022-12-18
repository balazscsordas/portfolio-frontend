import { useContext, useEffect, useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import AuthContext from "../../context/AuthProvider";

const NoteCollector = () => {

    type Posts = {
        title: string,
        content: string,
      }[];

    const { auth } = useContext(AuthContext);
    const [posts, setPosts] = useState<Posts>([]);

    const deletePost = (id: number) => {
        auth.firstName && deleteUserPost(id);
        setPosts(posts.filter((_post, index) => index !== id));
    }

    const deleteUserPost = async (index: number) => {
        try {
            const url = process.env.REACT_APP_BASEURL + "/api/toDoApplication/deletePost";
            const params = { userId: auth.id, index: index };
            const response = await axios.post(url, params);
            console.log(response.data.message);
        }
        catch (err) {
            err instanceof Error && console.log(err.message);
        }
    }

    useEffect(() => {
        auth.id ? fetchUsersPosts() : setPosts([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);
    

    const fetchUsersPosts = async () => {
        try {
            const url = process.env.REACT_APP_BASEURL + "/api/toDoApplication/fetchPosts";
            const params = { userId: auth.id }
            const response = await axios.post(url, params);
            setPosts(response.data.foundPosts);
        }
        catch (err) {
            err instanceof Error && console.log(err.message);
        } 
    }

    return (
        <section id="to-do-app-section" className="mt">
            <Container>
                <Row>
                    <CreateArea posts={posts} setPosts={setPosts} />
                </Row>
                <Row>
                    {posts.map((element, index) =>(
                        <Note
                            key={index}
                            id={index}
                            title={element.title}
                            content={element.content}
                            deletePost={deletePost}
                        />
                    ))}
                </Row>
            </Container>
        </section>
    )
};

export default NoteCollector;