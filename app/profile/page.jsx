"use client"

import { getProviders, signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import ProfileSection from "@components/Profile/Profile";
import OrganizationForm from "@components/OrganizationForm/OrganizationForm";
import "@styles/margin.css"
import SettingsForm from "@components/SettingsForm/SettingsForm";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
    const {data: session} = useSession();
    const [settings, setSettings] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [deactivating, setDeactivating] = useState(false);
    const router = useRouter();
    const [request, setRequest] = useState({
        ime: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        email: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        nazivKluba: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        emailKluba: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        telefon: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        poruka: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        }
    })
    const [profile,setProfile] = useState({
        ime: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        email: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        },
        username: {
            value: "",
            focus: false,
            error: false,
            errorMsg: ""
        }
    })
    const [submitting, setSubmitting] = useState(false)
    const handleDeactivate = async () => {
        setDeactivating(true);
        try{
            const res = await fetch('/api/user/deactivate')
            if(!res.ok){
                setDeactivating(false);
                throw new Error(await res.text());
            }
            setDeactivating(false);
            toast.success("Uspesno poslan zahtev",{
                position: toast.POSITION.TOP_RIGHT
            });
            await signOut();
            await router.push("/")
        }catch(e){
            toast.error("Greska: " + e.message);
        }
    }
    
    useEffect(() =>{
        setProfile({
            ime: {
                value: session?.user.name,
                focus: true,
                error: false,
                errorMsg: ""
            },
            email: {
                value: session?.user.email,
                focus: true,
                error: false,
                errorMsg: ""
            },
            username: {
                value: session?.user.username,
                focus: true,
                error: false,
                errorMsg: ""
            }
        })
    }, [session] )
    return (
            <div>
                <ProfileSection 
                name={session?.user.name}
                username={session?.user.username}
                photo ={session?.user.image}
                isSuperAdmin={session?.user.isSuperAdmin}
                requestedOrganizer={session?.user.requestedOrganizer}
                isOrganizer={session?.user.isOrganizer}
                form = {showForm}
                showForm={() => {setShowForm((prev) => !prev);setSettings(false)}}
                settings={settings}
                showSettings={() => {setSettings((prev) => !prev); setShowForm(false)}}
                showEvents={() => {setEvents((prev) => !prev); setShowForm(false)}}
                showRequests={() => {setRequests((prev) => !prev); setShowForm(false)}}
                handleSignOut={async () =>{await signOut(); window.location.href ='/'}}
                handleDeactivate={handleDeactivate}
                deactivating={deactivating}
                />
                {showForm && 
                    <OrganizationForm
                    request={request}
                    setRequest={setRequest}
                    submitting={submitting}
                    setSubmitting={setSubmitting}
                    backToProfile={() =>{ setSettings(false); setShowForm(false)}}
                    />
                }
                {settings && 
                    <SettingsForm
                        profile={profile}
                        setProfile={setProfile}
                        backToProfile={() =>{ setSettings(false); setShowForm(false);window.location.reload();}}
                    />
                    }
            </div>
            
    )
}

export default Profile