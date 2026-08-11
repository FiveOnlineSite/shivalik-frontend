import React from 'react'

const Logo = () => {
  return (
    <>
     <a href='/' aria-label='Shivalik Ventures home'>
       <img
         src='/images/logo.svg'
         alt='Shivalik Ventures'
         width='181'
         height='80'
         style={{ width: '100%', height: 'auto' }}
         decoding='async'
       />
     </a>
    </>
  )
}

export default Logo
