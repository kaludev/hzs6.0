"use client"
import { useSession } from "next-auth/react"
import { useState } from "react";
import Form from "@components/OrganizerRequestForm/Form";
import "@styles/margin.css"
const Profile = () => {
    const {data: session} = useSession();
    const [settings, setSettings] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [request, setRequest] = useState({
        name: "",
        EventTypes:"",
        reason: ""
    })
    const handleFormOpen = () =>{
        setShowForm((value) => !value)
    }
    return (

    (settings ? (
        <div>
            
        </div>
    ):(
        <div>
            <div>Profile</div>

            {
                !showForm && <button 
                type="button"
                onClick={() => setShowForm((prev) => !prev)}
                >Podnesi zahtev da postanes organizator</button>
            }
            <Form 
            show={showForm}

            />
        </div>
    ) )    
    
    )
}

export default Profile