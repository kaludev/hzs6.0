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
        eventTypes:"",
        reason: ""
    })
    const [submitting, setSubmitting] = useState(false)
    const handleSubmit = async () =>{
        console.log(request)
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
            request={request}
            setRequest={setRequest}
            submitting={submitting}
            handleSubmit={handleSubmit}
            />
        </div>
    ) )    
    
    )
}

export default Profile