import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddClients from "./AddClients";
import Client from "./Client";
import AuthContext from "../../context/AuthProvider";

const TrainerApp = () => {

    type Clients = {
        clientDatabaseId?: string;
        name: string;
        age: string;
        basicInformation: string;
        allergies: string;
        injuries: string;
    }

    const { auth } = useContext(AuthContext);
    const [clients, setClients] = useState<Clients[]>([]);


    const editClient = (elementIndex: number, basicInformationData: string, allergiesData: string, injuriesData: string) => {
        const editedClients = clients.map((client, index) => {
            if (index === elementIndex) {
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

    // Fetch Clients

    const fetchClientsFromDatabase = async (trainerId: string) => {
        try {
            const url = process.env.REACT_APP_BASEURL + "/api/trainer-app/fetch-clients";
            const params = {trainerId: trainerId};
            const response = await axios.post(url, params);
            setClients(response.data.foundClients);
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        auth.id ? fetchClientsFromDatabase(auth.id) : setClients([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth.id])

    // Delete Client

    const deleteClientLocally = (elementIndex: number) => {
        setClients(clients.filter((_client, index) => index !== elementIndex));
    }

    const deleteClientFromDatabase = async (clientDatabaseId: string | undefined) => {
        try {
            const url = process.env.REACT_APP_BASEURL + "/api/trainer-app/delete-client";
            const params = {clientDatabaseId: clientDatabaseId};
            const response = await axios.post(url, params);
            console.log(response.data.message);
        }
        catch(err) {
            err instanceof Error && console.log(err.message);
        }
    }

    return (
        <>
            <AddClients clients={clients} setClients={setClients}/>
            <section id="client-section">
                <h2 className="mbt">My Clients</h2>
                {clients.map((client, index) => (
                    <Client 
                        key={index}
                        elementIndex={index}
                        clientDatabaseId={client.clientDatabaseId}
                        name={client.name}
                        age={client.age}
                        basicInformation={client.basicInformation}
                        allergies={client.allergies}
                        injuries={client.injuries}
                        deleteClientLocally={deleteClientLocally}
                        deleteClientFromDatabase={deleteClientFromDatabase}
                        editClient={editClient}
                    />
                ))}
            </section>
        </>
    )
}

export default TrainerApp;