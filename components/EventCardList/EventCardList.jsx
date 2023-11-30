"use client"
import Events from '@components/Events/Events';
import { useEffect, useState } from 'react'
import "react-toastify/dist/ReactToastify.css";
import {toast} from 'react-toastify';

const EventCardList = () => {
    const [data, setData] = useState([]);
    useEffect(() =>{
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
    },[]);
    const handleSubmit= (id) => {
        
    };
  return (
    data ? <Events 
    data={data}
    handleSubmit={handleSubmit}
    /> : <div>loading....</div>
  )
}

export default EventCardList