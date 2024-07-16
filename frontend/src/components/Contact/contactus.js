import React from 'react'
import './Contact.css'
import msg_icon from '../../assets/mail-icon.png'
import mail_icon from '../../assets/mail-icon.png'
import phone_icon from '../../assets/phone-icon.png'
import location_icon from '../../assets/location-icon.png'
import white_arrow from '../../assets/white-arrow.png'

export default function Contact() {

  const [result, setResult] = React.useState("");

  //* Copied from: https://docs.web3forms.com/how-to-guides/js-frameworks/react-js/simple-react-contact-form
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "6e74916b-ba49-4c73-8b91-5e0d25a561c6");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  
  return (
    <>
    <div className='container mb-3'>
      <div className="contact">
        <div className="contact-col">
          <h3>Send us a message <img src={msg_icon} alt="" /></h3>
          <p>Feel free to reach out through contact form or find our contact information below. Your feedback, questions and suggestions are important to us as we strive to provide exceptional  service to our university community.</p>
          <ul>
            <li><img src={mail_icon} alt="" />contactus@gmail.com</li>
            <li><img src={phone_icon} alt="" />+919876543210</li>
            <li><img src={location_icon} alt="" />Sector 1, Chandigrh</li>
          </ul>
        </div>
        <div className="contact-col">
          <form onSubmit={onSubmit}>
            <label>Name</label>
            <input type="text" name="name" placeholder='Enter your name' required />
            <label>Mobile No.</label>
            <input type="tel" name="phone" placeholder='Enter your mobile no.' required />
            <label>Write your message here</label>
            <textarea name="msg" rows='6' placeholder='Enter your msg' required></textarea>
            <button type='submit' className='btn dark-btn btn-primary text-sm'>Submit <img src={white_arrow} alt="" size='5px'/></button>
          </form>
          <span>{result}</span>
        </div>
      </div>
    </div>
    </>
  )
}