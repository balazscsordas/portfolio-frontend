import React, { useEffect, useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from "axios";
import useAuth from "../../hooks/useAuth";

function ToDoApp() {

    const [posts, setPosts] = useState([]);
    const { auth } = useAuth();

    function deletePost(id){
        auth.firstName && deleteUserPost(id);
        setPosts(posts.filter((post, index) => index !== id));
    }

    const deleteUserPost = async (id) => {
        try {
            const url = process.env.REACT_APP_BASEURL + "/api/toDoApplication/deletePost";
            const params = { userId: auth.id, index: id };
            const response = await axios.post(url, params);
            console.log(response.data.message);
        }
        catch (err) {
            console.log(err);
        }
    }

    
    useEffect(() => {
        auth.id ? fetchUsersPosts() : setPosts([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    useEffect(() => {
        setPosts([]);
    }, [auth])

    
    const fetchUsersPosts = async () => {
        try {
            const url = process.env.REACT_APP_BASEURL + "/api/toDoApplication/fetchPosts";
            const params = { userId: auth.id }
            const response = await axios.post(url, params);
            setPosts(response.data.foundPosts);
        }
        catch (err) {
            console.log(err);
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

export default ToDoApp;