import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactComponent = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate if email and message are provided
    if (!formData.email || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Send email using EmailJS
      // Replace with your own EmailJS service ID, template ID, and public key
      const result = await emailjs.sendForm(
        'service_8h52r8h', // Replace with your EmailJS service ID
        'template_eblj92f', // Replace with your EmailJS template ID
        formRef.current,
        's879vPi2B6Atmyd3Y' // Replace with your EmailJS public key
      );

      console.log('Email sent successfully:', result.text);
      
      // Success handling
      setSubmitStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contactUS" className="bg-[#203e40] flex flex-col overflow-hidden w-full ">
      <div className="bg-[#203e40] flex w-full flex-col px-2.5 sm:px-14 md:px-14 lg:px-[70px] lg:pt-0 pt-[70px] pb-[40px] md:pb-0 mx-auto max-w-[1440px]">
        <div className="flex flex-col relative min-h-[500px] md:min-h-[600px] lg:min-h-[624px] w-full max-w-full items-center mb-[-28px] lg:px-[70px] px-5 pb-20 md:pb-[100px] lg:pb-[160px]">
          {/* Desktop background image */}
          <img
            src="/img/backgroundimage2.png"
            className="absolute inset-0 h-full w-full object-contain object-center hidden lg:block rounded-xl"
            alt="Background decoration"
          />

          {/* Mobile background image */}
          <img
            src="/img/background-img-5.png"
            className="absolute inset-0 h-auto md:w-[75vw] w-full object-contain bg-no-repeat object-center rounded-[20px] mt-[2px] block lg:hidden"
            alt="Mobile background"
          />

          <div className="relative z-10 w-full">
            <div className="flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-10">
              <section className="flex flex-col w-full md:w-[43%]">
                <div className="relative flex mt-10 md:mt-32 lg:mt-[189px] w-full flex-col items-start font-['Helvetica_Neue',_sans-serif] text-black">
                  <h2 className="sm:pt-20 md:pt-[60px] lg:pt-[190px] xl:pt-[160px] text-[#203e40] font-[650] text-2xl sm:text-4xl md:text-5xl lg:text-[46px] leading-[1] font-['fontspring',_-apple-system,_Roboto,_Helvetica,_sans-serif]">
                    GET IN TOUCH
                  </h2>
                  <p className="text-[#203e40] text-sm sm:text-base md:text-lg lg:text-[18px] font-normal leading-snug md:leading-7 lg:leading-[32px] w-full mt-2 sm:mt-4 md:mt-6 lg:mt-[35px] max-w-[320px] md:max-w-[360px]">
                    Let's create something amazing together. Reach out and let's get started!
                  </p>
                </div>
              </section>

              <section className="flex flex-col w-full md:w-[50%] md:ml-5 bg-white p-3 sm:p-4 md:p-5 rounded-[10px] h-max mt-8 md:mt-32 lg:mt-[189px] shadow-lg mx-auto md:max-w-[500px] max-w-[410px] md:mx-0">
                <form
                  ref={formRef}
                  className="relative flex w-full flex-col text-[#203e40] font-['Helvetica_Neue',_sans-serif] text-base md:text-[17px] font-normal p-4 md:p-6 lg:p-[25px]"
                  onSubmit={handleSubmit}
                >
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="rounded-[5px] border border-[#203e40] bg-white py-4 px-5 md:py-5 md:px-6 lg:p-[24px] mb-4 md:mb-5 lg:mb-[21px] outline-none focus:ring-2 focus:ring-[#03c39a]/30 transition-all"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                  <label htmlFor="company" className="sr-only">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="rounded-[5px] border border-[#203e40] bg-white py-4 px-5 md:py-5 md:px-6 lg:p-[24px] mb-4 md:mb-5 lg:mb-[21px] outline-none focus:ring-2 focus:ring-[#03c39a]/30 transition-all"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                  />

                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="rounded-[5px] border border-[#203e40] bg-white py-4 px-5 md:py-5 md:px-6 lg:p-[24px] mb-4 md:mb-5 lg:mb-[21px] outline-none focus:ring-2 focus:ring-[#03c39a]/30 transition-all"
                    placeholder="Email ID"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="rounded-[5px] border border-[#203e40] bg-white pt-4 px-5 pb-20 md:pt-5 md:px-6 md:pb-24 lg:pt-[19px] lg:px-[26px] lg:pb-[110px] mb-4 md:mb-5 lg:mb-[21px] min-h-[150px] outline-none focus:ring-2 focus:ring-[#03c39a]/30 transition-all resize-none"
                    placeholder="Message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />

                  {/* Hidden field for recipient */}
                  <input type="hidden" name="to_email" value="hello@curota.ai" />

                  <div className="relative">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full sm:w-auto rounded-[11px] bg-[#03c39a] shadow-[0px_15px_25px_rgba(32,70,100,0.15)] mt-4 md:mt-6 lg:mt-[35px] text-sm md:text-[15px] text-white font-medium text-center py-4 px-8 md:py-[17px] md:px-[30px] border-none cursor-pointer transform transition-all hover:translate-y-[-2px] hover:shadow-[0px_18px_30px_rgba(32,70,100,0.2)] active:translate-y-[1px] disabled:opacity-70 disabled:cursor-not-allowed ${isSubmitting ? 'animate-pulse' : ''}`}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                    {submitStatus === 'success' && (
                      <div className="absolute top-full left-0 right-0 mt-3 p-3 bg-green-100 text-green-800 rounded-md text-center">
                        Message sent successfully!
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="absolute top-full left-0 right-0 mt-3 p-3 bg-red-100 text-red-800 rounded-md text-center">
                        There was an error sending your message. Please try again.
                      </div>
                    )}
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;