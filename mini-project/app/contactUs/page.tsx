"use client"
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import React from 'react'
import { useForm, ValidationError } from '@formspree/react';


  
const ContactUs = () => {
    const [state, handleSubmit] = useForm("xgvwggvv");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }
  return (
    <div>
        <Nav/>
        <div className='h-screen flex justify-center items-center bg-slate-200'>
  <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
    <div className='mb-4'>
      <label htmlFor="email" className='block text-black text-sm font-bold mb-2'>
        Email Address
      </label>
      <input
        id="email"
        type="email"
        name="email"
        className='shadow appearance-none border rounded w-full py-2 px-3 text-black'
        required
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
    </div>
    <div className='mb-4'>
      <label htmlFor="message" className='block text-black text-sm font-bold mb-2'>
        Message
      </label>
      <textarea
        id="message"
        name="message"
        className='shadow appearance-none border rounded w-full py-2 px-3 text-black'
        required
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
    </div>
    <div className='flex items-center justify-between'>
      <button 
        type="submit" 
        disabled={state.submitting}
        className='bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
      >
        Submit
      </button>
    </div>
  </form>
</div>

        <Footer/>
    </div>
  )
}

export default ContactUs