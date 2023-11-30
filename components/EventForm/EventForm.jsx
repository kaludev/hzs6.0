import { useEffect, useState } from 'react';
import styles from './EventForm.module.css'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

const EventForm = ({type,event, setEvent, submitting,setSubmitting,backToProfile}) => {
    
    let daysOfMonth = [];
    const [calendarDays, setCalendarDays] = useState([]);
    const [monthPicker, setMonthPicker] = useState(false);
    const [eventTypesErr, SetEventTypesErr] = useState('');
    const monthNames = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar']
    let first_day;
    useEffect(() => {
        first_day = new Date(event.vremeOd.value.getFullYear(), event.vremeOd.value.getMonth(), 1)
        daysOfMonth= [31, (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        setTimeout(() =>{
            console.log(daysOfMonth)
            const divs = [];
            for(let i=0; i<daysOfMonth[event.vremeOd.value.getMonth()] + first_day.getDay() ; i++){
                if (i >= first_day.getDay()) {
                    divs.push(i- first_day.getDay()+1);
                }else{
                    divs.push("");
                }
            }
            console.log(divs);
            setCalendarDays(divs);
        },200)
    },[event])
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

        if (!event.eventTypes) {
            SetEventTypesErr('Morate uneti tip događaja');
            valid = false;
        }
        else{
            SetEventTypesErr('');
        }

        if (event.lokacija.value == ``) {
            const copy = { ...event };
            copy['lokacija'].error = true;
            copy['lokacija'].errorMsg = "Morate uneti lokaciju";
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
            copy['max'].errorMsg = "Morate uneti maksimalan broj takmičara";
            setEvent(copy);
            valid = false;
        }else if (!/^[0-9]{1,7}$/.test(event.max.value)){
            const copy = { ...event };
            copy['max'].error = true;
            copy['max'].errorMsg = "Morate uneti ceo broj do 7 cifara";
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
            vremeOd: event.vremeOd.value,
            vremeDo: event.vremeDo.value,
            max: event.max.value,
            eventType: event.eventType.value,
            level: event.level.value,
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

    function handleHourChange(e) {
        if((!isNaN(e.target.value) && !isNaN(parseFloat(e.target.value)) && parseInt(e.target.value)<24)|| e.target.value == "" ){
            const copy = { ...event };
            copy[e.target.name].value.setHours(e.target.value);
            
            if(copy.vremeDo.value.getTime() > copy.vremeOd.value.getTime()){
                setEvent(copy);
            }else{
                copy.vremeOd.value.setHours(event.vremeDo.value.getHours()-1);
                console.log(copy.vremeOd.value)
                setEvent(copy);
            }
        }
    }
    function handleMinuteChange(e) {
        console.log((!isNaN(e.target.value) && !isNaN(parseFloat(e.target.value)) && parseInt(e.target.value)<61)|| e.target.value == "" )
        if((!isNaN(e.target.value) && !isNaN(parseFloat(e.target.value)) && parseInt(e.target.value)<61)|| e.target.value == "" ){
            const copy = { ...event };
            copy[e.target.name].value.setMinutes(e.target.value);
            if(copy.vremeDo.value.getTime() > copy.vremeOd.value.getTime()){
                setEvent(copy);
            }else{
                copy.vremeOd.value.setMinutes(event.vremeDo.value.getMinutes()-1);
                setEvent(copy);
            }
        }
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
    function incrementOdYear() {
        const copy = { ...event };
        
        copy.vremeOd.value.setFullYear(event.vremeOd.value.getFullYear() +1 );
        copy.vremeDo.value.setFullYear(event.vremeDo.value.getFullYear() +1 );
        setEvent(copy);
    }
    function decrementOdYear() {
        const copy = { ...event };
        let year = copy.vremeOd.value.getFullYear();
        copy.vremeOd.value.setFullYear(event.vremeOd.value.getFullYear() -1 );
        copy.vremeDo.value.setFullYear(event.vremeDo.value.getFullYear() -1 );
        if(copy.vremeOd.value.getTime() > new Date().getTime()){
            setEvent(copy);
        }else{
            copy.vremeOd.value.setFullYear(year);
            copy.vremeDo.value.setFullYear(year);
            setEvent(copy);
        }
        setEvent(copy);
    }
    function changeOdMonth(e) {
        const copy = { ...event };
        copy.vremeOd.value.setMonth(monthNames.indexOf(e.target.textContent));
        copy.vremeDo.value.setMonth(monthNames.indexOf(e.target.textContent));
        setMonthPicker(false);
        if(copy.vremeOd.value.getTime() > new Date().getTime()){
            setEvent(copy);
        }else{
            copy.vremeOd.value.setMonth(new Date().getMonth());
            copy.vremeOd.value.setDate(new Date().getDate()+1);
            copy.vremeDo.value.setMonth(new Date().getMonth());
            copy.vremeDo.value.setDate(new Date().getDate()+1);
            setEvent(copy);
        }
    }
    function setOdDay(e){
        const copy = { ...event };
        if(e.target.textContent){
            copy.vremeOd.value.setDate(parseInt(e.target.textContent));
            copy.vremeDo.value.setDate(parseInt(e.target.textContent));
            if(copy.vremeOd.value.getTime() > new Date().getTime()){
                setEvent(copy);
            }else{
                copy.vremeOd.value.setDate(new Date().getDate() + 1);
                copy.vremeDo.value.setDate(new Date().getDate() + 1);
            }
        }
    }
  return (
    <>
    <section className={styles.contactSec}>
            <h2>{type} takmičenje i omogućite svim korisnicima da se prijave i učestvuju</h2>
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
                    <div className={`${styles.inputBox} ${styles.hourMinute} ${event.vremeOd.error ?  styles.error : ""} ${event.vremeOd.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Početak</label>
                        <input value={event.vremeOd.value.getHours()} type="text" className={styles.input1 +" "+ styles.sati} name="vremeOd" onChange={handleHourChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <span>: </span>
                        <input value={event.vremeOd.value.getMinutes()} type="text" className={styles.input1 +" "+ styles.minuti} name="vremeOd" onChange={handleMinuteChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{event.vremeOd.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${styles.hourMinute} ${event.vremeDo.error ?  styles.error : ""} ${event.vremeDo.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Kraj</label>
                        <input value={event.vremeDo.value.getHours()} type="text" className={styles.input1 +" "+ styles.sati} name="vremeDo" onChange={handleHourChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <span>: </span>
                        <input value={event.vremeDo.value.getMinutes()} type="text" className={styles.input1 +" "+ styles.minuti} name="vremeDo" onChange={handleMinuteChange} onFocus={handleFocus} onBlur={handleBlur} />
                        <p className={styles.errorMessage}>{event.vremeDo.errorMsg}</p>
                    </div>
                    <div className={`${styles.inputBox} ${event.max.error ?  styles.error : ""} ${event.max.focus ? styles.focus : ""}`}>
                        <label className={styles.inputLabel}>Maksimalan broj takmičara</label>
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

                        <input type="radio" name="eventTypes" id="eventTypes"  selected 
                        value="Na otvorenom i zatvorenom" checked ={event.eventTypes === "Na otvorenom i zatvorenom"}
                        onChange={(e) =>{setEvent({...event,eventTypes: e.target.value})}}/>
                        <span className={styles.eventType}>Na otvorenom i zatvorenom</span><br />
                        <p className={styles.errorMessage}>{eventTypesErr}</p>
                    </div>
                    <div className={styles.select}>
                        <select className={styles.selectText} required>
                            <option value="1" >Međunarodno</option>
                            <option value="2">Državno</option>
                            <option value="3">Opštinsko</option>
                            <option value="4">Školsko</option>
                            <option value="5" selected>Drugo</option>
                        </select>
                        <span className={`${styles.selectHighlight}`}></span>
                        <span className={`${styles.selectBar} `}></span>
                        <label className={`${styles.selectLabel}`}>Nivo Takmičenja</label>
				    </div>
                    <div className={styles.selectDate}>
                    <div className={styles.calendar}>
                        <div className={styles.calendarHeader}>
                            <span onClick={() => {setMonthPicker((prev) => !prev)}} className={styles.monthPicker} id="monthPicker">{monthNames[event.vremeOd.value.getMonth()]}</span>
                            <div className={styles.yearPicker}>
                            <span onClick={decrementOdYear} className={styles.yearChange} id="prevYear">
                                <pre><FaAngleLeft /></pre>
                            </span>
                            <span id="year">{event.vremeOd.value.getFullYear()}</span>
                            <span onClick={incrementOdYear} className={styles.yearChange} id="nextYear">
                                <pre><FaAngleRight /></pre>
                            </span>
                            </div>
                        </div>
                        <div className={styles.calendarBody}>
                            <div className={styles.calendarWeekDay}>
                            <div>Ned</div>
                            <div>Pon</div>
                            <div>Uto</div>
                            <div>Sre</div>
                            <div>Čet</div>
                            <div>Pet</div>
                            <div>Sub</div>
                            </div>
                            <div className={styles.calendarDays}>
                                {calendarDays.map(value => (<div onClick={setOdDay} className={event.vremeOd.value.getDate() === value ? styles.active : ""}>{value}</div>))}
                            </div>
                        </div>
                        {monthPicker && <div className={styles.monthList}>{monthNames.map( name =>(<div onClick={changeOdMonth}>{name}</div>))}</div>}
                    </div>
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