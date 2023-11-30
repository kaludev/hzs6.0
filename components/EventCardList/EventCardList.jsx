"use client"
import Events from '@components/Events/Events';
import { useEffect, useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';
import { getProviders, signIn, useSession } from 'next-auth/react';

const EventCardList = ({mode}) => {
    const { data:session} = useSession();
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [ providers, setProviders ] = useState(null);
    useEffect(() =>{
        if(mode === 'all'){
            const fetchPosts = async () => {
                try{
                    const res = await fetch('/api/event/getEvents');
                    const posts = await res.json()
                    if(!res.ok) return new Error(res.text);
                    setData(posts);
                    console.log(posts);
                }catch(e){
                    toast.error(e.message);
                }
              };
              fetchPosts();
        }else if(session?.user){
            const fetchPosts = async () => {
                try{
                    const res = await fetch('/api/event/getUserEvents');
                    const posts = await res.json()
                    if(!res.ok) return new Error(res.text);
                    setData(posts);
                    console.log(posts);
                }catch(e){
                    toast.error(e.message);
                }
              };
              fetchPosts();
        }
        
    },[]);
    function removeValue(value, index, arr) {
        // If the value at the current array index matches the specified value (2)
        if (value === session?.user.id) {
        // Removes the value from the original array
            arr.splice(index, 1);
            return true;
        }
        return false;
    }
    const handleSubmit= async (id) => {
        console.log(id);
        try{
            const res = await fetch(`/api/event/join/${id}`);
            if(!res.ok){
                throw new Error(res.text);
            }
            toast.success("Uspesno prihvacen zahtev");
            const copy = [... data];
            console.log(copy);
            copy.forEach(event =>{
                console.log(event);
                if(event._id == id){
                    event.users_signed.push(session?.user.id);
                    console.log(event);
                }
            })
            setData(copy)
            return true;
        }catch(e){
            toast.error(e.message);
            return false;
        }
    };
    const handleLeave= async (id) => {
        console.log(id);
        try{
            const res = await fetch(`/api/event/leave/${id}`);
            if(!res.ok){
                new Error(res.text);
            }
            toast.success("Uspesno prihvacen zahtev");
            const copy = [... data];
            console.log(copy);
            copy.forEach(event =>{
                
                if(event._id == id){
                    event.users_signed.filter(removeValue);
                    console.log(event);
                }
            })
            setData(copy)
        }catch(e){
            toast.error(e.message);
        }
    };
    useEffect(() => {
        const setUpProviders = async () => {
          const res = await getProviders();
          setProviders(res);
        };
        setUpProviders();
      }, []);
  return (
    data? <Events 
    user_id={session?.user._id}
    data={data}
    handleSubmit={session?.user && handleSubmit}
    handleLeave={session?.user && handleLeave}
    providers={providers}
    signIn={signIn}
    /> : <div>loading....</div>
  )
}

export default EventCardList