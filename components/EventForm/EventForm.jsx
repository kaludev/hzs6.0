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

        if (event.email.value == ``) {
            const copy = { ...event };
            copy['email'].error = true;
            copy['email'].errorMsg = "Morate uneti email";
            setEvent(copy);
            valid = false;
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.email.value)) {
            const copy = { ...event };
            copy['email'].error = true;
            copy['email'].errorMsg = "Unesite ispravnu email adresu";
            setEvent(copy);
            valid = false;
        }
        else {
            const copy = { ...event };
            copy['email'].error = false;
            copy['email'].errorMsg = "";
            setEvent(copy);
        }

        if (event.nazivKluba.value == ``) {
            const copy = { ...event };
            copy['nazivKluba'].error = true;
            copy['nazivKluba'].errorMsg = "Morate uneti naziv Kluba";
            setEvent(copy);
            valid = false;
        }
        else{
            const copy = { ...event };
            copy['nazivKluba'].error = false;
            copy['nazivKluba'].errorMsg = "";
            setEvent(copy);
        }

        if (event.emailKluba.value == ``) {
            const copy = { ...event };
            copy['emailKluba'].error = true;
            copy['emailKluba'].errorMsg = "Morate uneti email Kluba";
            setEvent(copy);
            valid = false;
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.emailKluba.value)) {
            const copy = { ...event };
            copy['emailKluba'].error = true;
            copy['emailKluba'].errorMsg = "Unesite ispravnu email adresu";
            setEvent(copy);
            valid = false;
        }
        else {
            const copy = { ...event };
            copy['emailKluba'].error = false;
            copy['emailKluba'].errorMsg = "";
            setEvent(copy);
        }

        if (event.telefon.value == ``) {
            const copy = { ...event };
            copy['telefon'].error = true;
            copy['telefon'].errorMsg = "Morate uneti telefon";
            setEvent(copy);
            valid = false;
        }
        else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/.test(event.telefon.value)) {
            const copy = { ...event };
            copy['telefon'].error = true;
            copy['telefon'].errorMsg = "Unesite ispravan broj telefona";
            setEvent(copy);
            valid = false;
        }
        else{
            const copy = { ...event };
            copy['telefon'].error = false;
            copy['telefon'].errorMsg = "";
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
            email: event.email.value,
            nazivKluba: event.nazivKluba.value,
            emailKluba: event.emailKluba.value,
            telefon: event.telefon.value,
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