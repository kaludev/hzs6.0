"use client"

import { useSession } from "next-auth/react"
import { useState } from "react";
import ProfileSection from "@components/Profile/Profile";
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
            <ProfileSection 
            name={session?.user.name}
            username={session?.user.username}
            photo ={session?.user.image}/>
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