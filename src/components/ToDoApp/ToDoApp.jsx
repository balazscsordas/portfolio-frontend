import React, { useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function ToDoApp() {

    const [posts, setPosts] = useState([]);

    function deletePost(id){
        setPosts(posts.filter((post, index) => index !== id));
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