import React, { useState } from "react";
import "./Contact.css";
import msg_icon from "../../assets/mail-icon.png";
import mail_icon from "../../assets/mail-icon.png";
import phone_icon from "../../assets/phone-icon.png";
import location_icon from "../../assets/location-icon.png";
import white_arrow from "../../assets/white-arrow.png";

export default function Contact() {
  const [formData, setFormData] = useState({});

  const handleForm = (e) => {
    //* create different states or use this spread operator.
    setFormData({...formData, [e.target.name]: e.target.value,}); // Spread Operator Syntax: { ...obj, key: 'value' }
  };

  // const clearForm = () => {
  //   console.log("ClearForm callled.")
  //   // Create a new object with all the same keys, but set their values to empty strings
  //   // setFormData({...formData,}) 
  //   console.log("Data cleared: ", formData)
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8008/contactus", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("data= ", data);
    console.log("formData: ", formData);
    // clearForm();
  } catch (error) {
    console.error("Error:", error);
  };
}

  return (
    <>
      <div className="container mb-3">
        <div className="contact">
          <div className="contact-col">
            <h3>
              Send us a message <img src={msg_icon} alt="" />
            </h3>
            <p>
              Feel free to reach out through contact form or find our contact
              information below. Your feedback, questions and suggestions are
              important to us as we strive to provide exceptional service to our
              university community.
            </p>
            <ul>
              <li>
                <img src={mail_icon} alt="" />
                contactus@gmail.com
              </li>
              <li>
                <img src={phone_icon} alt="" />
                +919876543210
              </li>
              <li>
                <img src={location_icon} alt="" />
                Sector 1, Chandigrh
              </li>
            </ul>
          </div>
          <div className="contact-col">
            <form method="POST" action="/contactus" onSubmit={handleSubmit}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleForm}
                required
              />
              <label>Mobile No.</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your mobile no."
                onChange={handleForm}
                required
              />
              <label>Write your message here</label>
              <textarea
                name="msg"
                rows="6"
                placeholder="Enter your msg"
                onChange={handleForm}
                required
              ></textarea>
              <button
                type="submit"
                className="btn dark-btn btn-primary text-sm"
              >
                Submit <img src={white_arrow} alt="" size="5px" />
              </button>
            </form>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
}