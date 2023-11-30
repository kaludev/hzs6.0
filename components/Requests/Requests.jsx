
import { useSession } from 'next-auth/react';
import { useState,useEffect } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequestCard from "@components/RequestCard/RequestCard";
import styles from '@components/RequestCard/RequestCard.module.css'
import emptyStyles from './Requests.module.css'

const RequestCardList = ({data,handleConfirm,handleDecline}) =>{
  return (
    <section className={styles.cardsMainSection}>
            <section className={styles.cardsSection}>
            {
                data && data.length > 0 ? (
                    data.map(request =>(
                    <RequestCard key={request._id}
                    data = {request}
                    handleConfirm={() => handleConfirm(request._id)}
                    handleDecline={() => handleDecline(request._id)}
                    />
                ))) : (
                    <div className={emptyStyles.emptyArr}><span className={emptyStyles.colored}>Čestitamo!</span><br /> Odgovorili ste na sve zahteve. Trenutno nema novih zahteva.</div>
                )
            }
        </section>
    </section>
  )
}
const Requests = () => {
    const [Posts, setPosts] = useState([]);
    const {data: session} = useSession();
    const handleConfirm= async (id) => {
        const copy = [];
        Posts.forEach(post =>{
            if(post._id !== id){ 
                copy.push(post);
            }
        })
        setPosts(copy);
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
        const copy = [];
        Posts.forEach(post =>{
            if(post._id !== id){ 
                copy.push(post);
            }
        })
        setPosts(copy);
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