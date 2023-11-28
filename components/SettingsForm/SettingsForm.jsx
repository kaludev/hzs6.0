import React from 'react'
import { useState } from 'react'
import styles from './SettingsForm.module.css'

const SettingsForm = ({profile, setProfile})  => {
    const [formData, setFormData] = useState({
        ime: {
            value: profile.name,
            focus: false,
            error: false,
            errorMsg: ""
        },
        email: {
            value: profile.email,
            focus: false,
            error: false,
            errorMsg: ""
        },
        username: {
            value: profile.username,
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

        if (formData.username.value == ``) {
            const copy = { ...formData };
            copy['username'].error = true;
            copy['usename'].errorMsg = "Morate uneti username";
            setFormData(copy);
            valid = false;
        }
        else{
            const copy = { ...formData };
            copy['username'].error = false;
            copy['username'].errorMsg = "";
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
            <div className={styles.formContainer}>
                <form className={`${styles.contactForm} `} name="contactForm" onSubmit={handleSubmit}>
                    <div className={`${styles.inputBox} ${formData.ime.error ? styles.error : ""} ${formData.ime.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Ime i prezime</label>
                        <input value={formData.ime.value} type="text" className={styles.input1} name="ime" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{formData.ime.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${formData.email.error ?  styles.error : ""} ${formData.email.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel} disabled="disabled">Email</label>
                        <input value={formData.email.value} type="text" className={styles.input1} name="email" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{formData.email.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${formData.username.error ?  styles.error : ""} ${formData.username.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Username</label>
                        <input value={formData.username.value} type="text" className={styles.input1} name="username" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{formData.username.errorMsg}</p>
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
                    <div className={styles.submitButtonBox}>
                        <button type="submit"
                        className={`${styles.primaryButton} primaryButton`}
                        onClick={handleSubmit}>{"Sačuvaj izmene"}</button>

                        <button
                        className={`${styles.secondaryButton} secondaryButton`}
                        >{"Otkaži"}</button>
                    </div>
                </form>
            </div>
        </section>
    </>
  )
}

export default SettingsForm