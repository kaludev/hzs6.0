import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './OrganizationForm.module.css'

const OrganizationForm = ({request, setRequest, submitting,setSubmitting,backToProfile}) => {


    async function handleSubmit(e) {
        e.preventDefault();
        let valid = true;
        setSubmitting(true);
        if (request.ime.value == ``) {
            const copy = { ...request };
            copy['ime'].error = true;
            copy['ime'].errorMsg = "Morate uneti ime";
            setRequest(copy);
            valid = false;
        }
        else{
            const copy = { ...request };
            copy['ime'].error = false;
            copy['ime'].errorMsg = "";
            setRequest(copy);
        }

        if (request.email.value == ``) {
            const copy = { ...request };
            copy['email'].error = true;
            copy['email'].errorMsg = "Morate uneti email";
            setRequest(copy);
            valid = false;
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(request.email.value)) {
            const copy = { ...request };
            copy['email'].error = true;
            copy['email'].errorMsg = "Unesite ispravnu email adresu";
            setRequest(copy);
            valid = false;
        }
        else {
            const copy = { ...request };
            copy['email'].error = false;
            copy['email'].errorMsg = "";
            setRequest(copy);
        }

        if (request.nazivKluba.value == ``) {
            const copy = { ...request };
            copy['nazivKluba'].error = true;
            copy['nazivKluba'].errorMsg = "Morate uneti naziv Kluba";
            setRequest(copy);
            valid = false;
        }
        else{
            const copy = { ...request };
            copy['nazivKluba'].error = false;
            copy['nazivKluba'].errorMsg = "";
            setRequest(copy);
        }

        if (request.emailKluba.value == ``) {
            const copy = { ...request };
            copy['emailKluba'].error = true;
            copy['emailKluba'].errorMsg = "Morate uneti email Kluba";
            setRequest(copy);
            valid = false;
        }
        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(request.emailKluba.value)) {
            const copy = { ...request };
            copy['emailKluba'].error = true;
            copy['emailKluba'].errorMsg = "Unesite ispravnu email adresu";
            setRequest(copy);
            valid = false;
        }
        else {
            const copy = { ...request };
            copy['emailKluba'].error = false;
            copy['emailKluba'].errorMsg = "";
            setRequest(copy);
        }

        if (request.telefon.value == ``) {
            const copy = { ...request };
            copy['telefon'].error = true;
            copy['telefon'].errorMsg = "Morate uneti telefon";
            setRequest(copy);
            valid = false;
        }
        else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/.test(request.telefon.value)) {
            const copy = { ...request };
            copy['telefon'].error = true;
            copy['telefon'].errorMsg = "Unesite ispravan broj telefona";
            setRequest(copy);
            valid = false;
        }
        else{
            const copy = { ...request };
            copy['telefon'].error = false;
            copy['telefon'].errorMsg = "";
            setRequest(copy);
        }

        if (request.poruka.value == "") {
            const copy = { ...request };
            copy['poruka'].error = true;
            copy['poruka'].errorMsg = "Morate uneti poruku";
            setRequest(copy);
            valid = false;
        }

        else{
            const copy = { ...request };
            copy['poruka'].error = false;
            copy['poruka'].errorMsg = "";
            setRequest(copy);
        }
        
        if(!valid){
            setSubmitting(false);
            toast.error("Greska u validaciji");
            return;
        } 
        const body = {
            ime: request.ime.value,
            email: request.email.value,
            nazivKluba: request.nazivKluba.value,
            emailKluba: request.emailKluba.value,
            telefon: request.telefon.value,
            poruka: request.poruka.value
        }

        let copy = JSON.parse(JSON.stringify(request)) // deep copy
        copy.ime.value = "";
        copy.email.value = "";
        copy.poruka.value = "";
        setRequest(copy)
        try{
            const res = await fetch('/api/organizator/request',{
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
        const copy = { ...request };
        copy[e.target.name].value = e.target.value;
        setRequest(copy);
    }

    function handleFocus(e) {
        const copy = { ...request };
        copy[e.target.name].focus = true;
        setRequest(copy);
    }

    function handleBlur(e) {
        const copy = { ...request };
        copy[e.target.name].focus = !!copy[e.target.name].value;
        setRequest(copy);
    }
  return (
    <>
    <section className={styles.contactSec}>
            <h2>Prijavite se i postanite organizator</h2>
            <div className={styles.formContainer}>
                <form className={`${styles.contactForm} `} name="contactForm" onSubmit={handleSubmit}>
                    <div className={`${styles.inputBox} ${request.ime.error ? styles.error : ""} ${request.ime.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Ime i prezime</label>
                        <input value={request.ime.value} type="text" className={styles.input1} name="ime" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{request.ime.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${request.email.error ?  styles.error : ""} ${request.email.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Email</label>
                        <input value={request.email.value} type="text" className={styles.input1} name="email" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{request.email.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${request.nazivKluba.error ?  styles.error : ""} ${request.nazivKluba.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Naziv Kluba</label>
                        <input value={request.nazivKluba.value} type="text" className={styles.input1} name="nazivKluba" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{request.nazivKluba.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${request.emailKluba.error ?  styles.error : ""} ${request.emailKluba.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Email Kluba</label>
                        <input value={request.emailKluba.value} type="text" className={styles.input1} name="emailKluba" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{request.emailKluba.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${request.telefon.error ?  styles.error : ""} ${request.telefon.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Kontakt telefon</label>
                        <input value={request.telefon.value} type="text" className={styles.input1} name="telefon" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{request.telefon.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${request.poruka.error ?  styles.error : ""} ${request.poruka.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Zašto želite da postanete organizator</label>
                        <textarea value={request.poruka.value} type="text" className={styles.input1} rows="10" name="poruka" onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur}></textarea>
                        <p className={styles.errorMessage}>{request.poruka.errorMsg}</p>
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