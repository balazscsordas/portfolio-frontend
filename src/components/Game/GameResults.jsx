import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from 'axios';

function GameResults () {

    const { auth } = useAuth();
    const [ranklistUsers, setRanklistUsers] = useState([]);

    function getDataForRanklist() {
        const options = {
            method: "GET",
            url: "/api/ranklist"
        }
        axios.request(options).then(request => {
            setRanklistUsers(request.data.foundUsers);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getDataForRanklist();
    }, [auth.bestScore])


    return (
        <section className="mt">
            <div className="mbt">
                <h3>Hello {auth?.name}</h3>
                <p>Your best score is: {auth.bestScore}</p>  
            </div>
            {ranklistUsers && 
                <div className="ranklist">
                    <h3>Top 10 scores</h3>
                    <div>
                        {ranklistUsers.map((user, index) => (
                            <div className="ranklist-row" key={index}>
                                <span className="index">{index + 1}</span>
                                <span className="name">{user.name}</span>
                                <span className="score">{user.bestScore}</span>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </section>
    )   
}

export default GameResults;