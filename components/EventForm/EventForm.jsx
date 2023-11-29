import { useState } from 'react';
import styles from './EventForm.module.css'

const EventForm = ({type,event, setEvent, submitting,setSubmitting,backToProfile}) => {

    async function handleSubmit(e) {
        e.preventDefault();
        let valid = true;
        setSubmitting(true);
        if (event.ime.value == ``) {
            const copy = { ...event };
            copy['ime'].error = true;
            copy['ime'].errorMsg = "Morate uneti ime";
            setEvent(copy);
            valid = false;
        }
        else{
            const copy = { ...event };
            copy['ime'].error = false;
            copy['ime'].errorMsg = "";
            setEvent(copy);
        }

        if (event.lokacija.value == ``) {
            const copy = { ...event };
            copy['lokacija'].error = true;
            copy['lokacija'].errorMsg = "lokaciju";
            setEvent(copy);
            valid = false;
        }else {
            const copy = { ...event };
            copy['lokacija'].error = false;
            copy['lokacija'].errorMsg = "";
            setEvent(copy);
        }

        if (event.max.value == ``) {
            const copy = { ...event };
            copy['max'].error = true;
            copy['max'].errorMsg = "Morate uneti telefon";
            setEvent(copy);
            valid = false;
        }else if(!isNaN(event.max.value) && !isNaN(parseFloat(event.max.value))){
            const copy = { ...event };
            copy['max'].error = true;
            copy['max'].errorMsg = "Morate uneti telefon";
            setEvent(copy);
            valid = false;
        }
        else{
            const copy = { ...event };
            copy['max'].error = false;
            copy['max'].errorMsg = "";
            setEvent(copy);
        }

        if (event.poruka.value == "") {
            const copy = { ...event };
            copy['poruka'].error = true;
            copy['poruka'].errorMsg = "Morate uneti poruku";
            setEvent(copy);
            valid = false;
        }

        else{
            const copy = { ...event };
            copy['poruka'].error = false;
            copy['poruka'].errorMsg = "";
            setEvent(copy);
        }
        
        if(!valid){
            setSubmitting(false);
            toast.error("Greska u validaciji");
            return;
        } 
        const body = {
            ime: event.ime.value,
            lokacija: event.lokacija.value,
            vremeOd;
            max: event.max.value,
            emailKluba: event.emailKluba.value,
            poruka: event.poruka.value
        }

        let copy = JSON.parse(JSON.stringify(event)) // deep copy
        copy.ime.value = "";
        copy.email.value = "";
        copy.poruka.value = "";
        setEvent(copy)
        try{
            const res = await fetch('/api/organizator/event',{
                    method : "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body)
                })
            if(!res.ok){
                setSubmitting(false);
                throw new Error(await res.text());
            }
            setSubmitting(false);
            toast.success("Uspesno pozlan zahtev",{
                position: toast.POSITION.TOP_RIGHT
            });
            backToProfile();
        }catch(e){
            toast.error("Greska: " + e.message);
        }
    }

    function handleChange(e) {
        const copy = { ...event };
        copy[e.target.name].value = e.target.value;
        setEvent(copy);
    }

    function handleFocus(e) {
        const copy = { ...event };
        copy[e.target.name].focus = true;
        setEvent(copy);
    }

    function handleBlur(e) {
        const copy = { ...event };
        copy[e.target.name].focus = !!copy[e.target.name].value;
        setEvent(copy);
    }
  return (
    <>
    <section className={styles.contactSec}>
            <h2>{type} događaj i omogućite takmičarima da se prijave i učestvuju</h2>
            <div className={styles.formContainer}>
                <form className={`${styles.contactForm} `} name="contactForm" onSubmit={handleSubmit}>
                    <div className={`${styles.inputBox} ${event.ime.error ? styles.error : ""} ${event.ime.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Naziv</label>
                        <input value={event.ime.value} type="text" className={styles.input1} name="ime" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{event.ime.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${event.lokacija.error ?  styles.error : ""} ${event.lokacija.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Lokacija</label>
                        <input value={event.lokacija.value} type="text" className={styles.input1} name="lokacija" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{event.lokacija.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${event.vremeOd.error ?  styles.error : ""} ${event.vremeOd.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Vreme od</label>
                        <input value={event.vremeOd.value} type="text" className={styles.input1} name="vremeOd" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{event.vremeOd.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${event.vremeDo.error ?  styles.error : ""} ${event.vremeDo.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Vreme do</label>
                        <input value={event.vremeDo.value} type="text" className={styles.input1} name="vremeDo" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{event.vremeDo.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${event.max.error ?  styles.error : ""} ${event.max.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Maksimalan broj učesnika</label>
                        <input value={event.max.value} type="text" className={styles.input1} name="max" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{event.max.errorMsg}</p>
                    </div>
                    <div className={styles.eventTypes}>
                        <p className={styles.typeName}>Tip Događaja</p>

                        <input type="radio" name="eventTypes" id="eventTypes" 
                        value="Na otvorenom" checked ={event.eventTypes === "Na otvorenom"}
                        onChange={(e) =>{setEvent({...event,eventTypes: e.target.value})}}/>
                        <span className={styles.eventType}>Na otvorenom</span><br />

                        <input type="radio" name="eventTypes" id="eventTypes" 
                        value="Na zatvorenom" checked ={event.eventTypes === "Na zatvorenom"} 
                        onChange={(e) =>{setEvent({...event,eventTypes: e.target.value})}}/>
                        <span className={styles.eventType}>Na zatvorenom</span><br />

                        <input type="radio" name="eventTypes" id="eventTypes" 
                        value="Na otvorenom i zatvorenom" checked ={event.eventTypes === "Na otvorenom i zatvorenom"}
                        onChange={(e) =>{setEvent({...event,eventTypes: e.target.value})}}/>
                        <span className={styles.eventType}>Na otvorenom i zatvorenom</span><br />
                    </div>
                    <div className={styles.select}>
                        <select className={styles.selectText} required>
                            <option value="" disabled selected></option>
                            <option value="1">Međunarodno</option>
                            <option value="2">Državno</option>
                            <option value="3">Opštinsko</option>
                            <option value="4">Školsko</option>
                            <option value="5">Drugo</option>
                        </select>
                        <span className={`${styles.selectHighlight}`}></span>
                        <span className={`${styles.selectBar} `}></span>
                        <label className={`${styles.selectLabel}`}>Tip takmičenja</label>
				    </div>
                    <div className={`${styles.inputBox} ${event.poruka.error ?  styles.error : ""} ${event.poruka.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Opis</label>
                        <textarea value={event.poruka.value} type="text" className={styles.input1} rows="10" name="poruka" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                        <p className={styles.errorMessage}>{event.poruka.errorMsg}</p>
                    </div>
                    <div className="submitButtonBox">
                        <button type="submit"
                        className={`${styles.primaryButton} primaryButton`}
                        onClick={handleSubmit}>{submitting ? "Slanje zahteva..." : "Pošalji zahtev"}</button>
                    </div>
                </form>
            </div>
        </section>
    </>
  )
}

export default EventForm