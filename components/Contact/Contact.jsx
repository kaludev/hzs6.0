import { useState } from "react"
import styles from "./Contact.module.css"
//import KontaktAPI from "../../../../services/api/Kontakt";
//import { useStateContext } from "../../../../services/context/ContextProvider";

export default function ContactSection() {
    
	//const {createNotification, notificationTypes} = useStateContext();
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
        
        // const res = await KontaktAPI.postaviPitanje({ime: formData.ime.value, email: formData.email.value, poruka: formData.poruka.value});
        // if(res.error) return createNotification({
        //     type: notificationTypes.ERROR,
        //     title: "Greška",
        //     message: res.error.message
        // })
        // createNotification({
        //     type: notificationTypes.SUCCESS,
        //     title: "Успех",
        //     message: "Успешно сте послали поруку. Очекујте одговор ускоро. Хвала."
        // })
        // obriši prethodne vrednosti
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
        <section className={styles.contactSec}>
            <h2>Zakažite sastanak uživo</h2>
            <div className={styles.formContainer}>
                <div className={styles.iframeCont}>
                    <iframe className={styles.iframe} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.3297304664175!2d20.699530314108003!3d43.72447665981497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475700ff8115d2e7%3A0x3357e91eed8fb6ec!2z0JTQvtGB0LjRgtC10ZjQtdCy0LAgNDRiLCDQmtGA0LDRmdC10LLQvg!5e0!3m2!1ssr!2srs!4v1694517827704!5m2!1ssr!2srs" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
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
                    <div className={`${styles.inputBox} ${formData.poruka.error ?  styles.error : ""} ${formData.poruka.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Vaša poruka</label>
                        <textarea value={formData.poruka.value} type="text" className={styles.input1} rows="10" name="poruka" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                        <p className={styles.errorMessage}>{formData.poruka.errorMsg}</p>
                    </div>
                    <input id="submit" type="submit" className={`${styles.primaryButton} primaryButton`} value="Pošalji" />
                </form>
            </div>
        </section>
    )
}