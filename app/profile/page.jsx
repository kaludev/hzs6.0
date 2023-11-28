"use client"

import { getProviders, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import ProfileSection from "@components/Profile/Profile";
import OrganizationForm from "@components/OrganizationForm/OrganizationForm";
import "@styles/margin.css"
import Settings from "@components/Settings/Settings";
import { useRouter } from "next/navigation";
const Profile = () => {
    const {data: session} = useSession();
    const [settings, setSettings] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [providers, setProviders] = useState(null)
    const [request, setRequest] = useState({
        name: "",
        eventTypes:"",
        reason: ""
    })
    const [profile,setProfile] = useState({
        name: "",
        
    })
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter();

    return (
            <div>
                <ProfileSection 
                name={session?.user.name}
                username={session?.user.username}
                photo ={session?.user.image}
                isOrganizer={session?.user.isOrganizer}
                form = {showForm}
                showForm={() => {setShowForm((prev) => !prev);setSettings(false)}}
                settings={settings}
                showSettings={() => {setSettings((prev) => !prev); setShowForm(false)}}
                handleSignOut={async () =>{await signOut(); window.location.href ='/'}}
                />
                {showForm && 
                    <OrganizationForm
                    request={request}
                    setRequest={setRequest}
                    submitting={submitting}
                    />
                }
                {settings && 
                    <Settings/>
                    }
            </div>
            
    )
}

export default Profile