import React from 'react'

const Form = ({request, setRequest, submitting, handleSubmit}) => {
  return (
    <div>
        <div className="nameInput">
            <p>Name:</p>
            <input type="text" name="Name" id="Name"/>
        </div>
        <div className="eventTypes">
            <p>EventTypes</p>

            <input type="radio" name="eventTypes" id="eventTypes" 
            value="Na otvorenom" checked ={request.eventTypes === "Na otvorenom"}
            onChange={(e) =>{setRequest({...request,eventTypes: e.target.value})}}/>

            <input type="radio" name="eventTypes" id="eventTypes" 
            value="Na zatvorenom" checked ={request.eventTypes === "Na zatvorenom"} 
            onChange={(e) =>{setRequest({...request,eventTypes: e.target.value})}}/>

            <input type="radio" name="eventTypes" id="eventTypes" 
            value="Oba" checked ={request.eventTypes === "Oba"}
            onChange={(e) =>{setRequest({...request,eventTypes: e.target.value})}}/>

        </div>
        <div className="reasonBox">
            <p>Sta vas cini dobrim organizatorom?</p>
            <textarea name="reason" id="reason" cols="30" rows="10">{request.reason.value}</textarea>
        </div>
        <div className="submitButtonBox">
            <button type="submit"
            className='primaryButton'
            onClick={handleSubmit}>{submitting ? "Slanje zahteva..." : "Posalji zahtev"}</button>
        </div>
    </div>
  )
}

export default Form