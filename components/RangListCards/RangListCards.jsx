'use client'
import RangListCard from '@components/RangListCard/RangListCard';
import {useEffect, useState}from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RangListCards = () => {
    const [posts, setPosts] = useState([])
    useEffect(() =>{
        const fetchPosts = async () => {
            try{
                const res = await fetch('/api/organizator/getLikes');
                if(!res.ok){
                    new Error(res.text);
                }
                const data = await res.json();
                console.log(data);
                setPosts(data);
            }catch(e){
                toast.error(e.message);
            }
        };
        fetchPosts();
    },[]);
  return (
        posts && (posts.map((post) => 
        <RangListCard
            user={post.user}
            email={post.email}
            events={post.events}
            tel={post.tel}
            likes={post.likes}
        />))
  )
}

export default RangListCards