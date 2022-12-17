import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import AuthContext from "../../context/AuthProvider";

const GameResults = () => {

    type RanklistUsers = {
        firstName: string;
        bestScore: number;
    }[];

    const { auth } = useContext(AuthContext);
    const [ranklistUsers, setRanklistUsers] = useState<RanklistUsers>([]);

    const getDataForRanklist = async () => {
        try {
            const url = process.env.REACT_APP_BASEURL + "/api/ranklist";
            const response = await axios.get(url);
            setRanklistUsers(response.data.foundUsers);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getDataForRanklist();
    }, [auth.bestScore])

    return (
        <section className="mt">
            <div className="mbt">
                <h3>Hello {auth?.firstName}</h3>
                <p>Your best score is: {auth.bestScore}</p>  
            </div>
            {ranklistUsers && 
                <div className="ranklist">
                    <h3>Top 10 scores</h3>
                    <div>
                        {ranklistUsers.map((user, index) => (
                            <div className="ranklist-row" key={index}>
                                <span className="index">{index + 1}</span>
                                <span className="name">{user.firstName}</span>
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