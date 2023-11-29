
import { useSession } from 'next-auth/react';
import { useState,useEffect } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestCardList = ({data,handleConfirm,handleDecline}) =>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map(request =>(
        <RequestCard key={request._id}
        data = {request}
        handleConfirm={() => handleConfirm(request._id)}
        handleDecline={() => handleDecline(request._id)}
         />
      ))}
    </div>
  )
}
const Requests = () => {
    const [Posts, setPosts] = useState([]);
    const {data: session} = useSession();
    const handleConfirm= async (id) => {
        try{
            const res = await fetch(`/api/organizator/confirmreq/${id}`);
            if(!res.ok){
                new Error(res.text);
            }else{
                toast.success("Uspesno prihvacen zahtev");
            }
        }catch(e){
            toast.error(e.message);
        }
    };
    const handleDelete= async (id) => {
        try{
            const res = await fetch(`/api/organizator/declinereq/${id}`);
            if(!res.ok){
                new Error(res.text);
            }else{
                toast.success("Uspesno odbijen zahtev");
            }
        }catch(e){
            toast.error(e.message);
        }
    };
    useEffect( () =>{
        const fetchPosts = async () => {
            if(session?.user.isSuperAdmin) {
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
            }
        };
        fetchPosts();

    },[session])
    return (
        <section className='Requests' >
        <RequestCardList
            data = {Posts}
            handleConfirm={handleConfirm}
            handleDecline = {handleDelete}
            />
        </section>
    )

}

export default Requests