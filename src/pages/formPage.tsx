import React, { useState, FormEventHandler, ChangeEvent, FormEvent, useEffect } from "react";
import './form.css';


export function FormPage() {
    const [ticketNumber,setTicketNumber] = useState(0);
    const RandomAngka = () => {
        return Math.floor(Math.random()*9999)+1;
    };
    useEffect(() => {
        const randomNumber = RandomAngka();
        setTicketNumber(randomNumber);
    }, []);
    const [formData, setFormData]=useState({
        Name: '',
        Name2: '',
        Email: '',
        Topic: '',
        Description: ''
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    
    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(({
          ...formData,
          [name]: value,
        }));
      };
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setFormData({
            Name: '',
            Name2: '',
            Email: '',
            Topic: '',
            Description: ''
        }); 
        setFormSubmitted(true);
    };
    const disabledButton = !formData.Name || !formData.Email || !formData.Name2;
    const buttonColor = disabledButton ? "grey" : "orange";
    return (
        <div className="main">
            <div className="container-main">
                <div className="container-judul">
                    <h2 className="judul">Support Ticket Form</h2>
                </div>
                <div className="form">
                    {formSubmitted ? (
                        <div className="thankyou-message">
                            <h3 className="thank-you">Thank you for sending us a report, we will <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;track the problem now</h3>
                            <div className="Number">
                                <p className="ticket-number">Ticket number: {ticketNumber}</p>
                            </div>
                        </div>
                    ):(
                    <form onSubmit={handleSubmit} id="myForm">
                        <div className="bagian1">
                            <div className="pertanyaan1">
                                <label htmlFor="Name">Name</label>
                                <label className="bintang" htmlFor="*">*</label>
                                <div className="isi-nama">
                                    <input type="text1" id="Name" name="Name" value={formData.Name} onChange={handleInput} required/><br />
                                    <input type="text1" id="Name2" name="Name2" value={formData.Name2} onChange={handleInput} required/><br />
                                </div>
                            </div>
                            <div className="penjelasan">
                                <p className="first">First</p>
                                <p className="last">Last</p>
                            </div>
                            <div className="pertanyaan2">
                                <label htmlFor="Email">Email</label>
                                <label className="bintang" htmlFor="*">*</label>
                                <div className="isi-email">
                                    <input type="email1" id="Email" name="Email" value={formData.Email} onChange={handleInput} required /><br />
                                </div>
                            </div>
                            <div className="pertanyaan3">
                                <label htmlFor="Topic">Topic</label>
                                <label className="bintang" htmlFor="*">*</label>
                                <div className="kotak">
                                    <h3 className="Radio">What we can help today ?</h3>
                                    <input type="radio" id="general" name="Topic" value="General" checked={formData.Topic==="General"} onChange={handleInput} />
                                    <label className="general" htmlFor="general">General</label><br />
                                    <input type="radio" id="bug" name="Topic" value="Bug" checked={formData.Topic === "Bug"} onChange={handleInput} />
                                    <label className="bug" htmlFor="bug">Bug</label><br />
                                    <input type="radio" id="feedback" name="Topic" value="Feedback" checked={formData.Topic === "Feedback"} onChange={handleInput} />
                                    <label className="feedback" htmlFor="feedback">Feedback</label>
                                </div>
                            </div>
                        </div>
                        <div className="bagian2">
                            <div className="pertanyaan4">
                                <label htmlFor="description">Description</label>
                                <div className="isi-description">
                                    <input type="text2" id="Description" name="Description" value={formData.Description} onChange={handleInput} placeholder="Description Report"/><br />
                                </div>
                            </div>
                        </div>
                        <button id="send-button" type="submit" disabled={disabledButton} style={{ backgroundColor: buttonColor }}>SEND</button>
                    </form>
                    )}
                </div>
            </div>
        </div>
    );
}


