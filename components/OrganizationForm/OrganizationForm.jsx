import React from 'react'
import { useState } from 'react'
import styles from './OrganizationForm.module.css'

const OrganizationForm = ({request, setRequest, submitting}) => {
    const [formData, setFormData] = useState({
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


    async function handleSubmit(e) {
        e.preventDefault();
        let valid = true;

        if (formData.ime.value == ``) {
            const copy = { ...formData };
            copy['ime'].error = true;
            copy['ime'].errorMsg = "Morate uneti ime";
            setFormData(copy);
            valid = false;
        }
        else{
            const copy = { ...formData };
            copy['ime'].error = false;
            copy['ime'].errorMsg = "";
            setFormData(copy);
        }

        if (formData.email.value == ``) {
            const copy = { ...formData };
            copy['email'].error = true;
            copy['email'].errorMsg = "Morate uneti email";
            setFormData(copy);
            valid = false;
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email.value)) {
            const copy = { ...formData };
            copy['email'].error = true;
            copy['email'].errorMsg = "Unesite ispravnu email adresu";
            setFormData(copy);
            valid = false;
        }
        else {
            const copy = { ...formData };
            copy['email'].error = false;
            copy['email'].errorMsg = "";
            setFormData(copy);
        }

        if (formData.nazivKluba.value == ``) {
            const copy = { ...formData };
            copy['nazivKluba'].error = true;
            copy['nazivKluba'].errorMsg = "Morate uneti naziv Kluba";
            setFormData(copy);
            valid = false;
        }
        else{
            const copy = { ...formData };
            copy['nazivKluba'].error = false;
            copy['nazivKluba'].errorMsg = "";
            setFormData(copy);
        }

        if (formData.emailKluba.value == ``) {
            const copy = { ...formData };
            copy['emailKluba'].error = true;
            copy['emailKluba'].errorMsg = "Morate uneti email Kluba";
            setFormData(copy);
            valid = false;
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.emailKluba.value)) {
            const copy = { ...formData };
            copy['emailKluba'].error = true;
            copy['emailKluba'].errorMsg = "Unesite ispravnu email adresu";
            setFormData(copy);
            valid = false;
        }
        else {
            const copy = { ...formData };
            copy['emailKluba'].error = false;
            copy['emailKluba'].errorMsg = "";
            setFormData(copy);
        }

        if (formData.telefon.value == ``) {
            const copy = { ...formData };
            copy['telefon'].error = true;
            copy['telefon'].errorMsg = "Morate uneti telefon";
            setFormData(copy);
            valid = false;
        }
        else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/.test(formData.telefon.value)) {
            const copy = { ...formData };
            copy['telefon'].error = true;
            copy['telefon'].errorMsg = "Unesite ispravan broj telefona";
            setFormData(copy);
            valid = false;
        }
        else{
            const copy = { ...formData };
            copy['telefon'].error = false;
            copy['telefon'].errorMsg = "";
            setFormData(copy);
        }

        if (formData.poruka.value == "") {
            const copy = { ...formData };
            copy['poruka'].error = true;
            copy['poruka'].errorMsg = "Morate uneti poruku";
            setFormData(copy);
            valid = false;
        }

        else{
            const copy = { ...formData };
            copy['poruka'].error = false;
            copy['poruka'].errorMsg = "";
            setFormData(copy);
        }
        
        if(!valid) return;
        
        let copy = JSON.parse(JSON.stringify(formData)) // deep copy
        copy.ime.value = "";
        copy.email.value = "";
        copy.poruka.value = "";
        setFormData(copy)
    }

    function handleChange(e) {
        const copy = { ...formData };
        copy[e.target.name].value = e.target.value;
        setFormData(copy);
    }

    function handleFocus(e) {
        const copy = { ...formData };
        copy[e.target.name].focus = true;
        setFormData(copy);
    }

    function handleBlur(e) {
        const copy = { ...formData };
        copy[e.target.name].focus = !!copy[e.target.name].value;
        setFormData(copy);
    }
  return (
    <>
    <section className={styles.contactSec}>
            <h2>Prijavite se i postanite organizator</h2>
            <div className={styles.formContainer}>
                <form className={`${styles.contactForm} `} name="contactForm" onSubmit={handleSubmit}>
                    <div className={`${styles.inputBox} ${formData.ime.error ? styles.error : ""} ${formData.ime.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Ime i prezime</label>
                        <input value={formData.ime.value} type="text" className={styles.input1} name="ime" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{formData.ime.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${formData.email.error ?  styles.error : ""} ${formData.email.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Email</label>
                        <input value={formData.email.value} type="text" className={styles.input1} name="email" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{formData.email.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${formData.nazivKluba.error ?  styles.error : ""} ${formData.nazivKluba.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Naziv Kluba</label>
                        <input value={formData.nazivKluba.value} type="text" className={styles.input1} name="nazivKluba" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{formData.nazivKluba.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${formData.emailKluba.error ?  styles.error : ""} ${formData.emailKluba.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Email Kluba</label>
                        <input value={formData.emailKluba.value} type="text" className={styles.input1} name="emailKluba" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{formData.emailKluba.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${formData.telefon.error ?  styles.error : ""} ${formData.telefon.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Kontakt telefon</label>
                        <input value={formData.telefon.value} type="text" className={styles.input1} name="telefon" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{formData.telefon.errorMsg}</p>
                    </div>
                    {/* <div className={styles.eventTypes}>
                        <p className={styles.typeName}>Tip Događaja</p>

                        <input type="radio" name="eventTypes" id="eventTypes" 
                        value="Na otvorenom" checked ={request.eventTypes === "Na otvorenom"}
                        onChange={(e) =>{setRequest({...request,eventTypes: e.target.value})}}/>
                        <span className={styles.eventType}>Na otvorenom</span><br />

                        <input type="radio" name="eventTypes" id="eventTypes" 
                        value="Na zatvorenom" checked ={request.eventTypes === "Na zatvorenom"} 
                        onChange={(e) =>{setRequest({...request,eventTypes: e.target.value})}}/>
                        <span className={styles.eventType}>Na zatvorenom</span><br />

                        <input type="radio" name="eventTypes" id="eventTypes" 
                        value="Na otvorenom i zatvorenom" checked ={request.eventTypes === "Na otvorenom i zatvorenom"}
                        onChange={(e) =>{setRequest({...request,eventTypes: e.target.value})}}/>
                        <span className={styles.eventType}>Na otvorenom i zatvorenom</span><br />
                    </div> */}
                    <div className={`${styles.inputBox} ${formData.poruka.error ?  styles.error : ""} ${formData.poruka.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Zašto želite da postanete organizator</label>
                        <textarea value={formData.poruka.value} type="text" className={styles.input1} rows="10" name="poruka" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                        <p className={styles.errorMessage}>{formData.poruka.errorMsg}</p>
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

export default OrganizationForm