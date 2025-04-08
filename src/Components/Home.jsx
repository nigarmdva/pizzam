import React from 'react'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='font-bold text-3xl mb-4'>Qr Code Generator</h1>
      <p>Create QR codes for your website</p>
      <a href="/register" className='bg-[#000] text-white px-4 py-2 rounded mt-4'>Get Started</a>
    </div>
  )
}

export default Home