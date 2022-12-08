import axios from "axios";
import React, { useEffect, useState } from "react";
import AddClients from "./AddClients";
import Client from "./Client";
import useAuth from "../../hooks/useAuth";

function TrainerApp() {

    const [clients, setClients] = useState([]);
    const { auth } = useAuth();

    const deleteClient = (id) => {
        setClients(clients.filter((client, index) => index !== id));
    }

    const editClient = (id, basicInformationData, allergiesData, injuriesData) => {
        const editedClients = clients.map((client, index) => {
            if (index === id) {
                return {
                    ...client,
                    basicInformation: basicInformationData,
                    allergies: allergiesData,
                    injuries: injuriesData
                }
            } else {
                return client;
            }
        })
        setClients(editedClients);
    }

    const fetchClientsFromDatabase = async (data) => {
        const url = process.env.REACT_APP_BASEURL + "/api/trainer-app/fetch-clients";
        const params = {userId: data};
        const response = await axios.post(url, params);
        setClients(response.data.foundClients);
    }

    useEffect(() => {
        auth.id ? fetchClientsFromDatabase(auth.id) : setClients([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth])

    return (
        <>
            <AddClients clients={clients} setClients={setClients}/>
            <section id="client-section">
                <h2 className="mbt">My Clients</h2>
                {clients.map((client, index) => (
                    <Client 
                        key={index}
                        id={index}
                        name={client.name}
                        age={client.age}
                        basicInformation={client.basicInformation}
                        allergies={client.allergies}
                        injuries={client.injuries}
                        deleteClient={deleteClient}
                        editClient={editClient}
                    />
                ))}
            </section>
        </>
    )
}

export default TrainerApp;