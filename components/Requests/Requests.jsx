
import { useState,useEffect } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PromptCardList = ({data,handleTagClick}) =>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map(post =>(
        <RequestCard key={post._id}
        post = {post}
        handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}
const Requests = (session,isSuperAdmin) => {
  const [Posts, setPosts] = useState([]);

  useEffect( () =>{
    const fetchPosts = async () => {
        try{
            const res = await fetch('/api/organizator/getrequests');
            if(!res.ok){
                new Error(res.text);
            }
            const data = await res.json()
            setPosts(data);
        }catch(e){
            toast.error(e.message);
        }
    };
    fetchPosts();

  },[session])
  return (
    <section className='Requests' >
      <RequestCardList
        data = {Posts}
        />
    </section>
  )

}

export default Requests